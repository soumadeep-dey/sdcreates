import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import VideoCarousel from "@/components/ui/VideoCarousel";
import type { Category, VideoData } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const ref = useRef<HTMLElement>(null);
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
              {ids.length > 6 ? (
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
              ) : cat.playlistUrl ? (
                <a
                  href={cat.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                  }}
                >
                  See All →
                </a>
              ) : null}
            </div>
            <VideoCarousel videoIds={show} groupId={cat.slug} />
          </div>
        );
      })}
    </section>
  );
}
