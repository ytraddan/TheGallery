"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 p-12 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you&apos;re looking for{" "}
        <span className="whitespace-nowrap font-bold">doesn&apos;t exist</span>.
      </p>
      <button
        onClick={() => router.back()}
        className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/20"
      >
        Go back
      </button>
    </div>
  );
}
