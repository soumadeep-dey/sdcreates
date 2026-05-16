import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Contact from "@/components/sections/Contact";
import type { Service, SkillsData } from "@/types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<SkillsData | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/services.json").then((r) => r.json()),
      fetch("/data/skills.json").then((r) => r.json()),
    ]).then(([s, sk]) => {
      setServices(s);
      setSkills(sk);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Services — Soumadeep Dey</title>
        <meta
          name="description"
          content="Full range of services: Cinematography, Editing, Photography, Web & App Development, Digital Marketing."
        />
      </Helmet>

      {/* Hero */}
      <section
        style={{
          paddingTop: "calc(var(--nav-h) + 80px)",
          paddingBottom: 80,
          background: "var(--dark)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p className="section-eyebrow">Services</p>
          <h1 className="section-title">
            What I offer.
            <br />
            <em>Without compromise.</em>
          </h1>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "80px 0", background: "var(--black)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "var(--dark-2)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "var(--radius)",
                  padding: "32px 28px",
                }}
              >
                <span
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  {s.icon}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--white)",
                    marginBottom: 12,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--white-dim)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {s.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 500,
                        padding: "3px 10px",
                        border: "1px solid rgba(201,168,76,0.2)",
                        borderRadius: 2,
                        color: "var(--white-dim)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      {skills && (
        <section style={{ padding: "80px 0", background: "var(--dark)" }}>
          <div className="container">
            <p className="section-eyebrow" style={{ textAlign: "center" }}>
              Skills
            </p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Creative Toolkit &amp; <em>Engineering Stack</em>
            </h2>

            {[
              { title: "🎬 Creative Toolkit", groups: skills.creative },
              { title: "💻 Engineering Stack", groups: skills.engineering },
              { title: "📈 Growth & Marketing", groups: skills.marketing },
            ].map(({ title, groups }) => (
              <div key={title} style={{ marginBottom: 60 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--gold)",
                    marginBottom: 28,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(201,168,76,0.12)",
                  }}
                >
                  {title}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 20,
                  }}
                >
                  {groups.map((g) => (
                    <div
                      key={g.category}
                      style={{
                        background: "var(--dark-2)",
                        border: "1px solid rgba(201,168,76,0.08)",
                        borderRadius: "var(--radius)",
                        padding: "20px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          marginBottom: 14,
                        }}
                      >
                        {g.category}
                      </p>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {g.skills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              fontSize: "0.75rem",
                              padding: "4px 10px",
                              background: "rgba(201,168,76,0.06)",
                              border: "1px solid rgba(201,168,76,0.15)",
                              borderRadius: 2,
                              color: "var(--white-dim)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}
