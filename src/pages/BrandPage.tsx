import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import Contact from "@/components/sections/Contact";
import type { Creator, Promotion, Brand } from "@/types";

export default function BrandPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [festivalVideos, setFestivalVideos] = useState<string[]>([]);
  const [photowalks, setPhotowalks] = useState<{
    videos: string[];
    photos: string[];
  }>({ videos: [], photos: [] });
  useFancybox();

  useEffect(() => {
    Promise.all([
      fetch("/data/creators.json").then((r) => r.json()),
      fetch("/data/promotions.json").then((r) => r.json()),
      fetch("/data/brands.json").then((r) => r.json()),
      fetch("/data/festival.json").then((r) => r.json()),
      fetch("/data/photowalk.json").then((r) => r.json()),
    ]).then(([c, p, b, f, pw]) => {
      setCreators(c);
      setPromotions(p);
      setBrands(b);
      setFestivalVideos(f.festivalVideos || []);
      setPhotowalks({ videos: pw.videos || [], photos: pw.photos || [] });
    });
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
        style={{
          paddingTop: "calc(var(--nav-h) + 60px)",
          paddingBottom: 80,
          background: "var(--dark-3)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <img
              src="/assets/namashkar-kolkata/logo_symbol.jpg"
              alt="NK"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--gold)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Brand & Digital Media
            </p>
          </div>
          <h1 className="section-title" style={{ maxWidth: 700 }}>
            Building Kolkata's
            <br />
            <em>creative voice.</em>
          </h1>
          <p
            style={{
              color: "var(--white-dim)",
              fontSize: "1rem",
              maxWidth: 560,
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            70K+ followers. 1M+ monthly reach. Kolkata's leading creative media
            platform.
          </p>
          {/* Logo animation video */}
          <a
            href="https://www.youtube.com/watch?v=1x3CvtiVlNs"
            data-fancybox="nk-intro"
            data-type="iframe"
            data-src="https://www.youtube.com/embed/1x3CvtiVlNs?autoplay=1"
            style={{
              display: "inline-block",
              position: "relative",
              maxWidth: 480,
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <img
              src="/assets/namashkar-kolkata/Youtube_Banner.webp"
              alt="Namashkar Kolkata"
              style={{ width: "100%", display: "block" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = ytThumb(
                  "1x3CvtiVlNs",
                  "hqdefault",
                );
              }}
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
              <span style={{ fontSize: "3.5rem", color: "var(--gold)" }}>
                ▶
              </span>
            </div>
            <p
              style={{
                position: "absolute",
                bottom: 16,
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--white)",
              }}
            >
              Watch Channel Intro
            </p>
          </a>
        </div>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              marginBottom: 60,
            }}
          >
            {/* Timeline */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 28,
                }}
              >
                Festival Schedule
              </h3>
              {creators.map((c) => (
                <div
                  key={c.day}
                  style={{ display: "flex", gap: 16, marginBottom: 20 }}
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
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--gold)",
                      marginTop: 2,
                    }}
                  >
                    {c.day}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "var(--white)",
                        fontSize: "0.88rem",
                        marginBottom: 2,
                      }}
                    >
                      {c.mentor}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--gold)",
                        letterSpacing: "0.06em",
                        marginBottom: 4,
                      }}
                    >
                      {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mentors */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                  marginBottom: 28,
                }}
              >
                Featured Mentors
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {creators
                  .filter((c) => c.image)
                  .map((c) => (
                    <a
                      key={c.day}
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
                          transition: "transform 0.35s",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform =
                            "scale(1.03)";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform =
                            "scale(1)";
                        }}
                      />
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: "var(--white-dim)",
                          marginTop: 6,
                          textAlign: "center",
                        }}
                      >
                        {c.mentor}
                      </p>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Festival playlist */}
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
                  modules={[Navigation]}
                  navigation={{ nextEl: ".fest-next", prevEl: ".fest-prev" }}
                  slidesPerView="auto"
                  spaceBetween={12}
                  style={{ paddingLeft: 24, paddingRight: 24 }}
                >
                  {festivalVideos.map((id) => (
                    <SwiperSlide key={id} style={{ width: 200 }}>
                      <a
                        href={`https://www.youtube.com/watch?v=${id}`}
                        data-fancybox="festival-vids"
                        data-type="iframe"
                        data-src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      >
                        <img
                          src={ytThumb(id)}
                          alt="Festival video"
                          loading="lazy"
                          style={{
                            width: "100%",
                            aspectRatio: "16/9",
                            objectFit: "cover",
                            borderRadius: "var(--radius)",
                            border: "1px solid rgba(201,168,76,0.1)",
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="fest-prev" style={navBtn("left")}>
                  ‹
                </button>
                <button className="fest-next" style={navBtn("right")}>
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
        <style>{`@media(max-width:768px){#nkf-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ── NK Photowalk ── */}
      <section style={{ padding: "80px 0", background: "var(--dark-2)" }}>
        <div className="container">
          <p className="section-eyebrow">Community Event</p>
          <h2 className="section-title">
            Kolkata's biggest <em>photowalk.</em>
          </h2>

          <div
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
            {photowalks.videos.length > 0 && (
              <a
                href={`https://www.youtube.com/watch?v=${photowalks.videos[0]}`}
                data-fancybox="pw-radio"
                data-type="iframe"
                data-src={`https://www.youtube.com/embed/${photowalks.videos[0]}?autoplay=1`}
                style={{
                  background: "var(--dark)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                }}
              >
                <img
                  src={ytThumb(photowalks.videos[0], "mqdefault")}
                  alt="93.5 FM"
                  style={{ width: 120, objectFit: "cover" }}
                />
                <div style={{ padding: 20 }}>
                  <p
                    style={{
                      fontWeight: 700,
                      color: "var(--white)",
                      marginBottom: 4,
                    }}
                  >
                    93.5 FM Radio Feature
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--white-dim)" }}>
                    Media recognition on 93.5 FM
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 40,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "2rem",
                    color: "var(--gold)",
                  }}
                >
                  ▶
                </div>
              </a>
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
