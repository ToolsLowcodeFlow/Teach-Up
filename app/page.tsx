import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#EFF5FE", fontFamily: "'Abel', sans-serif" }}
    >
      <div className="flex gap-[8.5px] items-center mb-4" style={{ fontSize: 48, lineHeight: 1.2 }}>
        <span style={{ color: "#0E1117" }}>TEACH</span>
        <span style={{ color: "#2C7AEA" }}>UP</span>
      </div>
      <p style={{ fontSize: 18, color: "#647787", marginBottom: 40 }}>
        Education Job Platform for Israel
      </p>
      <div className="flex gap-[16px]">
        <Link
          href="/login"
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: 180,
            height: 50,
            backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
            borderRadius: 10,
            color: "#FFFFFF",
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          Login
        </Link>
        <Link
          href="/register"
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: 180,
            height: 50,
            background: "#FFFFFF",
            border: "1px solid #EAEBEB",
            borderRadius: 10,
            color: "#0E1117",
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
