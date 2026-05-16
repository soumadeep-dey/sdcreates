import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    icon: "✉️",
    label: "Email",
    value: "contactsoumadeepdey@gmail.com",
    href: "mailto:contactsoumadeepdey@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 6291528931",
    href: "tel:+916291528931",
  },
  {
    icon: "▶️",
    label: "YouTube",
    value: "SDeyProductions",
    href: "https://www.youtube.com/c/SDeyProductions",
  },
  {
    icon: "📷",
    label: "Instagram",
    value: "@soumadeep_dey",
    href: "https://www.instagram.com/soumadeep_dey",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "soumadeep-dey",
    href: "https://www.linkedin.com/in/soumadeep-dey",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "soumadeep-dey",
    href: "https://github.com/soumadeep-dey",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-gsap="fade-up"]', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
      gsap.to(".contact-bg-text", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: "120px 0",
        background: "var(--black)",
        overflow: "hidden",
      }}
    >
      <div
        className="contact-bg-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 900,
          letterSpacing: "0.05em",
          color: "rgba(201,168,76,0.04)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        HIRE ME
      </div>
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <p className="section-eyebrow" data-gsap="fade-up">
          Contact
        </p>
        <h2 className="section-title" data-gsap="fade-up">
          Let's make
          <br />
          <em>something great.</em>
        </h2>
        <p
          data-gsap="fade-up"
          style={{
            color: "var(--white-dim)",
            maxWidth: 500,
            margin: "0 auto 48px",
            lineHeight: 1.8,
          }}
        >
          Whether you need a film shot, a product built, or a brand brought to
          life — I'm ready.
        </p>
        <div
          data-gsap="fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            maxWidth: 900,
            margin: "0 auto 40px",
          }}
        >
          {CONTACTS.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "var(--dark-2)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "var(--radius)",
                padding: "18px 20px",
                transition: "border-color 0.35s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>{icon}</span>
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--white)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
        <p
          data-gsap="fade-up"
          style={{
            fontSize: "0.78rem",
            color: "var(--white-faint)",
            letterSpacing: "0.12em",
          }}
        >
          📍 Kolkata, India · Available for remote &amp; on-site work worldwide
        </p>
      </div>
    </section>
  );
}
