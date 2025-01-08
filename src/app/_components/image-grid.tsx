"use client";

import Link from "next/link";
import Image from "next/image";
import MasonryGrid from "./masonry-grid";
import AnimatedGridItem from "./animated-grid-item";
import ImageContextMenu from "./image-context-menu";
import { type Image as ImageType } from "~/server/db/schema";
import { useState } from "react";

export default function ImageGrid({ images }: { images: ImageType[] }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);

  const toggleSelection = (image: ImageType) => {
    if (selectedImages.includes(image)) {
      setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    } else {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const SelectionBar = () => {
    return (
      <div className="flex items-center justify-between border-b border-border bg-card/70 p-4">
        <div>Selected: {selectedImages.length}</div>
        <button
          onClick={() => {
            setIsSelecting(false);
            setSelectedImages([]);
          }}
        >
          Cancel
        </button>
        <button>Delete</button>
      </div>
    );
  };

  return (
    <div>
      {isSelecting && <SelectionBar />}
      <div className="p-8 md:px-14">
        <MasonryGrid>
          {images.map((image, index) => (
            <AnimatedGridItem key={image.id} index={index}>
              <ImageContextMenu
                image={image}
                onClick={() => {
                  setIsSelecting(true);
                  toggleSelection(image);
                }}
              >
                <Link
                  href={`/img/${image.id}`}
                  className="mb-6 block overflow-hidden rounded-xl border bg-card/70 shadow-lg transition-all hover:bg-card-foreground/10 hover:shadow-xl"
                  onClick={(e) => {
                    if (isSelecting) {
                      e.preventDefault();
                      toggleSelection(image);
                    }
                  }}
                >
                  <div className="relative">
                    {isSelecting && (
                      <div className="rounded-ful absolute right-2 top-2">
                        {selectedImages.includes(image) ? (
                          <CheckedSVG />
                        ) : (
                          <UncheckedSVG />
                        )}
                      </div>
                    )}
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
                      {image.name}
                    </h2>
                  </div>
                </Link>
              </ImageContextMenu>
            </AnimatedGridItem>
          ))}
        </MasonryGrid>
      </div>
    </div>
  );
}

function UncheckedSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9  9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function CheckedSVG() {
  return (
    <div className="text-blue-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
