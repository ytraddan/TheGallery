"use client";

import Link from "next/link";
import Image from "next/image";
import MasonryGrid from "./masonry-grid";
import AnimatedGridItem from "./animated-grid-item";
import ImageContextMenu from "./image-context-menu";
import { type Image as ImageType } from "~/server/db/schema";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadImages } from "~/lib/images";
import { toast } from "sonner";
import { LoadingSpinnerSvg } from "./simple-upload-button";
import { deleteImagesAction } from "~/lib/actions";
import { useRouter } from "next/navigation";

export default function ImageGrid({ images }: { images: ImageType[] }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);
  const router = useRouter();

  const toggleSelection = (image: ImageType) => {
    if (selectedImages.includes(image)) {
      setSelectedImages((prev) => prev.filter((img) => img.id !== image.id));
    } else {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const handleDownload = async () => {
    toast(
      <div className="flex items-center gap-3">
        <LoadingSpinnerSvg />
        <span>Downloading...</span>
      </div>,
      {
        duration: 50000,
        id: "download-begin",
      },
    );
    setIsSelecting(false);
    setSelectedImages([]);
    void downloadImages(selectedImages);
  };

  const handleDelete = async () => {
    toast(
      <div className="flex items-center gap-3">
        <LoadingSpinnerSvg />
        <span>Deleting...</span>
      </div>,
      {
        duration: 50000,
        id: "delete-begin",
      },
    );
    setIsSelecting(false);
    setSelectedImages([]);
    const result = await deleteImagesAction(
      selectedImages.map((image) => image.id),
      selectedImages.map((image) => image.UTKey),
    );
    router.refresh();
    if (result.status === "success") {
      toast.dismiss("delete-begin");
      toast.success(result.message);
    } else if (result.status === "error") {
      toast.dismiss("delete-begin");
      toast.error(result.message);
    }
  };
  return (
    <div>
      <SelectionBar />

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
                      width={700}
                      height={500}
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

  function SelectionBar() {
    return (
      <AnimatePresence>
        {isSelecting && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card/50 p-3 px-8 backdrop-blur-xl md:px-14">
              <div className="flex items-center justify-between gap-4">
                <span>Selected: {selectedImages.length} image(s)</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsSelecting(false);
                      setSelectedImages([]);
                    }}
                    className="rounded-lg px-4 py-2 text-card-foreground transition-colors hover:bg-card-foreground/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDownload}
                    className="rounded-lg px-4 py-2 text-blue-700 transition-colors hover:bg-blue-500/10 dark:text-blue-500"
                  >
                    Download
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-lg px-4 py-2 text-red-700 transition-colors hover:bg-red-500/10 dark:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>{" "}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

function CheckedSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
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
