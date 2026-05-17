import { useEffect } from "react";
import Contact from "@/components/sections/Contact";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Page hero */}
      <section
        style={{
          paddingTop: "calc(var(--nav-h) + 80px)",
          paddingBottom: 60,
          textAlign: "center",
          background: "var(--dark)",
        }}
      >
        <div className="container">
          <p className="section-eyebrow">Let's Connect</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--white)",
              letterSpacing: "0.02em",
            }}
          >
            Get in <em style={{ color: "var(--gold)" }}>touch</em>
          </h1>
          <p
            style={{
              color: "var(--white-dim)",
              fontSize: "1rem",
              marginTop: 20,
              maxWidth: 520,
              margin: "20px auto 0",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? Want to collaborate or just say hello? I'd
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact section (reused from home) */}
      <Contact />
    </>
  );
}
