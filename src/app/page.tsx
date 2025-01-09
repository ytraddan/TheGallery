import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import AnimateText from "./_components/animate-text";
import Gallery from "./_components/gallery";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="flex h-1/2 flex-col items-center justify-center gap-4 p-8 selection:bg-primary selection:text-primary-foreground">
          <AnimateText delay={1}>
            <h1 className="text-center text-5xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Gallery
              </span>
            </h1>
          </AnimateText>
          <AnimateText delay={1.5}>
            <p className="text-center text-xl text-muted-foreground">
              Please <span className="font-bold">Sign In</span> to view and
              interact with the collection
            </p>
          </AnimateText>
          <AnimateText delay={2} y={0}>
            <SignInButton>
              <button className="rounded-3xl bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 px-6 py-2 text-lg text-white transition-opacity hover:opacity-85 dark:from-blue-500/70 dark:via-purple-400/70 dark:to-pink-400/70">
                Sign In
              </button>
            </SignInButton>
          </AnimateText>
        </div>
      </SignedOut>
      <SignedIn>
        <Gallery />
      </SignedIn>
    </>
  );
}
