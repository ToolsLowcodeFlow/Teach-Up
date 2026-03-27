"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "#EFF5FE", fontFamily: "'Abel', sans-serif" }}
    >
      <h2 className="text-[24px] text-[#0E1117]">Something went wrong</h2>
      <p className="text-[16px] text-[#647787]">{error.message}</p>
      <button
        onClick={reset}
        className="h-[40px] px-6 rounded-[10px] cursor-pointer"
        style={{
          backgroundImage: "linear-gradient(175.27deg, rgb(76, 150, 255) 12.19%, rgb(22, 103, 219) 93.76%)",
          border: "none", color: "#FFFFFF", fontSize: 16,
        }}
      >
        Try again
      </button>
    </div>
  );
}
