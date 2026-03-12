export function TasbihPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] rounded-2xl p-8"
      style={{
        background:
          "linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.02))",
        border: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      <span style={{ fontSize: "48px", marginBottom: "16px" }}>📿</span>
      <h2
        className="text-lg font-bold mb-2"
        style={{ color: "#1a2035", fontFamily: "'Amiri', serif" }}
      >
        Tasbih Mode
      </h2>
      <p
        className="text-sm text-center"
        style={{ color: "#6b7280", fontFamily: "'Poppins', sans-serif" }}
      >
        Premium Tasbih counter + 100+ Wazaif aane wale hain — Part 3 mein!
      </p>
      <div
        className="mt-4 px-4 py-2 rounded-full"
        style={{ background: "rgba(124,58,237,0.1)", color: "#7c3aed" }}
      >
        <span
          className="text-xs font-semibold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          🚧 Part 3 mein add hoga
        </span>
      </div>
    </div>
  );
}
export default TasbihPage;
