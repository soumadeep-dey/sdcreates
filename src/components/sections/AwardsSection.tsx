import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { MdEmojiEvents } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
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
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".award-row",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.15,
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
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 72 }}>
          The world<br /><em>has noticed.</em>
        </h2>

        <AwardCategory
          icon={<MdEmojiEvents size={22} color="var(--gold)" />}
          title="Creative Recognition"
          awards={data.creative}
        />
        <AwardCategory
          icon={<RiComputerLine size={22} color="var(--gold)" />}
          title="Technical Recognition"
          awards={data.technical}
        />
      </div>
      <style>{`@media(max-width:768px){.award-row-grid{grid-template-columns:1fr!important;direction:ltr!important}}`}</style>
    </section>
  );
}

function AwardCategory({
  icon,
  title,
  awards,
}: {
  icon: React.ReactNode;
  title: string;
  awards: AwardsData["creative"];
}) {
  return (
    <div style={{ marginBottom: 80 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 48,
          paddingBottom: 16,
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        {icon}
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700, color: "var(--gold)" }}>
          {title}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
        {awards.map((award, i) => (
          <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}

type Award = AwardsData["creative"][0];

function AwardRow({ award, reverse }: { award: Award; reverse: boolean }) {
  const gid = award.id;
  return (
    <div className="award-row" style={{ opacity: 0 }}>
      <div
        className="award-row-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "center",
          direction: reverse ? "rtl" : "ltr",
        }}
      >
        {/* Text */}
        <div style={{ direction: "ltr" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 12,
            }}
          >
            {award.subtitle}
          </p>
          <h4
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--white)",
              marginBottom: 16,
              lineHeight: 1.25,
            }}
          >
            {award.title}
          </h4>
          <p style={{ color: "var(--white-dim)", lineHeight: 1.8, fontSize: "0.88rem", marginBottom: 20 }}>
            {award.description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {award.videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${award.videoId}`}
                data-fancybox={`${gid}-video`}
                data-type="iframe"
                data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--gold)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "var(--radius)",
                  padding: "8px 16px",
                }}
              >
                <FiPlay size={13} /> Watch Video
              </a>
            )}
            {award.videoSlug && award.videoId && (
              <Link
                to={`/work/video/${award.videoId}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--white-dim)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                }}
              >
                View Film →
              </Link>
            )}
          </div>
        </div>

        {/* Media */}
        <div style={{ direction: "ltr", position: "relative" }}>
          {award.images.length > 0 && (
            <div style={{ position: "relative" }}>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{ nextEl: `.${gid}-next`, prevEl: `.${gid}-prev` }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop={award.images.length > 1}
                slidesPerView={1}
                style={{ borderRadius: "var(--radius)", border: "1px solid rgba(201,168,76,0.1)" }}
              >
                {award.images.map((img) => (
                  <SwiperSlide key={img}>
                    <a href={img} data-fancybox={gid}>
                      <img
                        src={img}
                        alt={award.title}
                        loading="lazy"
                        style={{ width: "100%", maxHeight: 340, objectFit: "cover", display: "block" }}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              {award.images.length > 1 && (
                <>
                  <button className={`${gid}-prev`} style={navBtnStyle("left")}><FiChevronLeft size={18} /></button>
                  <button className={`${gid}-next`} style={navBtnStyle("right")}><FiChevronRight size={18} /></button>
                </>
              )}
            </div>
          )}

          {award.videoId && award.images.length > 0 && (
            <a
              href={`https://www.youtube.com/watch?v=${award.videoId}`}
              data-fancybox={`${gid}-video`}
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
                alt="Watch"
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlayCircle />
              </div>
            </a>
          )}

          {award.videoId && award.images.length === 0 && (
            <a
              href={`https://www.youtube.com/watch?v=${award.videoId}`}
              data-fancybox={`${gid}-video`}
              data-type="iframe"
              data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
              style={{
                display: "block",
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <img
                src={ytThumb(award.videoId, "hqdefault")}
                alt={award.title}
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlayCircle size={28} />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayCircle({ size = 20 }: { size?: number }) {
  return (
    <div
      style={{
        background: "rgba(201,168,76,0.15)",
        border: "2px solid var(--gold)",
        borderRadius: "50%",
        width: size * 2.6,
        height: size * 2.6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FiPlay size={size} color="var(--gold)" fill="var(--gold)" />
    </div>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    zIndex: 10,
    background: "rgba(8,8,8,0.8)",
    border: "1px solid rgba(201,168,76,0.35)",
    color: "var(--gold)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
  };
}
