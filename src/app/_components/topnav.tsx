import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b p-8 px-12 text-2xl font-semibold">
      <Link href="/">
        <div>Gallery</div>
      </Link>
      <div className="flex flex-row items-center gap-6">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
