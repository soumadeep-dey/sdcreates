import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          ".hero-name-line:first-child",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          ".hero-name-line.italic",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        )
        .to(
          ".hero-tagline",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        )
        .to(
          ".hero-roles",
          { opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          ".hero-cta-group",
          { opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.2",
        )
        .from(
          ".hero-scroll-hint",
          { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
          "-=0.1",
        )
        .from(
          ".hero-reel-badge",
          { opacity: 0, x: 20, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "var(--nav-h) 24px 140px",
      }}
    >
      {/* Background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(13,148,136,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 60% 80% at 80% 80%, rgba(201,168,76,0.06) 0%, transparent 60%),
          linear-gradient(160deg, #0c0c0c 0%, #080808 50%, #0a0808 100%)
        `,
        }}
      />
      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      {/* Scan lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
        }}
      />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        <p
          className="hero-eyebrow"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 20,
            opacity: 0,
          }}
        >
          Filmmaker · Engineer · Storyteller
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            color: "var(--white)",
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            className="hero-name-line"
            style={{ display: "block", opacity: 0 }}
          >
            Soumadeep
          </span>
          <span
            className="hero-name-line italic"
            style={{
              display: "block",
              opacity: 0,
              fontStyle: "italic",
              color: "var(--gold)",
            }}
          >
            Dey
          </span>
        </h1>
        <p
          className="hero-tagline"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            fontStyle: "italic",
            color: "var(--white-dim)",
            marginBottom: 24,
            opacity: 0,
          }}
        >
          I build experiences — on screen and in code.
        </p>
        <div
          className="hero-roles"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--white-dim)",
            marginBottom: 48,
            opacity: 0,
          }}
        >
          {[
            "Director",
            "Cinematographer",
            "Film Editor",
            "Colorist",
            "Full Stack Engineer",
          ].map((role, i, arr) => (
            <span key={role}>
              {role}
              {i < arr.length - 1 && (
                <span
                  style={{
                    color: "var(--gold)",
                    opacity: 0.5,
                    margin: "0 4px",
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
        <div
          className="hero-cta-group"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-ghost"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint"
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--white-faint)",
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: 22,
            height: 36,
            border: "2px solid rgba(201,168,76,0.4)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              background: "var(--gold)",
              borderRadius: 2,
              animation: "scrollMouse 1.6s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`@keyframes scrollMouse{0%,100%{opacity:1;transform:translateY(0)}50%{opacity:0.4;transform:translateY(6px)}}`}</style>
      </div>

      {/* Reel badge */}
      <a
        href="https://www.youtube.com/c/SDeyProductions"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-reel-badge"
        style={{
          position: "absolute",
          right: 32,
          bottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.3)",
          padding: "10px 18px",
          borderRadius: 40,
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--gold)",
          transition: "background 0.35s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(201,168,76,0.15)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(201,168,76,0.08)")
        }
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
        </svg>
        Watch Showreel
      </a>
    </section>
  );
}
