import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import Contact from "@/components/sections/Contact";
import type { Category, VideoData } from "@/types";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
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

  const cat = categories.find((c) => c.slug === categorySlug);
  const ids = videos[categorySlug || ""] || [];
  const others = categories.filter((c) => c.slug !== categorySlug);

  return (
    <>
      <Helmet>
        <title>{cat?.label || categorySlug} — Soumadeep Dey</title>
      </Helmet>

      <section
        style={{
          paddingTop: "calc(var(--nav-h) + 60px)",
          paddingBottom: 40,
          background: "var(--dark)",
        }}
      >
        <div className="container">
          <Link
            to="/work"
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              display: "inline-block",
            }}
          >
            ← All Work
          </Link>
          <h1 className="section-title">
            {cat?.label || categorySlug}
            <br />
            <em>Collection</em>
          </h1>
          <p style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}>
            {ids.length} videos
          </p>
        </div>
      </section>

      {/* Netflix grid */}
      <section style={{ padding: "40px 0 80px", background: "var(--black)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {ids.map((id) => (
              <a
                key={id}
                href={`https://www.youtube.com/watch?v=${id}`}
                data-fancybox={`cat-${categorySlug}`}
                data-type="iframe"
                data-src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                style={{
                  display: "block",
                  position: "relative",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <img
                  src={ytThumb(id)}
                  alt="Video"
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLImageElement).style.transform =
                      "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    const div = e.currentTarget;
                    div.style.background = "rgba(0,0,0,0.5)";
                    div.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const div = e.currentTarget;
                    div.style.background = "rgba(0,0,0,0)";
                    div.style.opacity = "0";
                  }}
                >
                  <span style={{ fontSize: "2.5rem", color: "var(--gold)" }}>
                    ▶
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* More categories */}
      {others.length > 0 && (
        <section style={{ padding: "60px 0", background: "var(--dark)" }}>
          <div className="container">
            <p className="section-eyebrow">Explore More</p>
            <h2 className="section-title" style={{ marginBottom: 28 }}>
              Other <em>Categories</em>
            </h2>
            <div style={{ position: "relative" }}>
              <Swiper
                modules={[Navigation]}
                navigation={{ nextEl: ".cat-next", prevEl: ".cat-prev" }}
                slidesPerView="auto"
                spaceBetween={12}
              >
                {others.map((c) => (
                  <SwiperSlide key={c.slug} style={{ width: 200 }}>
                    <Link
                      to={`/work/category/${c.slug}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 120,
                        background: "var(--dark-2)",
                        border: "1px solid rgba(201,168,76,0.1)",
                        borderRadius: "var(--radius)",
                        gap: 8,
                        transition: "border-color 0.35s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,168,76,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,168,76,0.1)";
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontWeight: 700,
                          color: "var(--white)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {c.label}
                      </p>
                      <p style={{ fontSize: "0.68rem", color: "var(--gold)" }}>
                        {(videos[c.slug] || []).length} videos
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="cat-prev" style={navBtn("left")}>
                ‹
              </button>
              <button className="cat-next" style={navBtn("right")}>
                ›
              </button>
            </div>
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: -12,
    zIndex: 10,
    background: "rgba(8,8,8,0.7)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "var(--gold)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
