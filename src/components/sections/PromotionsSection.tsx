import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import useFancybox from "@/hooks/useFancybox";
import type { Promotion } from "@/types";

export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  useFancybox();

  useEffect(() => {
    fetch("/data/promotions.json")
      .then((r) => r.json())
      .then(setPromotions);
  }, []);

  return (
    <section
      id="promotions"
      style={{ padding: "100px 0", background: "var(--black)" }}
    >
      <div className="container" style={{ marginBottom: 48 }}>
        <p className="section-eyebrow">Brand Promotions</p>
        <h2 className="section-title">
          Creative work
          <br />
          <em>for great brands.</em>
        </h2>
      </div>

      {promotions.slice(0, 6).map((promo) => (
        <div key={promo.brand} style={{ marginBottom: 60 }}>
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {promo.logo && (
              <img
                src={`/assets/brands/${promo.logo}`}
                alt={promo.brand}
                style={{ height: 36, objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--white)",
              }}
            >
              {promo.brand}
            </h3>
          </div>

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
              nextEl: `.promo-next-${promo.folder}`,
              prevEl: `.promo-prev-${promo.folder}`,
            }}
            slidesPerView="auto"
            centeredSlides
            spaceBetween={12}
            className="reel-swiper"
            style={{ paddingBottom: 8 }}
          >
            {promo.images.map((img) => (
              <SwiperSlide key={img} style={{ width: 180 }}>
                <a
                  href={`/assets/promotions/${promo.folder}/${img}`}
                  data-fancybox={`promo-${promo.folder}`}
                  style={{ display: "block" }}
                >
                  <img
                    src={`/assets/promotions/${promo.folder}/${img}`}
                    alt={`${promo.brand} promotion`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      aspectRatio: "9/16",
                      objectFit: "cover",
                      borderRadius: "var(--radius)",
                      border: "1px solid rgba(201,168,76,0.1)",
                    }}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`promo-prev-${promo.folder}`}
            style={{ display: "none" }}
          />
          <button
            className={`promo-next-${promo.folder}`}
            style={{ display: "none" }}
          />
        </div>
      ))}

      <div className="container" style={{ textAlign: "center", marginTop: 16 }}>
        <Link to="/brand" className="btn-ghost">
          View All Brand Work →
        </Link>
      </div>
    </section>
  );
}
