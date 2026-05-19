import { useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb, ytUrl } from "@/lib/utils";
import { FiPlay } from "react-icons/fi";
import Contact from "@/components/sections/Contact";
gsap.registerPlugin(ScrollTrigger);
import {
  useCreators,
  usePromotions,
  useBrands,
  useFestivalVideos,
  usePhotoWalkVideos,
  usePhotowalk,
} from "@/hooks/useQueries";

export default function BrandPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { data: creators = [] } = useCreators();
  const { data: promotions = [] } = usePromotions();
  const { data: brands = [] } = useBrands();
  const { data: festivalVideos = [] } = useFestivalVideos();
  const { data: pwVids = [] } = usePhotoWalkVideos();
  const { data: pwData } = usePhotowalk();

  const photowalks = useMemo(
    () => ({ videos: pwVids, photos: pwData?.photos || [] }),
    [pwVids, pwData],
  );

  const festivalRef = useRef<HTMLDivElement>(null);
  useFancybox();

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nk-hero-logo",
        { opacity: 0, scale: 0.7, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "back.out(1.5)" },
      );
      gsap.fromTo(
        ".nk-hero-text > *",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.3,
        },
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!creators.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nkf-tl-item",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: festivalRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, festivalRef);
    return () => ctx.revert();
  }, [creators]);

  return (
    <>
      <Helmet>
        <title>Brand — Namashkar Kolkata | Soumadeep Dey</title>
        <meta
          name="description"
          content="Namashkar Kolkata — Building Kolkata's creative voice. 70K+ followers, 1M+ monthly reach."
        />
      </Helmet>

      {/* ── NK Hero ── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "var(--dark-3)",
        }}
      >
        {/* Full-bleed banner */}
        <img
          src="/assets/namashkar-kolkata/paper.webp"
          alt="Namashkar Kolkata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.35,
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(6,6,6,0.65) 0%, rgba(6,6,6,0.55) 40%, rgba(6,6,6,0.55) 60%, rgba(6,6,6,0.88) 100%)",
          }}
        />

        {/* Content */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            paddingTop: "calc(var(--nav-h) + 40px)",
            paddingBottom: 80,
          }}
        >
          {/* Logo circle */}
          <div
            className="nk-hero-logo"
            style={{
              display: "inline-block",
              marginBottom: 28,
              position: "relative",
              opacity: 0,
            }}
          >
            <div
              style={{
                width: "clamp(80px, 18vw, 120px)",
                height: "clamp(80px, 18vw, 120px)",
                borderRadius: "50%",
                border: "2px solid var(--gold)",
                padding: 4,
                background: "rgba(6,6,6,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/assets/namashkar-kolkata/logo_symbol.jpg"
                alt="NK"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            {/* Gold ring animation */}
            <div
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.3)",
                animation: "nk-ring 2.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Text block */}
          <div className="nk-hero-text">
            <p
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 14,
                opacity: 0,
              }}
            >
              Brand & Digital Media
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                lineHeight: 0.92,
                color: "var(--white)",
                marginBottom: 20,
                opacity: 0,
              }}
            >
              NAMASHKAR
              <br />
              <span style={{ color: "var(--gold)" }}>KOLKATA</span>
            </h1>
            <p
              style={{
                color: "var(--white-dim)",
                fontSize: "1.05rem",
                maxWidth: 520,
                lineHeight: 1.75,
                margin: "0 auto 36px",
                opacity: 0,
              }}
            >
              70K+ followers · 1M+ monthly reach
              <br />
              Kolkata's leading creative media platform.
            </p>

            {/* Logo animation video CTA */}
            <div style={{ opacity: 0 }}>
              <a
                href="https://www.youtube.com/watch?v=1x3CvtiVlNs"
                data-fancybox="nk-intro"
                data-type="iframe"
                data-src="https://www.youtube.com/embed/1x3CvtiVlNs?autoplay=1"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  borderRadius: "var(--radius)",
                  padding: "14px 28px",
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiPlay size={16} color="var(--black)" fill="var(--black)" />
                </span>
                Watch Channel Intro
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes nk-ring {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.12); opacity: 0.7; }
          }
          .nk-hero-text > * { opacity: 0; }
        `}</style>
      </section>

      {/* ── NK About ── */}
      <section style={{ padding: "80px 0", background: "var(--black)" }}>
        <div
          className="container nk-about-grid"
          id="brand-about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "start",
          }}
        >
          <div>
            <h2 className="section-title">
              Namashkar <em>Kolkata</em>
            </h2>
            <p
              style={{
                color: "var(--white-dim)",
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              Namashkar Kolkata is a creative media brand that showcases the
              finest photographic, cinematic, and visual storytelling content
              from Bengal. Built as a creative movement, the platform celebrates
              Kolkata's photographers, filmmakers, artists, and storytellers.
            </p>
            <p
              style={{
                color: "var(--white-dim)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              From organizing Kolkata's biggest photowalk with 500+
              photographers to building a 7-day creator festival, every
              initiative was built on one belief:{" "}
              <em style={{ color: "var(--gold)" }}>
                creativity builds community.
              </em>
            </p>
            <div style={{ display: "flex", gap: 32, marginBottom: 28 }}>
              {[
                ["70K+", "Followers"],
                ["1M+", "Monthly Reach"],
                ["Millions", "Video Views"],
              ].map(([n, l]) => (
                <div key={l}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      color: "var(--gold)",
                      display: "block",
                    }}
                  >
                    {n}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--white-dim)",
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                ["Instagram", "https://instagram.com/namashkar_kolkata"],
                ["YouTube", "https://www.youtube.com/@namashkarkolkata2019"],
                ["Facebook", "http://facebook.com/namashkar_kolkata"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ padding: "8px 16px", fontSize: "0.75rem" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div
              className="elfsight-app-6055f7e7-0f56-455f-8f12-fe9ec33c2590"
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </section>

      {/* ── NK Festival ── */}
      <section style={{ padding: "80px 0", background: "var(--dark)" }}>
        <div className="container">
          <p className="section-eyebrow">Event</p>
          <h2 className="section-title">
            Namashkar Kolkata <em>Festival</em>
          </h2>
          <p
            style={{
              color: "var(--white-dim)",
              maxWidth: 640,
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          >
            A 7-day creator festival featuring Kolkata's finest — photographers,
            filmmakers, designers, radio jockeys. Streamed live every day at 7
            PM on YouTube, inspiring the younger generation during the pandemic.
          </p>

          {/* Festival Schedule + Mentors — side by side */}
          <div
            id="nkf-schedule-grid"
            className="nk-festival-schedule-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "clamp(40px, 5vw, 48px)",
              alignItems: "start",
              marginBottom: 48,
            }}
          >
            {/* Left: Festival Schedule / Timeline */}
            <div ref={festivalRef}>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 20,
                }}
              >
                Festival Schedule
              </h3>
              <div style={{ position: "relative", paddingLeft: 44 }}>
                {/* Vertical timeline line */}
                <div
                  style={{
                    position: "absolute",
                    left: 13,
                    top: 6,
                    bottom: 6,
                    width: 2,
                    background:
                      "linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.06))",
                  }}
                />
                {creators.map((c) => (
                  <div
                    className="nkf-tl-item"
                    key={c.day}
                    style={{
                      position: "relative",
                      marginBottom: 14,
                      opacity: 0,
                    }}
                  >
                    {/* Day dot on the line */}
                    <div
                      style={{
                        position: "absolute",
                        left: -44,
                        top: 10,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "var(--dark)",
                        border: "2px solid var(--gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "var(--gold)",
                        zIndex: 1,
                      }}
                    >
                      {c.day}
                    </div>
                    {/* Content card */}
                    <div
                      style={{
                        padding: "12px 14px",
                        background: "rgba(201,168,76,0.02)",
                        border: "1px solid rgba(201,168,76,0.1)",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          color: "var(--white)",
                          fontSize: "0.88rem",
                          marginBottom: 2,
                        }}
                      >
                        {c.mentor}
                      </p>
                      <p
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--gold)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: c.description ? 5 : 0,
                        }}
                      >
                        {c.role}
                      </p>
                      {c.description && (
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--white-dim)",
                            lineHeight: 1.5,
                          }}
                        >
                          {c.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Mentors (grid) */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 20,
                }}
              >
                Featured Mentors
              </h3>
              <div style={{ position: "relative" }}>
                <div
                  className="nk-mentors-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                    alignItems: "start",
                  }}
                >
                  {creators
                    .filter((c) => c.image)
                    .map((c) => (
                      <div key={c.day} style={{ textAlign: "center" }}>
                        <a
                          href={c.image!}
                          data-fancybox="nkf-mentors"
                          data-caption={`${c.mentor} — ${c.role}`}
                          style={{ display: "block" }}
                        >
                          <img
                            src={c.image!}
                            alt={c.mentor}
                            loading="lazy"
                            style={{
                              width: "100%",
                              aspectRatio: "2/3",
                              objectFit: "cover",
                              borderRadius: "var(--radius)",
                              border: "1px solid rgba(201,168,76,0.1)",
                              display: "block",
                            }}
                          />
                        </a>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "var(--white)",
                            fontSize: "0.78rem",
                            marginTop: 8,
                          }}
                        >
                          {c.mentor}
                        </p>
                        <p
                          style={{
                            fontSize: "0.65rem",
                            color: "var(--gold)",
                            marginTop: 2,
                          }}
                        >
                          {c.role}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Festival playlist — full width */}
          {festivalVideos.length > 0 && (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 20,
                }}
              >
                Watch The Sessions
              </h3>
              <div style={{ position: "relative" }}>
                <Swiper
                  modules={[Navigation, Autoplay, Pagination]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop
                  slidesPerView={3}
                  spaceBetween={12}
                  navigation={{
                    nextEl: ".fest-next",
                    prevEl: ".fest-prev",
                  }}
                  pagination={{
                    el: ".fest-pagination",
                    type: "bullets",
                    clickable: true,
                  }}
                  style={{
                    width: "100%",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                  }}
                  className="nk-festival-swiper"
                >
                  {festivalVideos.map((v) => (
                    <SwiperSlide key={v.id} style={{ width: 220 }}>
                      <a
                        href={`https://www.youtube.com/watch?v=${v.id}`}
                        data-fancybox="festival-vids"
                        data-type="iframe"
                        data-src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                        style={{ display: "block", position: "relative" }}
                      >
                        <img
                          src={v.thumbnail || ytThumb(v.id, "hqdefault")}
                          alt={v.title}
                          loading="lazy"
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
                            background: "rgba(0,0,0,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "3.5rem",
                              color: "var(--white)",
                              opacity: 0.9,
                            }}
                          >
                            ▶
                          </span>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button
                  className="fest-prev"
                  style={navBtn("left")}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className="fest-next"
                  style={navBtn("right")}
                  aria-label="Next"
                >
                  ›
                </button>
                <div className="fest-pagination" style={{ position: "relative", marginTop: 12 }} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── NK Photowalk ── */}
      <section style={{ padding: "80px 0", background: "var(--dark-2)" }}>
        <div className="container">
          <p className="section-eyebrow">Community Event</p>
          <h2 className="section-title">
            Kolkata's biggest <em>photowalk</em>
          </h2>

          <div
            id="pw-intro-grid"
            className="nk-pw-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px, 5vw, 48px)",
              alignItems: "center",
              marginBottom: 48,
            }}
          >
            <div>
              <p
                style={{
                  color: "var(--white-dim)",
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                Namashkar Kolkata organized Kolkata's biggest community
                photowalk — bringing together 500+ photographers from across the
                city. A celebration of visual storytelling, street photography,
                and creative expression through the lens.
              </p>
              <p style={{ color: "var(--white-dim)", lineHeight: 1.8 }}>
                The photowalk was featured in{" "}
                <strong style={{ color: "var(--white)" }}>The Statesman</strong>{" "}
                — one of India's oldest national newspapers — cementing NK's
                position as a force in Kolkata's creative landscape.
              </p>
              {/* Showreel */}
              {photowalks.videos.length > 0 && (
                <a
                  href={`https://www.youtube.com/watch?v=${photowalks.videos[0].id}`}
                  data-fancybox="pw-showreel"
                  data-type="iframe"
                  data-src={`https://www.youtube.com/embed/${photowalks.videos[0].id}?autoplay=1`}
                  style={{
                    background: "var(--dark)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: 16,
                    padding: 12,
                    marginTop: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{ position: "relative", width: 180, flexShrink: 0 }}
                  >
                    <img
                      src={
                        photowalks.videos[0].thumbnail ||
                        ytThumb(photowalks.videos[0].id, "mqdefault")
                      }
                      alt="Showreel"
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        borderRadius: "var(--radius)",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "1.8rem",
                        color: "var(--gold)",
                        pointerEvents: "none",
                      }}
                    >
                      ▶
                    </div>
                  </div>
                  <div style={{ padding: "8px 12px", flex: 1 }}>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "var(--white)",
                        marginBottom: 4,
                        fontSize: "0.9rem",
                      }}
                    >
                      Photowalk Showreel
                    </p>
                    <p
                      style={{ fontSize: "0.78rem", color: "var(--white-dim)" }}
                    >
                      Official highlight reel
                    </p>
                  </div>
                </a>
              )}
            </div>
            <div>
              <img
                src="/assets/namashkar-kolkata/photowalk/biggest-photowalk-in-kolkata.webp"
                alt="Kolkata Photowalk"
                style={{
                  width: "100%",
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Media recognition */}
          <div
            id="pw-media-grid"
            className="nk-media-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 48,
            }}
          >
            <div
              style={{
                background: "var(--dark)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "var(--radius)",
                padding: "24px",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <a
                href="/assets/namashkar-kolkata/photowalk/Statesman.webp"
                data-fancybox="pw-media"
              >
                <img
                  src="/assets/namashkar-kolkata/photowalk/Statesman.webp"
                  alt="Statesman"
                  style={{ width: 100, objectFit: "cover", borderRadius: 2 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </a>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: 4,
                  }}
                >
                  The Statesman
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--white-dim)" }}>
                  National newspaper feature — Kolkata's biggest photowalk
                </p>
              </div>
            </div>
            {photowalks.videos.length > 1 && (
              <>
                {/* 91.3 FM */}
                <a
                  href={`https://www.youtube.com/watch?v=${photowalks.videos[1].id}`}
                  data-fancybox="pw-radio"
                  data-type="iframe"
                  data-src={`https://www.youtube.com/embed/${photowalks.videos[1].id}?autoplay=1`}
                  style={{
                    background: "var(--dark)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      photowalks.videos[1].thumbnail ||
                      ytThumb(photowalks.videos[1].id, "mqdefault")
                    }
                    alt="91.3 FM"
                    style={{
                      width: 120,
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ padding: "16px 20px" }}>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "var(--white)",
                        marginBottom: 4,
                        fontSize: "0.9rem",
                      }}
                    >
                      91.3 FM Radio Feature
                    </p>
                    <p
                      style={{ fontSize: "0.78rem", color: "var(--white-dim)" }}
                    >
                      Media recognition on 91.3 FM
                    </p>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: 40,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.8rem",
                      color: "var(--gold)",
                    }}
                  >
                    ▶
                  </div>
                </a>
              </>
            )}
          </div>

          {/* Photowalk photos carousel */}
          {photowalks.photos.length > 0 && (
            <div style={{ position: "relative" }}>
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{ nextEl: ".pw-next", prevEl: ".pw-prev" }}
                autoplay={{ delay: 3000 }}
                loop
                slidesPerView="auto"
                spaceBetween={12}
                pagination={{
                  el: ".pw-pagination",
                  type: "bullets",
                  clickable: true,
                }}
                className="nk-photowalk-swiper"
              >
                {photowalks.photos.map((p) => (
                  <SwiperSlide key={p} style={{ width: 220 }}>
                    <a href={p} data-fancybox="pw-gallery">
                      <img
                        src={p}
                        alt="Photowalk"
                        loading="lazy"
                        style={{
                          width: "100%",
                          aspectRatio: "4/3",
                          objectFit: "cover",
                          borderRadius: "var(--radius)",
                        }}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="pw-prev" style={navBtn("left")}>
                ‹
              </button>
              <button className="pw-next" style={navBtn("right")}>
                ›
              </button>
              <div className="pw-pagination" style={{ position: "relative", marginTop: 12 }} />
            </div>
          )}
        </div>
      </section>

      {/* ── Brands Grid ── */}
      <section style={{ padding: "80px 0", background: "var(--dark)" }}>
        <div className="container">
          <p className="section-eyebrow" style={{ textAlign: "center" }}>
            Trusted By
          </p>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Brands worked <em>for.</em>
          </h2>
          <div
            className="nk-brands-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 24,
            }}
          >
            {brands
              .filter((b) => b.file)
              .map((b) => (
                <div
                  key={b.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                    background: "var(--dark-2)",
                    border: "1px solid rgba(201,168,76,0.08)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <img
                    src={`/assets/brands/${b.file}`}
                    alt={b.name}
                    title={b.name}
                    loading="lazy"
                    style={{ height: 40, maxWidth: 100, objectFit: "contain" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── All Promotions ── */}
      <section style={{ padding: "80px 0", background: "var(--black)" }}>
        <div className="container">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">
            Promotion <em>work.</em>
          </h2>
          {promotions.map((promo) => {
            // Create mixed items array (videos + images alternating)
            const mixedItems: Array<
              | { type: "video"; id: string; title: string; thumbnail: string }
              | { type: "image"; src: string }
            > = [];
            const videos = (promo.videos || []).slice(0, 6);
            const images = (promo.images || []).slice(0, 6);
            let vIdx = 0,
              iIdx = 0;

            while (vIdx < videos.length || iIdx < images.length) {
              if (vIdx < videos.length) {
                mixedItems.push({
                  type: "video",
                  id: videos[vIdx].id,
                  title: videos[vIdx].title,
                  thumbnail: videos[vIdx].thumbnail,
                });
                vIdx++;
              }
              if (iIdx < images.length) {
                mixedItems.push({
                  type: "image",
                  src: `/assets/promotions/${promo.folder}/${images[iIdx]}`,
                });
                iIdx++;
              }
            }

            const displayItems =
              mixedItems.length > 0
                ? mixedItems
                : images.map((img) => ({
                    type: "image" as const,
                    src: `/assets/promotions/${promo.folder}/${img}`,
                  }));

            return (
              <div key={promo.brand} style={{ marginBottom: 60 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  {promo.logo && (
                    <img
                      src={`/assets/brands/${promo.logo}`}
                      alt={promo.brand}
                      style={{ height: 32, objectFit: "contain" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--white)",
                    }}
                  >
                    {promo.brand}
                  </h3>
                </div>
                <div style={{ position: "relative" }}>
                  <Swiper
                    modules={[Navigation, EffectCoverflow, Pagination]}
                    effect="coverflow"
                    coverflowEffect={{
                      rotate: 30,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    navigation={{
                      nextEl: `.bp-next-${promo.folder}`,
                      prevEl: `.bp-prev-${promo.folder}`,
                    }}
                    pagination={{
                      el: `.bp-pagination-${promo.folder}`,
                      clickable: true,
                      bulletClass: "bp-bullet",
                      bulletActiveClass: "bp-bullet-active",
                    }}
                    slidesPerView="auto"
                    centeredSlides
                    spaceBetween={12}
                    breakpoints={{
                      1200: {
                        slidesPerView: "auto",
                        spaceBetween: 12,
                        centeredSlides: false,
                      },
                      768: { slidesPerView: "auto", spaceBetween: 12 },
                      480: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                        centeredSlides: true,
                      },
                      0: {
                        slidesPerView: 1.1,
                        spaceBetween: 8,
                        centeredSlides: true,
                      },
                    }}
                    className="nk-promo-swiper"
                  >
                    {displayItems.map((item, idx) =>
                      item.type === "video" ? (
                        <SwiperSlide
                          key={`vid-${item.id}-${idx}`}
                          style={{ width: 180 }}
                        >
                          <a
                            href={ytUrl(item.id)}
                            data-fancybox={`bp-${promo.folder}`}
                            data-width="640"
                            data-height="360"
                            style={{
                              display: "block",
                              position: "relative",
                              borderRadius: "var(--radius)",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={
                                item.thumbnail || ytThumb(item.id, "hqdefault")
                              }
                              alt={item.title}
                              loading="lazy"
                              style={{
                                width: "100%",
                                aspectRatio: "9/16",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(0,0,0,0.3)",
                              }}
                            >
                              <div
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  background: "rgba(201,168,76,0.9)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "var(--black)",
                                }}
                              >
                                <FiPlay size={24} />
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                      ) : (
                        <SwiperSlide
                          key={`img-${item.src}-${idx}`}
                          style={{ width: 180 }}
                        >
                          <a
                            href={item.src}
                            data-fancybox={`bp-${promo.folder}`}
                          >
                            <img
                              src={item.src}
                              alt={`${promo.brand}`}
                              loading="lazy"
                              style={{
                                width: "100%",
                                aspectRatio: "9/16",
                                objectFit: "cover",
                                borderRadius: "var(--radius)",
                              }}
                            />
                          </a>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                  <div
                    className={`bp-pagination-${promo.folder}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 12,
                      marginBottom: 8,
                    }}
                  />
                  <button
                    className={`bp-prev-${promo.folder}`}
                    style={navBtn("left")}
                  >
                    ‹
                  </button>
                  <button
                    className={`bp-next-${promo.folder}`}
                    style={navBtn("right")}
                  >
                    ›
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Contact />
    </>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 0,
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
