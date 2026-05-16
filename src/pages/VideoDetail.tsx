import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb, ytUrl } from "@/lib/utils";
import Contact from "@/components/sections/Contact";
import type { Category, VideoData } from "@/types";

export default function VideoDetail() {
  const { slug } = useParams<{ slug: string }>();
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

  const videoId = slug || "";
  const parentCat = categories.find((c) =>
    (videos[c.slug] || []).includes(videoId),
  );
  const relatedIds = parentCat
    ? (videos[parentCat.slug] || []).filter((id) => id !== videoId)
    : [];
  const otherCats = categories.filter((c) => c.slug !== parentCat?.slug);

  return (
    <>
      <Helmet>
        <title>Watch — Soumadeep Dey</title>
      </Helmet>

      <section
        style={{
          paddingTop: "calc(var(--nav-h) + 20px)",
          background: "var(--black)",
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
            ← Back to Work
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: 32,
            }}
          >
            {/* Player */}
            <div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#000",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                }}
              >
                <ReactPlayer
                  src={ytUrl(videoId)}
                  style={{ width: "100%", height: "100%" }}
                  controls
                  playing
                />
              </div>
              {parentCat && (
                <div style={{ marginTop: 16 }}>
                  <Link
                    to={`/work/category/${parentCat.slug}`}
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      padding: "4px 10px",
                      borderRadius: 2,
                      display: "inline-block",
                    }}
                  >
                    {parentCat.label}
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar — same category playlist */}
            {relatedIds.length > 0 && (
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "60vh",
                  padding: "0 4px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: 12,
                  }}
                >
                  Up Next
                </p>
                {relatedIds.map((id) => (
                  <Link
                    key={id}
                    to={`/work/video/${id}`}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={ytThumb(id, "mqdefault")}
                      alt="Video"
                      loading="lazy"
                      style={{
                        width: 120,
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ paddingTop: 2 }}>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--white)",
                          lineHeight: 1.5,
                        }}
                      >
                        Watch
                      </p>
                      <p
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--white-dim)",
                        }}
                      >
                        {id}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related categories */}
      {otherCats.length > 0 && (
        <section style={{ padding: "60px 0", background: "var(--dark)" }}>
          <div className="container">
            <p className="section-eyebrow">Explore</p>
            <h2 className="section-title" style={{ marginBottom: 28 }}>
              More <em>Work</em>
            </h2>
            <div style={{ position: "relative" }}>
              <Swiper
                modules={[Navigation]}
                navigation={{ nextEl: ".vd-next", prevEl: ".vd-prev" }}
                slidesPerView="auto"
                spaceBetween={12}
              >
                {otherCats.map((c) => (
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
              <button className="vd-prev" style={navBtn("left")}>
                ‹
              </button>
              <button className="vd-next" style={navBtn("right")}>
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
