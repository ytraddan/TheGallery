"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
} from "~/components/ui/context-menu";
import { deleteImageAction } from "~/lib/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { LoadingSpinnerSvg } from "./simple-upload-button";
import { useRouter } from "next/navigation";
import { type Image } from "~/server/db/schema";
import { downloadImages } from "~/lib/images";

export default function ImageContextMenu({
  children,
  image,
  onClick,
  isSelected,
}: {
  children: React.ReactNode;
  image: Image;
  onClick: () => void;
  isSelected: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
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
    startTransition(async () => {
      const result = await deleteImageAction(image.id, image.UTKey);
      if (result.status === "success") {
        toast.dismiss("delete-begin");
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.dismiss("delete-begin");
        toast.error(result.message);
      }
      router.refresh();
    });
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
    void downloadImages(image);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onClick}>
          {isSelected ? "Deselect" : "Select"}
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDownload} disabled={isPending}>
          Download
        </ContextMenuItem>
        <ContextMenuItem
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
