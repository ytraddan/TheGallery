"use client";

import Link from "next/link";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <div className="grid h-screen grid-rows-[auto,1fr]">
          <main>
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Something went wrong!</h2>
                <p className="text-lg text-muted-foreground">
                  Global Error:{" "}
                  {error.message ||
                    "An error occurred while processing your request."}
                </p>
              </div>
              <Link
                href="/"
                className="rounded-md border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Go home
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
