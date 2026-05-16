#!/usr/bin/env node
/**
 * extract.js — YouTube Playlist ID Extractor
 *
 * Reads playlists.config.json, extracts all video IDs from each
 * playlist URL using youtube-dl (no API key needed), and writes
 * the results to videos.json for the website to consume.
 *
 * Usage:
 *   node extract.js
 *
 * Requirements:
 *   youtube-dl must be installed:
 *     sudo apt install youtube-dl     (Debian/Ubuntu)
 *     brew install youtube-dl         (macOS)
 *     pip install yt-dlp              (recommended alternative)
 *
 * To use yt-dlp instead of youtube-dl, change the TOOL constant below.
 */

"use strict";

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/* ── Configuration ─────────────────────────────────────────── */
// Change to 'yt-dlp' if you have it installed (faster, more reliable)
const TOOL = "yt-dlp";
const CONFIG_FILE = path.join(__dirname, "playlists.config.json");
const OUTPUT_FILE = path.join(__dirname, "videos.json");

/* ── Static IDs for categories without a playlist URL ──────── */
// These are pre-set IDs that will be used when no playlistUrl is provided.
// Update these manually if needed.
const STATIC_IDS = {
  films: ["N-hDEMcIHJI", "kq942kV8n3U"],
  weddings: [
    "2u4zIyukEEw",
    "_L5cbmYQ5rM",
    "5FTl-yVOkpA",
    "RJXvJ1oJxtk",
    "FNYQ6qxVji0",
    "T8abwTwo6KA",
  ],
};

/* ── Helpers ────────────────────────────────────────────────── */
function detectTool() {
  const tools = [TOOL, TOOL === "yt-dlp" ? "youtube-dl" : "yt-dlp"];
  for (const t of tools) {
    try {
      execSync(`which ${t}`, { stdio: "ignore" });
      return t;
    } catch {
      /* not found */
    }
  }
  return null;
}

function extractIds(playlistUrl, tool) {
  const cmd = `${tool} --flat-playlist --print id "${playlistUrl}"`;
  try {
    const out = execSync(cmd, {
      encoding: "utf8",
      timeout: 180000,
      stdio: ["pipe", "pipe", "pipe"],
    });
    // Normalize returned lines to canonical 11-char video IDs and dedupe
    const lines = out.trim().split("\n");
    const seen = new Set();
    return lines
      .map((l) => l.trim())
      .map(normalizeVideoId)
      .filter((id) => id && !seen.has(id) && (seen.add(id), true));
  } catch (err) {
    // Fallback: try --get-id flag (older youtube-dl syntax)
    try {
      const cmd2 = `${tool} --flat-playlist --get-id "${playlistUrl}"`;
      const out2 = execSync(cmd2, {
        encoding: "utf8",
        timeout: 180000,
        stdio: ["pipe", "pipe", "pipe"],
      });
      const lines2 = out2.trim().split("\n");
      const seen2 = new Set();
      return lines2
        .map((l) => l.trim())
        .map(normalizeVideoId)
        .filter((id) => id && !seen2.has(id) && (seen2.add(id), true));
    } catch (err2) {
      throw new Error(err2.stderr || err2.message);
    }
  }
}

/**
 * Normalize a returned token (ID or URL) to a canonical 11-char YouTube video ID.
 * Supports: normal IDs, watch?v= URLs, youtu.be short links, and /shorts/ URLs.
 */
function normalizeVideoId(s) {
  if (!s) return null;
  s = s.trim();
  // Already an ID
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  // Try URL parse
  try {
    const u = new URL(s, "https://www.youtube.com");
    const host = (u.hostname || "").toLowerCase();
    // youtu.be/ID
    if (host.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    // /shorts/ID
    if (u.pathname.includes("/shorts/")) {
      const parts = u.pathname.split("/");
      const idx = parts.indexOf("shorts");
      if (idx >= 0 && parts[idx + 1]) {
        const id = parts[idx + 1];
        if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
      }
    }
    // watch?v=ID
    const v = u.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  } catch (e) {
    // not a full URL
  }
  // Last ditch: find first 11-char token
  const m = s.match(/[A-Za-z0-9_-]{11}/);
  return m ? m[0] : null;
}

function loadExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf8"));
  } catch {
    return {};
  }
}

/* ── Main ───────────────────────────────────────────────────── */
async function main() {
  console.log("\n── YouTube Playlist Extractor ──\n");

  if (!fs.existsSync(CONFIG_FILE)) {
    console.error("ERROR: playlists.config.json not found.");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  const existing = loadExisting();
  const tool = detectTool();

  if (!tool) {
    console.error("ERROR: Neither yt-dlp nor youtube-dl is installed.");
    console.error(
      "Install with: sudo apt install yt-dlp  OR  pip install yt-dlp\n",
    );
    process.exit(1);
  }

  console.log(`Using: ${tool}\n`);

  const output = {};

  for (const [key, cfg] of Object.entries(config)) {
    // Category has no playlist URL — use static IDs or keep existing
    if (!cfg.playlistUrl) {
      if (STATIC_IDS[key]) {
        output[key] = STATIC_IDS[key];
        console.log(
          `[${key}] ${cfg.label}: ${STATIC_IDS[key].length} static IDs`,
        );
      } else if (existing[key]?.length) {
        output[key] = existing[key];
        console.log(
          `[${key}] ${cfg.label}: ${existing[key].length} IDs kept from previous run`,
        );
      } else {
        output[key] = [];
        console.log(`[${key}] ${cfg.label}: no playlist URL — skipped`);
      }
      continue;
    }

    // Extract from playlist
    process.stdout.write(`[${key}] ${cfg.label}: extracting...`);
    try {
      const ids = extractIds(cfg.playlistUrl, tool);
      if (ids.length === 0) throw new Error("No IDs returned");
      output[key] = ids;
      console.log(` ✓ ${ids.length} videos`);
    } catch (err) {
      // Preserve existing on failure — don't wipe good data
      if (existing[key]?.length) {
        output[key] = existing[key];
        console.log(
          ` ✗ FAILED (kept ${existing[key].length} existing). Error: ${err.message}`,
        );
      } else {
        output[key] = [];
        console.log(` ✗ FAILED (no existing data). Error: ${err.message}`);
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf8");

  console.log("\n── Done ──");
  console.log(`Written to: ${OUTPUT_FILE}`);
  const total = Object.values(output).reduce((s, a) => s + a.length, 0);
  console.log(`Total videos: ${total}\n`);
}

main();
