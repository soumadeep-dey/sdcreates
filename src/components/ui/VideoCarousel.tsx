import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ytThumb, ytUrl } from "@/lib/utils";

interface Props {
  videoIds: string[];
  groupId: string;
}

export default function VideoCarousel({ videoIds, groupId }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: `.next-${groupId}`, prevEl: `.prev-${groupId}` }}
        slidesPerView="auto"
        spaceBetween={12}
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {videoIds.map((id) => (
          <SwiperSlide key={id} style={{ width: 200 }}>
            <VideoCard videoId={id} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`prev-${groupId}`}
        style={navBtn("left")}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className={`next-${groupId}`}
        style={navBtn("right")}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

function VideoCard({ videoId }: { videoId: string }) {
  return (
    <a
      href={ytUrl(videoId)}
      data-fancybox="video-player"
      data-type="iframe"
      data-src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <div className="video-card" style={{ width: "100%" }}>
        <div style={{ position: "relative" }}>
          <img
            src={ytThumb(videoId, "mqdefault")}
            alt="Video thumbnail"
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            className="play-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.35s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{ fontSize: "2.5rem", color: "var(--white)" }}>▶</span>
          </div>
        </div>
      </div>
    </a>
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
    backdropFilter: "blur(8px)",
  };
}
