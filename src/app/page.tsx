import { SignedIn, SignedOut } from "@clerk/nextjs";
import ImageGrid from "./_components/image-grid";
import AnimateText from "./_components/animate-text";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="flex h-1/2 flex-col items-center justify-center gap-4">
          <AnimateText>
            <h1 className="text-4xl font-bold">Welcome to The Gallery</h1>
          </AnimateText>
          <AnimateText delay={0.8}>
            <p className="text-xl text-muted-foreground">
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
