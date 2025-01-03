import { SignedIn, SignedOut } from "@clerk/nextjs";
import ImageGrid from "./_components/image-grid";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="mt-16 text-center text-2xl">
          You must be Signed In to view The Gallery
        </div>
      </SignedOut>
      <SignedIn>
        <ImageGrid />
      </SignedIn>
    </>
  );
}
