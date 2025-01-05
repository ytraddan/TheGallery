import { SignedIn, SignedOut } from "@clerk/nextjs";
import ImageGrid from "./_components/image-grid";
import AnimateText from "./_components/animate-text";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="flex h-1/2 flex-col items-center justify-center gap-4 p-8 selection:bg-primary selection:text-primary-foreground">
          <AnimateText delay={0.8}>
            <h1 className="text-center text-4xl font-bold">
              Welcome to{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Gallery
              </span>
            </h1>
          </AnimateText>
          <AnimateText delay={2}>
            <p className="text-center text-xl text-muted-foreground">
              Please <span className="font-bold">Sign In</span> to view and
              interact with the collection
            </p>
          </AnimateText>
        </div>
      </SignedOut>
      <SignedIn>
        <ImageGrid />
      </SignedIn>
    </>
  );
}
