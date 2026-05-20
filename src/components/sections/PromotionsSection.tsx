import { useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFancybox from "@/hooks/useFancybox";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { usePromotions } from "@/hooks/useQueries";
import { ytUrl } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);

type FlatItem =
  | { type: "image"; src: string; brand: string; folder: string }
  | {
      type: "video";
      id: string;
      title: string;
      thumbnail: string;
      brand: string;
    };

export default function PromotionsSection() {
  const ref = useRef<HTMLElement>(null);
  const { data: promos } = usePromotions();
  useFancybox();

  const items = useMemo<FlatItem[]>(() => {
    if (!promos) return [];
    const flat: FlatItem[] = [];
    const itemsPerBrand = 6; // max items per brand (video+image pairs)

    for (const p of promos) {
      const videos = (p.videos || []).slice(0, 3);
      const images = (p.images || []).slice(0, 3);
      let vIdx = 0,
        iIdx = 0;
      let count = 0;

      // Alternate: video, image, video, image, ...
      while (
        (vIdx < videos.length || iIdx < images.length) &&
        count < itemsPerBrand
      ) {
        if (vIdx < videos.length) {
          flat.push({
            type: "video",
            id: videos[vIdx].id,
            title: videos[vIdx].title,
            thumbnail: videos[vIdx].thumbnail,
            brand: p.brand,
          });
          vIdx++;
          count++;
        }
        if (iIdx < images.length && count < itemsPerBrand) {
          flat.push({
            type: "image",
            src: `/assets/promotions/${p.folder}/${images[iIdx]}`,
            brand: p.brand,
            folder: p.folder,
          });
          iIdx++;
          count++;
        }
        if (flat.length >= 24) break; // stop after enough total items
      }
      if (flat.length >= 24) break;
    }
    return flat.slice(0, 24);
  }, [promos]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".promo-title-wrap",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="promotions"
      ref={ref}
      style={{
        padding: "100px 0",
        background: "var(--black)",
        overflow: "hidden",
      }}
    >
      <div
        className="container promo-title-wrap"
        style={{ marginBottom: 52, opacity: 0 }}
      >
        <p className="section-eyebrow">Brand Promotions</p>
        <h2 className="section-title">
          Creative work
          <br />
          <em>for great brands.</em>
        </h2>
      </div>

      {items.length > 0 && (
        <div
          style={{ position: "relative", paddingInline: 48, paddingBottom: 36 }}
        >
          <button className="promo-flat-prev" style={navBtnStyle("left")}>
            <FiChevronLeft size={20} />
          </button>
          <button className="promo-flat-next" style={navBtnStyle("right")}>
            <FiChevronRight size={20} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".promo-flat-next",
              prevEl: ".promo-flat-prev",
            }}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            loop
            slidesPerView="auto"
            spaceBetween={16}
            centeredSlides={false}
            allowTouchMove={true}
            className="promo-flat-swiper"
            style={{ paddingBottom: 8 }}
          >
            {items.map((item, idx) =>
              item.type === "video" ? (
                <SwiperSlide
                  key={`vid-${item.id}-${idx}`}
                  style={{ width: 200 }}
                >
                  <a
                    href={ytUrl(item.id)}
                    data-fancybox="promotions-mixed"
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
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "9/16",
                        objectFit: "cover",
                        display: "block",
                        border: "1px solid rgba(201,168,76,0.1)",
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
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "28px 10px 10px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                        }}
                      >
                        {item.brand}
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
              ) : (
                <SwiperSlide
                  key={`img-${item.src}-${idx}`}
                  style={{ width: 200 }}
                >
                  <a
                    href={item.src}
                    data-fancybox="promotions-mixed"
                    data-caption={item.brand}
                    style={{
                      display: "block",
                      position: "relative",
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.brand}
                      loading="lazy"
                      style={{
                        width: "100%",
                        aspectRatio: "9/16",
                        objectFit: "cover",
                        display: "block",
                        border: "1px solid rgba(201,168,76,0.1)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "28px 10px 10px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                        }}
                      >
                        {item.brand}
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>
      )}

      <div className="container" style={{ textAlign: "center", marginTop: 48 }}>
        <Link to="/brand" className="btn-ghost">
          View All Brand Work →
        </Link>
      </div>
    </section>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 8,
    zIndex: 10,
    background: "rgba(8,8,8,0.85)",
    border: "1px solid rgba(201,168,76,0.35)",
    color: "var(--gold)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
  };
}
