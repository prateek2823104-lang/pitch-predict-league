export function FloodlightBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      <div className="floodlight-blob floodlight-a" />
      <div className="floodlight-blob floodlight-b" />
      <div className="floodlight-blob floodlight-c" />
      {/* subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}
