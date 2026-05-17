import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import type { Brand } from "@/types";

export default function BrandsSection() {
  const ref = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/data/brands.json")
      .then((r) => r.json())
      .then(setBrands);
  }, []);

  return (
    <section
      id="brands"
      ref={ref}
      style={{ padding: "80px 0", background: "var(--dark)" }}
    >
      <div className="container" style={{ marginBottom: 32 }}>
        <p className="section-eyebrow" style={{ textAlign: "center" }}>
          Trusted By
        </p>
        <h2
          className="section-title"
          style={{ textAlign: "center", marginBottom: 0 }}
        >
          Brands that <em>believed.</em>
        </h2>
      </div>

      <div style={{ position: "relative" }}>
        {/* Nav buttons */}
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          aria-label="Previous brands"
          style={{
            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
            zIndex: 10, background: "rgba(8,8,8,0.85)",
            border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)",
            width: 36, height: 36, borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ‹
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          aria-label="Next brands"
          style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
            zIndex: 10, background: "rgba(8,8,8,0.85)",
            border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)",
            width: 36, height: 36, borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ›
        </button>
        <div
          style={{
            paddingBottom: 8,
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, FreeMode]}
            freeMode={{ enabled: true }}
            slidesPerView="auto"
            spaceBetween={40}
            loop
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
            speed={5000}
            allowTouchMove={false}
          >
          {[...brands, ...brands]
            .filter((b) => b.file)
            .map((brand, i) => (
              <SwiperSlide key={i} style={{ width: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 60,
                    padding: "0 8px",
                  }}
                >
                  <img
                    src={`/assets/brands/${brand.file}`}
                    alt={brand.name}
                    title={brand.name}
                    loading="lazy"
                    style={{
                      height: 44,
                      width: "auto",
                      maxWidth: 120,
                      objectFit: "contain",
                      filter: "brightness(0.9) saturate(1.1)",
                      transition: "filter 0.35s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.filter =
                        "brightness(1.1) saturate(1.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.filter =
                        "brightness(0.9) saturate(1.1)";
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="container" style={{ textAlign: "center", marginTop: 36 }}>
        <Link to="/brand" className="btn-ghost" style={{ fontSize: "0.8rem" }}>
          View All Brands →
        </Link>
      </div>
    </section>
  );
}
