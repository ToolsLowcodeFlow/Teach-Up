import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "#EFF5FE", fontFamily: "'Abel', sans-serif" }}
    >
      <h2 className="text-[32px] text-[#0E1117]">Page not found</h2>
      <p className="text-[18px] text-[#647787]">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="h-[40px] px-6 rounded-[10px] flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
          color: "#FFFFFF", fontSize: 16, textDecoration: "none",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
