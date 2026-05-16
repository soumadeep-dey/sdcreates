import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { Brand } from "@/types";

export default function BrandsSection() {
  const ref = useRef<HTMLElement>(null);
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

      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={40}
        loop
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        allowTouchMove={false}
        style={{ paddingBottom: 8 }}
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
    </section>
  );
}
