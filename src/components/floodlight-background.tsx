// Noir & Gold ambient backdrop. Kept exported as FloodlightBackground
// so existing shells don't need to change.
export function FloodlightBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      <div className="noir-spotlight" />
      <div className="noir-vignette" />
      {/* fine grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}
