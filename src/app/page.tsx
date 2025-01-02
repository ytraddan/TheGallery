import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 md:px-14 lg:grid-cols-4">
      {images.map((image) => (
        <Link
          href={`/img/${image.id}`}
          key={image.id}
          className="overflow-hidden rounded-lg border transition-colors hover:bg-accent"
        >
          <div>
            <Image
              src={image.url}
              className="aspect-video h-full w-full object-cover"
              width={400}
              height={300}
              alt={image.name}
            />
          </div>
          <div className="p-4">
            <h2 className="text-center font-medium first-letter:capitalize">
              {image.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign In first
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </>
  );
}
