import Link from "next/link";
import { getImages } from "~/server/queries";
import Image from "next/image";
import MasonryGrid from "./masonry-grid";
import AnimatedGridItem from "./animated-grid-item";

export default async function ImageGrid() {
  const images = await getImages();

  return (
    <div className="p-8 md:px-14">
      <MasonryGrid>
        {images.map((image, index) => (
          <AnimatedGridItem key={image.id} index={index}>
            <Link
              href={`/img/${image.id}`}
              className="mb-6 block overflow-hidden rounded-xl border bg-card/70 shadow-lg transition-all hover:bg-card-foreground/10 hover:shadow-xl"
            >
              <div>
                <Image
                  src={image.url}
                  className="w-full object-cover"
                  width={400}
                  height={300}
                  alt={image.name}
                />
              </div>
              <div className="p-4 backdrop-blur-sm">
                <h2 className="text-center font-medium first-letter:capitalize">
                  {image.name.split(".").slice(0, -1).join(".")}
                </h2>
              </div>
            </Link>
          </AnimatedGridItem>
        ))}
      </MasonryGrid>
    </div>
  );
}
