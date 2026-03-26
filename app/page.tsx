import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        TEACH <span className="text-primary">UP</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Education Job Platform for Israel
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
