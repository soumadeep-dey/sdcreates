const ROLES = [
  "Filmmaker",
  "·",
  "Cinematographer",
  "·",
  "Film Editor",
  "·",
  "Colorist",
  "·",
  "Sound Designer",
  "·",
  "Full Stack Engineer",
  "·",
  "Director",
  "·",
  "DOP",
  "·",
];
const DOUBLED = [...ROLES, ...ROLES];

export default function MarqueeStrip() {
  return (
    <div
      style={{
        background: "var(--gold)",
        overflow: "hidden",
        padding: "14px 0",
        whiteSpace: "nowrap",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "inline-block",
          animation: "marquee 28s linear infinite",
        }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              letterSpacing: "0.15em",
              color: "var(--black)",
              margin: "0 18px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
