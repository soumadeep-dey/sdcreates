import { useEffect, useRef, useState } from "react";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import type { AwardsData, AwardItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function AwardsSection() {
  const ref = useRef<HTMLElement>(null);
  const [data, setData] = useState<AwardsData | null>(null);
  useFancybox();

  useEffect(() => {
    fetch("/data/awards.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

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
    <section id="awards" ref={ref} style={{ padding: "100px 0", background: "var(--dark)" }}>
      <div className="container">
        <p className="section-eyebrow" style={{ textAlign: "center" }}>Recognition</p>
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
        .award-nav-btn.prev { left: 8px; }
        .award-nav-btn.next { right: 8px; }
        .award-video-thumb { position: relative; display: block; margin-top: 12px; border-radius: var(--radius); overflow: hidden; border: 1px solid rgba(201,168,76,0.15); }
        .award-play-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center; }
        @media(max-width: 768px) { .award-row { grid-template-columns: 1fr !important; gap: 28px !important; } .award-nav-btn { display: none; } }
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
        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700, marginBottom: 8 }}>{award.title}</h4>
        <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{award.subtitle}</p>
        <p style={{ color: "var(--white-dim)", lineHeight: 1.8, fontSize: "0.88rem" }}>{award.description}</p>
        {award.videoId && (
          <a href={`https://www.youtube.com/watch?v=${award.videoId}`} data-fancybox={`${gid}-vid`} data-type="iframe" data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, color: "var(--gold)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "var(--radius)", padding: "8px 14px" }}>
            <span>▶</span> Watch Video
          </a>
        )}
      </div>

      <div className="award-media">
        {(award.images || []).length > 0 ? (
          <>
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", position: "relative" }}>
              <Swiper ref={swiperRef} modules={[Autoplay, Navigation]} autoplay={hasMultiple ? { delay: 3200, disableOnInteraction: false } : false} loop={hasMultiple} slidesPerView={1}>
                {(award.images || []).map((img) => (
                  <SwiperSlide key={img}>
                    <a href={img} data-fancybox={gid}>
                      <img src={img} alt={award.title} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {hasMultiple && (
              <>
                <button className="award-nav-btn prev" onClick={() => swiperRef.current?.swiper.slidePrev()} aria-label="Previous">‹</button>
                <button className="award-nav-btn next" onClick={() => swiperRef.current?.swiper.slideNext()} aria-label="Next">›</button>
              </>
            )}

            {award.videoId && (
              <a href={`https://www.youtube.com/watch?v=${award.videoId}`} data-fancybox={`${gid}-vid`} data-type="iframe" data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`} className="award-video-thumb">
                <img src={ytThumb(award.videoId, "mqdefault")} alt="Watch video" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
                <div className="award-play-overlay"><span style={{ fontSize: "2.8rem", color: "var(--white)" }}>▶</span></div>
              </a>
            )}
          </>
        ) : award.videoId ? (
          <a href={`https://www.youtube.com/watch?v=${award.videoId}`} data-fancybox={`${gid}-vid`} data-type="iframe" data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`} style={{ display: "block", position: "relative", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid rgba(201,168,76,0.15)" }}>
            <img src={ytThumb(award.videoId, "hqdefault")} alt={award.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
            <div className="award-play-overlay"><span style={{ fontSize: "2.8rem", color: "var(--white)" }}>▶</span></div>
          </a>
        ) : null}
      </div>
    </div>
  );
}
