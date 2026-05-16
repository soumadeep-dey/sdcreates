import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import type { AwardsData } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const [data, setData] = useState<AwardsData | null>(null);
  useFancybox();

  useEffect(() => {
    fetch("/data/awards.json")
      .then((r) => r.json())
      .then(setData);
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

  if (!data) return null;

  return (
    <section
      id="awards"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--dark)" }}
    >
      <div className="container">
        <p
          className="section-eyebrow"
          data-gsap="fade-up"
          style={{ textAlign: "center" }}
        >
          Recognition
        </p>
        <h2
          className="section-title"
          data-gsap="fade-up"
          style={{ textAlign: "center" }}
        >
          The world
          <br />
          <em>has noticed.</em>
        </h2>

        {/* Creative Awards */}
        <div style={{ marginBottom: 72 }}>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--gold)",
              marginBottom: 40,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            🎬 Creative Recognition
          </h3>
          {data.creative.map((award, i) => (
            <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
          ))}
        </div>

        {/* Technical Awards */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--gold)",
              marginBottom: 40,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            💻 Technical Recognition
          </h3>
          {data.technical.map((award, i) => (
            <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardRow({
  award,
  reverse,
}: {
  award: AwardsData["creative"][0];
  reverse: boolean;
}) {
  const gid = `award-${award.id}`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        marginBottom: 60,
        direction: reverse ? "rtl" : "ltr",
      }}
    >
      <div style={{ direction: "ltr" }}>
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: 8,
          }}
        >
          {award.title}
        </h4>
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          {award.subtitle}
        </p>
        <p
          style={{
            color: "var(--white-dim)",
            lineHeight: 1.8,
            fontSize: "0.88rem",
          }}
        >
          {award.description}
        </p>
        {award.videoId && (
          <a
            href={`https://www.youtube.com/watch?v=${award.videoId}`}
            data-fancybox={`award-video-${award.id}`}
            data-type="iframe"
            data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
              color: "var(--gold)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>▶</span> Watch Video
          </a>
        )}
      </div>

      <div style={{ direction: "ltr", position: "relative" }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: `.${gid}-next`, prevEl: `.${gid}-prev` }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={award.images.length > 1}
          slidesPerView={1}
          style={{ borderRadius: "var(--radius)", overflow: "hidden" }}
        >
          {award.videoId && !award.images.length ? (
            <SwiperSlide>
              <a
                href={`https://www.youtube.com/watch?v=${award.videoId}`}
                data-fancybox={`award-video-${award.id}`}
                data-type="iframe"
                data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
              >
                <img
                  src={ytThumb(award.videoId, "hqdefault")}
                  alt={award.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                />
              </a>
            </SwiperSlide>
          ) : (
            award.images.map((img) => (
              <SwiperSlide key={img}>
                <a href={img} data-fancybox={gid}>
                  <img
                    src={img}
                    alt={award.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                      maxHeight: 320,
                    }}
                  />
                </a>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        {award.images.length > 1 && (
          <>
            <button className={`${gid}-prev`} style={navBtn("left")}>
              ‹
            </button>
            <button className={`${gid}-next`} style={navBtn("right")}>
              ›
            </button>
          </>
        )}
        {/* Show video thumbnail after images if videoId exists */}
        {award.videoId && award.images.length > 0 && (
          <a
            href={`https://www.youtube.com/watch?v=${award.videoId}`}
            data-fancybox={`award-video-${award.id}`}
            data-type="iframe"
            data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
            style={{
              display: "block",
              marginTop: 12,
              position: "relative",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <img
              src={ytThumb(award.videoId, "mqdefault")}
              alt="Watch video"
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "3rem", color: "var(--white)" }}>▶</span>
            </div>
          </a>
        )}
      </div>

      <style>{`
        @media(max-width:768px){
          #awards .container > div > div[style*="grid"]{
            grid-template-columns:1fr!important;direction:ltr!important;
          }
        }
      `}</style>
    </div>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    zIndex: 10,
    background: "rgba(8,8,8,0.7)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "var(--gold)",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
