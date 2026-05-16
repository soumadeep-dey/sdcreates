import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ytThumb, ytUrl } from "@/lib/utils";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";

interface Props {
  videoIds: string[];
  groupId: string;
  /** When true, clicking a video navigates to /work/video/[id] instead of fancybox */
  linkToPage?: boolean;
  loading?: boolean;
}

export default function VideoCarousel({
  videoIds,
  groupId,
  linkToPage = false,
  loading = false,
}: Props) {
  const swiperRef = useRef<SwiperRef>(null);

  if (loading) {
    return (
      <SkeletonTheme baseColor="var(--dark-2)" highlightColor="var(--dark-3)">
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "0 48px",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ flexShrink: 0, width: 220 }}>
              <Skeleton
                style={{ aspectRatio: "16/9", borderRadius: "var(--radius)" }}
              />
              <Skeleton height={14} style={{ marginTop: 8, borderRadius: 2 }} />
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div style={{ position: "relative", padding: "0 48px" }}>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        navigation={{
          nextEl: `.vc-next-${groupId}`,
          prevEl: `.vc-prev-${groupId}`,
        }}
        slidesPerView="auto"
        spaceBetween={12}
      >
        {videoIds.map((id) => (
          <SwiperSlide key={id} style={{ width: 220 }}>
            <VideoCard videoId={id} linkToPage={linkToPage} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`vc-prev-${groupId}`}
        style={navBtn("left")}
        aria-label="Previous"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        className={`vc-next-${groupId}`}
        style={navBtn("right")}
        aria-label="Next"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}

function VideoCard({
  videoId,
  linkToPage,
}: {
  videoId: string;
  linkToPage: boolean;
}) {
  const thumb = ytThumb(videoId, "mqdefault");

  const inner = (
    <div
      className="video-card"
      style={{
        width: "100%",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={thumb}
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
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      >
        <FiPlay size={28} color="var(--white)" fill="var(--white)" />
      </div>
      <style>{`.video-card:hover .play-overlay{opacity:1!important}`}</style>
    </div>
  );

  if (linkToPage) {
    return (
      <Link
        to={`/work/video/${videoId}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={ytUrl(videoId)}
      data-fancybox={`vc-${videoId.slice(0, 4)}`}
      data-type="iframe"
      data-src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      style={{ display: "block", textDecoration: "none" }}
    >
      {inner}
    </a>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 4,
    zIndex: 10,
    background: "rgba(8,8,8,0.8)",
    border: "1px solid rgba(201,168,76,0.35)",
    color: "var(--gold)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
    transition: "background 0.25s, border-color 0.25s",
  };
}
