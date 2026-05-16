import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useFancybox from "@/hooks/useFancybox";
import VideoCarousel from "@/components/ui/VideoCarousel";
import Contact from "@/components/sections/Contact";
import type { Category, VideoData } from "@/types";

export default function WorkPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<VideoData>({});
  useFancybox();

  useEffect(() => {
    Promise.all([
      fetch("/data/categories.json").then((r) => r.json()),
      fetch("/data/videos.json").then((r) => r.json()),
    ]).then(([cats, vids]) => {
      setCategories(cats);
      setVideos(vids);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Work — Soumadeep Dey</title>
        <meta
          name="description"
          content="Portfolio of video work — music videos, brand films, short films, weddings, events, and audio stories."
        />
      </Helmet>

      <section
        style={{
          paddingTop: "calc(var(--nav-h) + 60px)",
          paddingBottom: 60,
          background: "var(--dark)",
        }}
      >
        <div className="container">
          <p className="section-eyebrow">Portfolio</p>
          <h1 className="section-title">
            The Work
            <br />
            <em>Speaks.</em>
          </h1>
        </div>
      </section>

      {categories.map((cat) => {
        const ids = videos[cat.slug] || [];
        if (!ids.length) return null;
        const show = ids.slice(0, 12);
        return (
          <section
            key={cat.slug}
            style={{ padding: "60px 0", background: "var(--black)" }}
          >
            <div
              className="container"
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--white)",
                }}
              >
                {cat.label}
              </h2>
              {ids.length > 6 && (
                <Link
                  to={`/work/category/${cat.slug}`}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  See All →
                </Link>
              )}
            </div>
            <VideoCarousel videoIds={show} groupId={`work-${cat.slug}`} />
          </section>
        );
      })}

      {/* Explore categories */}
      <section style={{ padding: "60px 0", background: "var(--dark)" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ textAlign: "center" }}>
            Browse By
          </p>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Explore <em>categories</em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/work/category/${cat.slug}`}
                style={{
                  display: "block",
                  background: "var(--dark-2)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "var(--radius)",
                  padding: "20px",
                  textAlign: "center",
                  transition: "border-color 0.35s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: 4,
                  }}
                >
                  {cat.label}
                </p>
                <p style={{ fontSize: "0.72rem", color: "var(--gold)" }}>
                  {(videos[cat.slug] || []).length} videos
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
