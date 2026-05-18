import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import VideoCarousel from "@/components/ui/VideoCarousel";
import { useCategories, useVideos } from "@/hooks/useQueries";
gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const ref = useRef<HTMLElement>(null);
  const { data: categories = [] } = useCategories();
  const { data: videos = {} } = useVideos();
  useFancybox();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-gsap="fade-up"]', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--dark-2)" }}
    >
      <div className="container" style={{ marginBottom: 48 }}>
        <p className="section-eyebrow" data-gsap="fade-up">
          Portfolio
        </p>
        <h2 className="section-title" data-gsap="fade-up">
          The Work
          <br />
          <em>Speaks.</em>
        </h2>
      </div>

      {categories.map((cat) => {
        const ids = videos[cat.slug] || [];
        if (!ids.length) return null;
        const show = ids.slice(0, 12);
        const showSeeAll = ids.length >= 3;
        return (
          <div key={cat.slug} style={{ marginBottom: 56 }}>
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
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--white)",
                }}
              >
                {cat.label}
              </h3>
              {showSeeAll && (
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
            <div className="container">
              <VideoCarousel videoIds={show} groupId={cat.slug} linkToPage />
            </div>
          </div>
        );
      })}
    </section>
  );
}
