import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiLinkedin } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "6+", label: "Years Filming", count: 6, suffix: "+" },
  { num: "2+", label: "Years Engineering", count: 2, suffix: "+" },
  { num: "1K+", label: "IG Features", count: 1000, suffix: "+" },
];

const ROLES = [
  "Director",
  "Cinematographer",
  "Editor",
  "Colorist",
  "Sound Designer",
  "Foley Artist",
  "Photographer",
  "Photo Editor",
  "Full Stack Developer",
  "Digital Marketer",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visibleRoles, setVisibleRoles] = useState<string[]>([]);
  const countersRef = useRef<Map<string, HTMLSpanElement>>(new Map());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide in from left
      gsap.fromTo(
        '[data-gsap="slide-left"]',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
      // Slide in from right
      gsap.fromTo(
        '[data-gsap="slide-right"]',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
      // Counter pop-in for stat cards + count-up animation
      gsap.fromTo(
        ".about-stat-card",
        { opacity: 0, y: 24, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".about-stats-row",
            start: "top 90%",
            once: true,
            onEnter: () => {
              // Counter animation
              countersRef.current.forEach((el) => {
                const target = parseInt(el.dataset.count || "0", 10);
                const suffix = el.dataset.suffix || "";
                const duration = 1.5;
                const start = { val: 0 };
                gsap.to(start, {
                  val: target,
                  duration,
                  ease: "power2.out",
                  onUpdate: () => {
                    el.textContent = Math.round(start.val) + suffix;
                  },
                });
              });
            },
          },
        },
      );
    }, ref);

    // Roles type-on animation triggered by scroll
    let triggered = false;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        ROLES.forEach((role, i) => {
          setTimeout(() => {
            setVisibleRoles((prev) => [...prev, role]);
          }, i * 140);
        });
      },
    });

    return () => {
      ctx.revert();
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--dark)" }}
    >
      <div
        className="container about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Visual */}
        <div
          data-gsap="slide-left"
          style={{
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {/* Profile image with gold frame */}
          <div
            style={{
              position: "relative",
              width: "fit-content",
              isolation: "isolate",
            }}
          >
            <div
              style={{
                aspectRatio: "4/5",
                width: "100%",
                maxWidth: 360,
                background: "var(--dark-3)",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.15)",
                position: "relative",
              }}
            >
              <img
                src="/assets/dp.jpg"
                alt="Soumadeep Dey"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Gold shimmer overlay on image */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, transparent 60%, rgba(201,168,76,0.08) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            {/* Offset gold border frame — behind the image */}
            <div
              style={{
                position: "absolute",
                bottom: -16,
                right: -16,
                width: "70%",
                height: "70%",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: 4,
                pointerEvents: "none",
                zIndex: -1,
              }}
            />
          </div>

          {/* Stats row */}
          <div className="about-stats-row" style={{ display: "flex", gap: 12 }}>
            {STATS.map(({ num, label, count, suffix }) => (
              <div
                key={label}
                className="about-stat-card"
                style={{
                  flex: 1,
                  background: "var(--dark-2)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  padding: "20px 12px",
                  borderRadius: 4,
                  textAlign: "center",
                  opacity: 0,
                }}
              >
                <span
                  ref={(el) => {
                    if (el) countersRef.current.set(label, el);
                    else countersRef.current.delete(label);
                  }}
                  data-count={count}
                  data-suffix={suffix}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--white-dim)",
                    marginTop: 6,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div data-gsap="slide-right" style={{ opacity: 0 }}>
          <p className="section-eyebrow">About</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Two worlds.
            <br />
            <em>One vision.</em>
          </h2>
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "var(--gold)",
              borderLeft: "3px solid var(--gold)",
              paddingLeft: 20,
              marginBottom: 24,
            }}
          >
            "Every frame is a choice. Every line of code is a decision. I make
            both count."
          </blockquote>
          <p
            style={{
              color: "var(--white-dim)",
              lineHeight: 1.8,
              marginBottom: 16,
            }}
          >
            I'm Soumadeep Dey — a self-taught filmmaker and full-stack engineer
            from Kolkata, India. For 6+ years I've been behind the lens and in
            the edit suite, telling stories that move people. For the past 2+
            years, I've also been engineering the digital world — building
            scalable web applications and platforms that perform.
          </p>
          <p
            style={{
              color: "var(--white-dim)",
              lineHeight: 1.8,
              marginBottom: 28,
            }}
          >
            As{" "}
            <strong style={{ color: "var(--white)" }}>
              Creative Head at Namashkar Kolkata
            </strong>
            , I grew a brand from zero to 70K+ followers with 1M+ monthly reach.
            I don't just make things look beautiful. I make them work.
          </p>

          {/* Roles — animate one by one */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 32,
              minHeight: 72,
            }}
          >
            {visibleRoles.map((role) => (
              <span
                key={role}
                className="about-role-tag"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  padding: "5px 14px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: 2,
                  color: "var(--gold)",
                  background: "rgba(201,168,76,0.05)",
                  animation: "roleTagIn 0.35s ease forwards",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:contactsoumadeepdey@gmail.com"
              className="btn-primary"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FiMail /> Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/soumadeep-dey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <FiLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .about-grid{grid-template-columns:1fr!important;gap:48px!important}
        }
        @keyframes roleTagIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
