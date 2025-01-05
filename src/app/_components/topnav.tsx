import { SignedIn, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between border-b bg-card/55 p-8 text-2xl font-semibold md:px-16">
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="/">
            <div className="bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Gallery
            </div>
          </Link>
        </SignedIn>
        <ThemeToggle />
      </div>
      <div className="flex flex-row items-center gap-6">
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
