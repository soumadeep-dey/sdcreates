import { useEffect, useRef } from "react";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import { useAwards } from "@/hooks/useQueries";
import type { AwardItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const { data } = useAwards();
  useFancybox();

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".award-row",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section
      id="awards"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--dark)" }}
    >
      <div className="container">
        <p className="section-eyebrow" style={{ textAlign: "center" }}>
          Recognition
        </p>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          The world
          <br />
          <em>has noticed.</em>
        </h2>

        <div style={{ marginBottom: 72 }}>
          <h3 className="awards-category-title">🎬 Creative Recognition</h3>
          {data.creative.map((award, i) => (
            <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
          ))}
        </div>

        <div>
          <h3 className="awards-category-title">💻 Technical Recognition</h3>
          {data.technical.map((award, i) => (
            <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>

      <style>{`
        .awards-category-title { font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700; color: var(--gold); margin-bottom: 40px; padding-bottom: 12px; border-bottom: 1px solid rgba(201,168,76,0.15); }
        .award-row { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; margin-bottom: 72px; opacity: 0; }
        .award-text { color: var(--white); }
        .award-row.reverse .award-text { order: 2; }
        .award-row.reverse .award-media { order: 1; }
        .award-media { position: relative; min-width: 0; overflow: hidden; }
        .award-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(8,8,8,0.85); border: 1px solid rgba(201,168,76,0.35); color: var(--gold); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; }
        .award-nav-btn:hover { background: rgba(201,168,76,0.12); }
        .award-nav-btn.prev { left: 0; }
        .award-nav-btn.next { right: 0; }
        .award-video-thumb { position: relative; display: block; margin-top: 12px; border-radius: var(--radius); overflow: hidden; border: 1px solid rgba(201,168,76,0.15); }
        .award-play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; }
        .award-pagination-div { display: none; justify-content: center; gap: 6px; margin-top: 8px; margin-bottom: 8px; }
        .award-bullet { width: 4px !important; height: 4px !important; background: rgba(201,168,76,0.4) !important; border-radius: 50% !important; cursor: pointer; transition: all 0.3s; display: inline-block; }
        .award-bullet-active { background: var(--gold) !important; width: 6px !important; height: 6px !important; }
        @media(max-width: 768px) { .award-row { grid-template-columns: 1fr !important; gap: 28px !important; } .award-nav-btn { display: none !important; } .award-pagination-div { display: flex !important; } }
      `}</style>
    </section>
  );
}

function AwardRow({ award, reverse }: { award: AwardItem; reverse: boolean }) {
  const swiperRef = useRef<SwiperRef>(null);
  const gid = `award-${award.id}`;
  const hasMultiple = (award.images || []).length > 1;

  return (
    <div className={`award-row${reverse ? " reverse" : ""}`}>
      <div className="award-text">
        <h4
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.4rem",
            fontWeight: 700,
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
            marginBottom: 12,
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
            data-fancybox={`${gid}-vid`}
            data-type="iframe"
            data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
              background: "var(--dark-2)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              transition: "border-color 0.35s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
            }}
          >
            <div style={{ position: "relative", width: 140, flexShrink: 0 }}>
              <img
                src={ytThumb(award.videoId, "mqdefault")}
                alt="Watch video"
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "1.5rem", color: "var(--gold)" }}>
                  ▶
                </span>
              </div>
            </div>
            <div style={{ padding: "8px 12px 8px 0", flex: 1 }}>
              <p
                style={{
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 4,
                  fontSize: "0.85rem",
                }}
              >
                Watch Video
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--white-dim)" }}>
                Official highlight reel
              </p>
            </div>
          </a>
        )}
      </div>

      <div className="award-media">
        {(award.images || []).length > 0 ? (
          <>
            <div style={{ position: "relative", marginBottom: 4 }}>
              <div className={hasMultiple ? "award-inner award-inner--padded" : "award-inner"}>
                <div
                  style={{
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                  }}
                >
                  <Swiper
                    ref={swiperRef}
                    modules={[Autoplay, Navigation, Pagination]}
                    pagination={{
                      el: `.award-pg-${gid}`,
                      clickable: true,
                      bulletClass: "award-bullet",
                      bulletActiveClass: "award-bullet-active",
                    }}
                    autoplay={
                      hasMultiple
                        ? { delay: 3200, disableOnInteraction: false }
                        : false
                    }
                    loop={hasMultiple}
                    slidesPerView={1}
                  >
                    {(award.images || []).map((img) => (
                      <SwiperSlide key={img}>
                        <a href={img} data-fancybox={gid}>
                          <img
                            src={img}
                            alt={award.title}
                            style={{
                              width: "100%",
                              aspectRatio: "4/3",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              {hasMultiple && (
                <>
                  <button
                    className="award-nav-btn prev"
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    className="award-nav-btn next"
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {hasMultiple && (
              <div
                className={`award-pg-${gid} award-pagination-div`}
                style={{ marginBottom: 16 }}
              />
            )}
          </>
        ) : award.videoId ? (
          <a
            href={`https://www.youtube.com/watch?v=${award.videoId}`}
            data-fancybox={`${gid}-vid`}
            data-type="iframe"
            data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
            style={{
              display: "block",
              position: "relative",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <img
              src={ytThumb(award.videoId, "hqdefault")}
              alt={award.title}
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div className="award-play-overlay">
              <span style={{ fontSize: "2.8rem", color: "var(--white)" }}>
                ▶
              </span>
            </div>
          </a>
        ) : null}
      </div>
    </div>
  );
}
