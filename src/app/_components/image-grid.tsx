"use client";

import Link from "next/link";
import Image from "next/image";
import MasonryGrid from "./masonry-grid";
import AnimatedGridItem from "./animated-grid-item";
import ImageContextMenu from "./image-context-menu";
import { type Image as ImageType } from "~/server/db/schema";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="border-b border-border bg-card/70 p-4">
        <div className="flex items-center justify-between">
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
      </div>
    );
  };

  return (
    <div>
      <AnimatePresence>
        {isSelecting && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <SelectionBar />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-8 md:px-14">
        <MasonryGrid>
          {images.map((image, index) => (
            <AnimatedGridItem key={image.id} index={index}>
              <ImageContextMenu
                image={image}
                isSelected={selectedImages.includes(image)}
                onClick={() => {
                  setIsSelecting(true);
                  toggleSelection(image);
                }}
              >
                <Link
                  href={`/img/${image.id}`}
                  className="mb-6 block overflow-hidden rounded-xl border bg-card/70 shadow-lg transition-[background-color,box-shadow] hover:bg-card-foreground/10 hover:shadow-xl"
                  onClick={(e) => {
                    if (isSelecting) {
                      e.preventDefault();
                      toggleSelection(image);
                    }
                  }}
                >
                  <div className="relative">
                    {isSelecting && (
                      <div
                        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-black/50 transition-colors duration-100 ${selectedImages.includes(image) ? "bg-blue-500" : ""}`}
                      >
                        {selectedImages.includes(image) && <CheckedSVG />}
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

function CheckedSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
