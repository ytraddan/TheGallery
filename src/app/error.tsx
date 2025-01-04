"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {error.message || "An error occurred while processing your request."}
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          href="/"
          className="rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Go home
        </Link>
        <button
          onClick={() => reset()}
          className="rounded-md border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
