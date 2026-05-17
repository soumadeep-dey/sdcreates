#!/usr/bin/env node
/**
 * extract.js — YouTube Video/Playlist Extractor CLI
 *
 * Usage:
 *   node extract.js <youtube-url> <output-file> [--full]
 *
 * Arguments:
 *   youtube-url    YouTube playlist or video URL
 *   output-file    Path to output JSON file (relative to project root)
 *
 * Options:
 *   --full         Also extract descriptions (slower — fetches each video page)
 *   -h, --help     Show this help
 *
 * Examples:
 *   node extract.js "https://youtube.com/playlist?list=PLxxx..." "public/data/festival.json"
 *   node extract.js "https://youtu.be/VIDEO_ID" "public/data/video.json" --full
 *
 * Output format (playlist):
 *   [ { "id": "...", "title": "...", "description": "..." }, ... ]
 *
 * Output format (single video):
 *   { "id": "...", "title": "...", "description": "..." }
 *
 * Requirements:
 *   yt-dlp must be installed:
 *     sudo apt install yt-dlp     (Debian/Ubuntu)
 *     pip install yt-dlp          (recommended)
 */

import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── Tool Detection ─────────────────────────────────────────── */
function detectTool() {
  for (const t of ["yt-dlp", "youtube-dl"]) {
    try {
      spawnSync("which", [t], { stdio: "ignore" });
      const result = spawnSync(t, ["--version"], { encoding: "utf8" });
      if (result.status === 0) return t;
    } catch {
      /* not found */
    }
  }
  return null;
}

/* ── Video ID normalization ─────────────────────────────────── */
function normalizeVideoId(s) {
  if (!s) return null;
  s = s.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s, "https://www.youtube.com");
    const host = (u.hostname || "").toLowerCase();
    if (host.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    if (u.pathname.includes("/shorts/")) {
      const parts = u.pathname.split("/");
      const idx = parts.indexOf("shorts");
      if (
        idx >= 0 &&
        parts[idx + 1] &&
        /^[A-Za-z0-9_-]{11}$/.test(parts[idx + 1])
      )
        return parts[idx + 1];
    }
    const v = u.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  } catch {
    /* not a URL */
  }
  const m = s.match(/[A-Za-z0-9_-]{11}/);
  return m ? m[0] : null;
}

/* ── Extraction ─────────────────────────────────────────────── */
function extractVideos(url, tool, full = false) {
  const args = full
    ? ["--dump-json", url]
    : ["--flat-playlist", "--dump-json", url];

  console.log(`Running: ${tool} ${args.join(" ")}`);

  const result = spawnSync(tool, args, {
    encoding: "utf8",
    timeout: 300000,
    maxBuffer: 50 * 1024 * 1024,
  });

  if (result.status !== 0 && !result.stdout) {
    throw new Error(
      result.stderr || `${tool} exited with code ${result.status}`,
    );
  }

  const stdout = result.stdout || "";
  const lines = stdout.trim().split("\n").filter(Boolean);
  const videos = [];
  const seen = new Set();

  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      // Skip playlist containers (their IDs start with PL/FL/UU or are long)
      const rawId = obj.id || "";
      if (
        !rawId ||
        rawId.startsWith("PL") ||
        rawId.startsWith("FL") ||
        rawId.startsWith("UU")
      )
        continue;

      const id = normalizeVideoId(rawId) || normalizeVideoId(obj.url || "");
      if (!id || seen.has(id)) continue;
      seen.add(id);

      videos.push({
        id,
        title: obj.title || "",
        description: obj.description || "",
        thumbnail:
          obj.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      });
    } catch {
      /* skip malformed lines */
    }
  }

  return videos;
}

/* ── CLI Entry Point ────────────────────────────────────────── */
const args = process.argv.slice(2);

if (args.length < 2 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
  YouTube Extractor CLI

  Usage:
    node extract.js <youtube-url> <output-file> [--full]

  Arguments:
    youtube-url    YouTube playlist or single video URL
    output-file    Path to output JSON file (relative to project root)

  Options:
    --full         Extract full info including descriptions (slower)
    -h, --help     Show this help

  Examples:
    node extract.js "https://youtube.com/playlist?list=PLxxx..." "public/data/festival.json"
    node extract.js "https://youtu.be/VIDEO_ID" "public/data/video.json" --full
  `);
  process.exit(0);
}

const [inputUrl, outputArg] = args;
const full = args.includes("--full");

const tool = detectTool();
if (!tool) {
  console.error("ERROR: Neither yt-dlp nor youtube-dl is installed.");
  console.error(
    "Install with: sudo apt install yt-dlp  OR  pip install yt-dlp",
  );
  process.exit(1);
}

console.log(`\n── YouTube Extractor ──`);
console.log(`Tool:   ${tool}`);
console.log(`URL:    ${inputUrl}`);
console.log(`Output: ${outputArg}`);
console.log(
  `Mode:   ${full ? "full (with descriptions)" : "fast (flat-playlist)"}\n`,
);

try {
  const videos = extractVideos(inputUrl, tool, full);

  if (videos.length === 0) {
    console.error("No videos found.");
    process.exit(1);
  }

  // Single video URL → output single object, playlist → array
  const isSingleVideo =
    !inputUrl.includes("list=") &&
    !inputUrl.includes("/@") &&
    videos.length === 1;
  const output = isSingleVideo ? videos[0] : videos;

  const outputPath = path.resolve(__dirname, outputArg);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf8");

  console.log(`\n✓ Extracted ${videos.length} video(s)`);
  console.log(`✓ Written to: ${outputPath}\n`);
} catch (err) {
  console.error(`\nERROR: ${err.message}`);
  process.exit(1);
}
