import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b p-8 text-2xl font-semibold md:px-16">
      <div className="flex items-center gap-4">
        <Link href="/">
          <div>The Gallery</div>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex flex-row items-center gap-6">
        <SignedOut>
          <SignInButton>Sign In</SignInButton>
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
