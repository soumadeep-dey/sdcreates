import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Contact from "@/components/sections/Contact";
import {
  MdMovie,
  MdCode,
  MdImage,
  MdAudiotrack,
  MdVideoLibrary,
  MdPhotoCamera,
  MdStorage,
  MdBuild,
  MdTrendingUp,
  MdShare,
  MdWeb,
  MdPhoneAndroid,
  MdCloud,
  MdBugReport,
} from "react-icons/md";
import { SiGithub } from "react-icons/si";
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
        <section style={{ padding: "60px 0 80px", background: "var(--dark)" }}>
          <div className="container">
            <p className="section-eyebrow" style={{ textAlign: "center" }}>
              Skills
            </p>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Creative Toolkit &amp; <em>Engineering Stack</em>
            </h2>

            {[
              {
                title: "🎬 Creative Toolkit",
                groups: skills.creative,
                icons: {
                  "Video Production": MdMovie,
                  "Editing & Post Production": MdVideoLibrary,
                  "Photography & Design": MdPhotoCamera,
                  "Audio Engineering": MdAudiotrack,
                  "Production Equipment": MdBuild,
                },
              },
              {
                title: "💻 Engineering Stack",
                groups: skills.engineering,
                icons: {
                  Languages: MdCode,
                  Frontend: MdWeb,
                  "Mobile Development": MdPhoneAndroid,
                  Backend: MdCloud,
                  Databases: MdStorage,
                  "Testing & Debugging": MdBugReport,
                  "Version Control & Deployment": SiGithub,
                },
              },
              {
                title: "📈 Growth & Marketing",
                groups: skills.marketing,
                icons: {
                  "Content Strategy": MdImage,
                  "Social Media Growth": MdShare,
                  "Brand Development": MdImage,
                  "SEO & Performance Marketing": MdTrendingUp,
                  "Marketing Tools & Analytics": MdBuild,
                  "Digital Marketing": MdShare,
                },
              },
            ].map(({ title, groups, icons }) => (
              <div key={title} style={{ marginBottom: 50 }}>
                <div style={{ marginBottom: 32 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1rem, 4vw, 1.35rem)",
                      fontWeight: 700,
                      color: "var(--white)",
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </h3>
                  <div
                    style={{
                      width: 60,
                      height: 3,
                      background: "var(--gold)",
                      borderRadius: 2,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {groups.map((g, idx) => {
                    const IconComponent =
                      icons[g.category as keyof typeof icons] || MdCode;
                    return (
                      <motion.div
                        key={g.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        viewport={{ once: true, margin: "-50px" }}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(201,168,76,0.04) 0%, rgba(201,168,76,0.02) 100%)",
                          border: "1px solid rgba(201,168,76,0.12)",
                          borderRadius: "var(--radius)",
                          padding: "28px 24px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                          transition: "all 0.3s ease",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <IconComponent
                            style={{
                              fontSize: "1.3rem",
                              color: "var(--gold)",
                              flexShrink: 0,
                            }}
                          />
                          <p
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: "var(--white)",
                              margin: 0,
                              opacity: 0.95,
                            }}
                          >
                            {g.category}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                        >
                          {g.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "6px 14px",
                                border: "1px solid rgba(201,168,76,0.2)",
                                borderRadius: 20,
                                color: "var(--gold-light)",
                                background: "rgba(201,168,76,0.08)",
                                cursor: "default",
                                transition:
                                  "background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(201,168,76,0.18)";
                                el.style.borderColor = "rgba(201,168,76,0.5)";
                                el.style.color = "#f7dd9c";
                                el.style.boxShadow =
                                  "0 0 14px rgba(201,168,76,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(201,168,76,0.08)";
                                el.style.borderColor = "rgba(201,168,76,0.2)";
                                el.style.color = "var(--gold-light)";
                                el.style.boxShadow = "none";
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
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
