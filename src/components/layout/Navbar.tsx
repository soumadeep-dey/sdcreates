import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/#about", label: "About", hash: true },
  { to: "/services", label: "Services" },
  { to: "/#work", label: "Work", hash: true },
  { to: "/brand", label: "Brand" },
  { to: "/#promotions", label: "Promotions", hash: true },
  { to: "/#awards", label: "Awards", hash: true },
  { to: "/#contact", label: "Contact", hash: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "var(--nav-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        transition: "background 0.35s, backdrop-filter 0.35s",
        ...(scrolled
          ? {
              background: "rgba(8,8,8,0.92)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(201,168,76,0.12)",
            }
          : {}),
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          color: "var(--gold)",
          letterSpacing: "0.05em",
        }}
      >
        SD
      </Link>

      {/* Desktop */}
      <ul
        style={{ display: "flex", alignItems: "center", gap: 8 }}
        className="hidden md:flex"
      >
        {LINKS.map(({ to, label, hash }) => (
          <li key={label}>
            {hash ? (
              <a
                href={to}
                onClick={(e) => handleHashLink(e, to.substring(1))}
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--white-dim)",
                  padding: "8px 12px",
                  display: "inline-block",
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
            ) : label === "Contact" ? (
              <a
                href="#contact"
                onClick={(e) => handleHashLink(e, "#contact")}
                className="btn-primary"
                style={{ padding: "8px 20px", marginLeft: 8 }}
              >
                Hire Me
              </a>
            ) : (
              <NavLink
                to={to}
                end
                style={({ isActive }) => ({
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--gold)" : "var(--white-dim)",
                  padding: "8px 12px",
                  display: "inline-block",
                  transition: "color 0.35s",
                })}
              >
                {label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden"
        aria-label="Menu"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--white)",
              borderRadius: 2,
              transition: "0.35s",
              transform: open
                ? i === 0
                  ? "translateY(7px) rotate(45deg)"
                  : i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none"
                : "none",
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "var(--nav-h)",
              left: 0,
              right: 0,
              background: "rgba(8,8,8,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
              padding: "20px 24px 28px",
            }}
          >
            <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {LINKS.map(({ to, label, hash }) => (
                <li key={label}>
                  {hash ? (
                    <a
                      href={to}
                      onClick={(e) => handleHashLink(e, to.substring(1))}
                      style={{
                        display: "block",
                        padding: "10px 0",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--white-dim)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {label}
                    </a>
                  ) : (
                    <NavLink
                      to={to}
                      end
                      onClick={() => setOpen(false)}
                      style={({ isActive }) => ({
                        display: "block",
                        padding: "10px 0",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "var(--gold)" : "var(--white-dim)",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      })}
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
