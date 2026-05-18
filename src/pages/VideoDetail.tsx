import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/navigation";
import useFancybox from "@/hooks/useFancybox";
import { ytUrl, ytThumb } from "@/lib/utils";
import VideoCarousel from "@/components/ui/VideoCarousel";
import Contact from "@/components/sections/Contact";
import { useCategories, useVideos, useVideoMeta } from "@/hooks/useQueries";

export default function VideoDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories = [] } = useCategories();
  const { data: videos = {} } = useVideos();
  const {
    data: meta = {} as Record<
      string,
      Pick<import("@/types").YTVideo, "title" | "description" | "thumbnail">
    >,
  } = useVideoMeta();
  useFancybox();

  const videoId = slug || "";
  const videoMeta = meta[videoId];
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
        <title>
          {videoMeta?.title
            ? `${videoMeta.title} — Soumadeep Dey`
            : "Watch — Soumadeep Dey"}
        </title>
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
            className="vd-player-grid"
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
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    {videoMeta?.title && (
                      <h1
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                          fontWeight: 700,
                          color: "var(--white)",
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {videoMeta.title}
                      </h1>
                    )}
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
                          lineHeight: 1.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {meta[id]?.title || "Watch"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explore — category-wise video carousels */}
      {otherCats.length > 0 && (
        <section style={{ padding: "60px 0 80px", background: "var(--dark)" }}>
          <div className="container" style={{ marginBottom: 40 }}>
            <p className="section-eyebrow">Explore</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              More <em>Work</em>
            </h2>
          </div>

          {otherCats.map((c) => {
            const catIds = (videos[c.slug] || []).slice(0, 12);
            if (!catIds.length) return null;
            return (
              <div key={c.slug} style={{ marginBottom: 52 }}>
                <div
                  className="container"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--white)",
                    }}
                  >
                    {c.label}
                  </h3>
                  <Link
                    to={`/work/category/${c.slug}`}
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
                </div>
                <div className="container">
                  <VideoCarousel
                    videoIds={catIds}
                    groupId={`vd-${c.slug}`}
                    linkToPage
                  />
                </div>
              </div>
            );
          })}
        </section>
      )}

      <Contact />
    </>
  );
}
