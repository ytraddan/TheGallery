import Link from "next/link";
import { getImages } from "~/server/queries";
import Image from "next/image";

export default async function ImageGrid() {
  const images = await getImages();

  return (
    <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 md:px-14 lg:grid-cols-4">
      {images.map((image) => (
        <Link
          href={`/img/${image.id}`}
          key={image.id}
          className="overflow-hidden rounded-xl border transition-colors hover:bg-accent"
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
              {image.name.split(".").slice(0, -1).join(".")}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
