import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "6+", label: "Years Filming" },
  { num: "2+", label: "Years Engineering" },
  { num: "1K+", label: "IG Features" },
];

const TAGS = [
  "Director",
  "DOP",
  "Colorist",
  "Sound Designer",
  "Foley Artist",
  "Photo Editor",
  "Full Stack Dev",
  "Digital Marketing",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-gsap="slide-left"]', {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: '[data-gsap="slide-left"]',
          start: "top 87%",
          once: true,
        },
      });
      gsap.to('[data-gsap="slide-right"]', {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: '[data-gsap="slide-right"]',
          start: "top 87%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--dark)" }}
    >
      <div
        className="container"
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
          style={{ display: "flex", flexDirection: "column", gap: 28 }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                aspectRatio: "4/5",
                maxWidth: 380,
                background: "var(--dark-3)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.1)",
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
            </div>
            <div
              style={{
                position: "absolute",
                bottom: -12,
                right: -12,
                width: "100%",
                maxWidth: 380,
                height: "100%",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 2,
                pointerEvents: "none",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {STATS.map(({ num, label }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  background: "var(--dark-2)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "16px 12px",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    color: "var(--gold)",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--white-dim)",
                    marginTop: 4,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div data-gsap="slide-right">
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
              fontSize: "1.1rem",
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  padding: "5px 12px",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: 2,
                  color: "var(--white-dim)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:contactsoumadeepdey@gmail.com"
              className="btn-primary"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/soumadeep-dey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media(max-width:768px){
          #about .container{grid-template-columns:1fr!important;gap:48px!important}
        }
      `}</style>
    </section>
  );
}
