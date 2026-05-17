import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import { FiPlay } from "react-icons/fi";
import Contact from "@/components/sections/Contact";
gsap.registerPlugin(ScrollTrigger);
import type { Creator, Promotion, Brand, YTVideo } from "@/types";

export default function BrandPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [festivalVideos, setFestivalVideos] = useState<YTVideo[]>([]);
  const [photowalks, setPhotowalks] = useState<{
    videos: YTVideo[];
    photos: string[];
  }>({ videos: [], photos: [] });
  const mentorsSwiperRef = useRef<SwiperRef>(null);
  useFancybox();

  useEffect(() => {
    Promise.all([
      fetch("/data/creators.json").then((r) => r.json()),
      fetch("/data/promotions.json").then((r) => r.json()),
      fetch("/data/brands.json").then((r) => r.json()),
      fetch("/data/namashkar-kolkata-festival.json").then((r) => r.json()),
      fetch("/data/namashkar-kolkata-photowalk.json").then((r) => r.json()),
      fetch("/data/photowalk.json").then((r) => r.json()),
    ]).then(([c, p, b, festVids, pwVids, pw]) => {
      setCreators(c);
      setPromotions(p);
      setBrands(b);
      setFestivalVideos(Array.isArray(festVids) ? festVids : []);
      setPhotowalks({ videos: Array.isArray(pwVids) ? pwVids : [], photos: pw.photos || [] });
    });
  }, []);

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
          src="/assets/namashkar-kolkata/Youtube_Banner.webp"
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
                width: 120,
                height: 120,
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
                fontSize: "clamp(3rem, 8vw, 7rem)",
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
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
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
                ["500+", "Content Pieces"],
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
        <style>{`@media(max-width:768px){#brand-about-grid{grid-template-columns:1fr!important}}`}</style>
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
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48 }}
          >
            {/* Left: Festival Schedule / Timeline */}
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
                Festival Schedule
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {creators.map((c) => (
                  <div
                    key={c.day}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "var(--radius)",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(201,168,76,0.1)",
                      display: "flex",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "var(--gold)",
                        marginTop: 2,
                      }}
                    >
                      {c.day}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "var(--white)", fontSize: "0.88rem", marginBottom: 2 }}>
                        {c.mentor}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--gold)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: c.description ? 4 : 0,
                        }}
                      >
                        {c.role}
                      </p>
                      {c.description && (
                        <p style={{ fontSize: "0.76rem", color: "var(--white-dim)", lineHeight: 1.5 }}>
                          {c.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured Mentors Swiper */}
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
                <Swiper
                  ref={mentorsSwiperRef}
                  modules={[Autoplay]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop
                  slidesPerView={2}
                  spaceBetween={16}
                  breakpoints={{ 0: { slidesPerView: 1 }, 480: { slidesPerView: 2 } }}
                >
                  {creators
                    .filter((c) => c.image)
                    .map((c) => (
                      <SwiperSlide key={c.day}>
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
                              aspectRatio: "9/16",
                              objectFit: "cover",
                              borderRadius: "var(--radius)",
                              border: "1px solid rgba(201,168,76,0.1)",
                              display: "block",
                            }}
                          />
                        </a>
                        <p style={{ fontWeight: 700, color: "var(--white)", fontSize: "0.82rem", marginTop: 8, textAlign: "center" }}>
                          {c.mentor}
                        </p>
                        <p style={{ fontSize: "0.7rem", color: "var(--gold)", textAlign: "center", marginTop: 2 }}>
                          {c.role}
                        </p>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <button
                  className="nkf-mentor-prev"
                  onClick={() => mentorsSwiperRef.current?.swiper.slidePrev()}
                  style={navBtn("left")}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className="nkf-mentor-next"
                  onClick={() => mentorsSwiperRef.current?.swiper.slideNext()}
                  style={navBtn("right")}
                  aria-label="Next"
                >
                  ›
                </button>
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
                  modules={[Navigation, Autoplay]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop
                slidesPerView={3}
                  spaceBetween={10}
                  style={{ width: "100%", borderRadius: "var(--radius)", overflow: "hidden" }}
                >
                  {festivalVideos.map((v) => (
                    <SwiperSlide key={v.id}>
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
                          <span style={{ fontSize: "3.5rem", color: "var(--white)", opacity: 0.9 }}>▶</span>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "40px 24px 20px",
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                          }}
                        >
                          <p style={{ color: "var(--white)", fontWeight: 600, fontSize: "0.95rem" }}>{v.title}</p>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="fest-prev" style={navBtn("left")} aria-label="Previous">‹</button>
                <button className="fest-next" style={navBtn("right")} aria-label="Next">›</button>
              </div>
            </div>
          )}
        </div>
        <style>{`@media(max-width:768px){#nkf-grid,#nkf-schedule-grid{grid-template-columns:1fr!important}}`}</style>
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
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
                {/* Showreel */}
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
                  }}
                >
                  <img
                    src={photowalks.videos[0].thumbnail || ytThumb(photowalks.videos[0].id, "mqdefault")}
                    alt="Showreel"
                    style={{ width: 120, aspectRatio: "16/9", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ padding: "16px 20px" }}>
                    <p style={{ fontWeight: 700, color: "var(--white)", marginBottom: 4, fontSize: "0.9rem" }}>
                      Photowalk Showreel
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--white-dim)" }}>Official highlight reel</p>
                  </div>
                  <div style={{ position: "absolute", left: 40, top: "50%", transform: "translateY(-50%)", fontSize: "1.8rem", color: "var(--gold)" }}>▶</div>
                </a>
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
                    src={photowalks.videos[1].thumbnail || ytThumb(photowalks.videos[1].id, "mqdefault")}
                    alt="91.3 FM"
                    style={{ width: 120, aspectRatio: "16/9", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ padding: "16px 20px" }}>
                    <p style={{ fontWeight: 700, color: "var(--white)", marginBottom: 4, fontSize: "0.9rem" }}>
                      91.3 FM Radio Feature
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--white-dim)" }}>
                      Media recognition on 91.3 FM
                    </p>
                  </div>
                  <div style={{ position: "absolute", left: 40, top: "50%", transform: "translateY(-50%)", fontSize: "1.8rem", color: "var(--gold)" }}>▶</div>
                </a>
              </>
            )}
          </div>

          {/* Photowalk photos carousel */}
          {photowalks.photos.length > 0 && (
            <div style={{ position: "relative" }}>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{ nextEl: ".pw-next", prevEl: ".pw-prev" }}
                autoplay={{ delay: 3000 }}
                loop
                slidesPerView="auto"
                spaceBetween={12}
              >
                {photowalks.photos.map((p) => (
                  <SwiperSlide key={p} style={{ width: 280 }}>
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
            </div>
          )}
        </div>
        <style>{`@media(max-width:768px){#pw-intro-grid,#pw-media-grid{grid-template-columns:1fr!important}}`}</style>
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
          {promotions.map((promo) => (
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
                  modules={[Navigation, EffectCoverflow]}
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
                  slidesPerView="auto"
                  centeredSlides
                  spaceBetween={12}
                >
                  {promo.images.map((img) => (
                    <SwiperSlide key={img} style={{ width: 180 }}>
                      <a
                        href={`/assets/promotions/${promo.folder}/${img}`}
                        data-fancybox={`bp-${promo.folder}`}
                      >
                        <img
                          src={`/assets/promotions/${promo.folder}/${img}`}
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
                  ))}
                </Swiper>
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
          ))}
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
