import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "swiper/css";
import "swiper/css/navigation";
import { ytThumb } from "@/lib/utils";
import { FiPlay } from "react-icons/fi";
import Contact from "@/components/sections/Contact";
import { useCategories, useVideos } from "@/hooks/useQueries";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { data: categories = [] } = useCategories();
  const { data: videos = {} } = useVideos();

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

      {/* Grid */}
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
              <Link
                key={id}
                to={`/work/video/${id}`}
                className="cat-thumb-card"
                style={{
                  display: "block",
                  position: "relative",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.08)",
                  transition: "transform 0.35s, box-shadow 0.35s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={ytThumb(id)}
                  alt="Video thumbnail"
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  className="cat-play-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <FiPlay size={32} color="var(--white)" fill="var(--white)" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`.cat-thumb-card:hover .cat-play-overlay{opacity:1!important}`}</style>
      </section>

      {/* More categories */}
      {others.length > 0 && (
        <section style={{ padding: "60px 0", background: "var(--dark)" }}>
          <div className="container">
            <p className="section-eyebrow">Explore More</p>
            <h2 className="section-title" style={{ marginBottom: 28 }}>
              Other <em>Categories</em>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {others.map((c) => (
                <Link
                  key={c.slug}
                  to={`/work/category/${c.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 28px",
                    background: "var(--dark-2)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: "var(--radius)",
                    gap: 6,
                    transition: "border-color 0.35s, background 0.35s",
                    minWidth: 140,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                    e.currentTarget.style.background = "var(--dark-3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                    e.currentTarget.style.background = "var(--dark-2)";
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 700,
                      color: "var(--white)",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    {c.label}
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "var(--gold)" }}>
                    {(videos[c.slug] || []).length} videos
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}
