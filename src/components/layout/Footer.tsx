import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        padding: "48px 24px 32px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.4rem",
            color: "var(--gold)",
            letterSpacing: "0.05em",
          }}
        >
          SD
        </Link>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "var(--white-dim)",
          }}
        >
          Crafted with storytelling, motion &amp; code.
        </p>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            {
              href: "https://www.youtube.com/c/SDeyProductions",
              label: "YouTube",
            },
            {
              href: "https://www.instagram.com/soumadeep_dey",
              label: "Instagram",
            },
            {
              href: "https://www.linkedin.com/in/soumadeep-dey",
              label: "LinkedIn",
            },
            { href: "https://github.com/soumadeep-dey", label: "GitHub" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--white-dim)",
                transition: "color 0.35s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--white-dim)")
              }
            >
              {label}
            </a>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--white-faint)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Soumadeep Dey
        </p>
      </div>
    </footer>
  );
}
