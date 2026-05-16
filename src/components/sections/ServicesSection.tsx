import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: "🎬",
    title: "Cinematography & Direction",
    desc: "Short films, music videos, brand films — scripted, shot, and edited with cinematic intent.",
  },
  {
    icon: "📷",
    title: "Photography & Graphic Design",
    desc: "Posters, banners, photo editing, thumbnails, photo manipulation and retouching.",
  },
  {
    icon: "🎞️",
    title: "Editing & Post Production",
    desc: "Premiere Pro & DaVinci Resolve. Cuts that breathe, color that tells the story.",
  },
  {
    icon: "🎨",
    title: "Color Grading & Motion Graphics",
    desc: "Cinematic LUTs, brand palettes, motion graphics that elevate the final cut.",
  },
  {
    icon: "🔊",
    title: "Sound Design & Audio Production",
    desc: "Foley, scoring, mixing — sound is 50% of the film. I don't leave it to chance.",
  },
  {
    icon: "💒",
    title: "Cinematic Weddings & Event Films",
    desc: "Weddings, corporate events, live concerts — captured beautifully, told honestly.",
  },
  {
    icon: "💻",
    title: "Web Development",
    desc: "Full-stack MERN engineer. React, Node, PostgreSQL, TypeScript — production-grade.",
  },
  {
    icon: "📱",
    title: "App Development",
    desc: "Cross-platform mobile apps with React Native, polished UX and API integration.",
  },
  {
    icon: "📢",
    title: "Digital & Social Media Marketing",
    desc: "End-to-end brand promotion, content creation, community growth and digital campaigns.",
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card-item", {
        opacity: 0,
        y: 36,
        scale: 0.97,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".services-grid-home",
          start: "top 88%",
          once: true,
        },
      });
      gsap.to('[data-gsap="fade-up"]', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      style={{ padding: "100px 0", background: "var(--black)" }}
    >
      <div className="container">
        <p
          className="section-eyebrow"
          data-gsap="fade-up"
          style={{ textAlign: "center" }}
        >
          What I Do
        </p>
        <h2
          className="section-title"
          data-gsap="fade-up"
          style={{ textAlign: "center" }}
        >
          Every frame.
          <br />
          <em>Every line of code.</em>
        </h2>
        <div
          className="services-grid-home"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className="service-card-item"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              style={{
                background: "var(--dark-2)",
                border: "1px solid rgba(201,168,76,0.08)",
                borderRadius: "var(--radius)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: "2rem" }}>{icon}</span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--white)",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link to="/services" className="btn-ghost">
            Explore Full Skills →
          </Link>
        </div>
      </div>
    </section>
  );
}
