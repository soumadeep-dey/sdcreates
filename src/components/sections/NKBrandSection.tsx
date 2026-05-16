import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NKBrandSection() {
  return (
    <section
      id="brand-preview"
      style={{ padding: "100px 0", background: "var(--dark-3)" }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left: Story */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <img
              src="/assets/namashkar-kolkata/logo_symbol.jpg"
              alt="Namashkar Kolkata"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--gold)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 4,
                }}
              >
                Brand & Digital Media
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--white)",
                }}
              >
                Namashkar Kolkata
              </h3>
            </div>
          </div>

          <h2 className="section-title" style={{ marginBottom: 20 }}>
            Building Kolkata's
            <br />
            <em>creative voice.</em>
          </h2>

          <p
            style={{
              color: "var(--white-dim)",
              lineHeight: 1.8,
              marginBottom: 16,
            }}
          >
            Namashkar Kolkata is a creative media brand that showcases the
            finest photographic, cinematic, and visual storytelling content from
            Bengal.
          </p>
          <p
            style={{
              color: "var(--white-dim)",
              lineHeight: 1.8,
              marginBottom: 28,
            }}
          >
            Built as a creative movement, the platform celebrates Kolkata's
            photographers, filmmakers, artists, and storytellers through digital
            culture, community-driven initiatives, cinematic productions, and
            large-scale creative events.
          </p>

          <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
            {[
              ["70K+", "Followers"],
              ["1M+", "Monthly Reach"],
              ["Millions", "Video Views"],
            ].map(([num, label]) => (
              <div key={label}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
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
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            {[
              {
                href: "http://facebook.com/namashkar_kolkata",
                label: "Facebook",
              },
              {
                href: "https://instagram.com/namashkar_kolkata",
                label: "Instagram",
              },
              {
                href: "https://www.youtube.com/@namashkarkolkata2019",
                label: "YouTube",
              },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ padding: "8px 16px", fontSize: "0.72rem" }}
              >
                {label}
              </a>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/brand"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Explore The Brand
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Right: Instagram embed */}
        <div>
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-6055f7e7-0f56-455f-8f12-fe9ec33c2590"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #brand-preview .container{grid-template-columns:1fr!important;gap:48px!important}
        }
      `}</style>
    </section>
  );
}
