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

export default function ImageContextMenu({
  children,
  imageId,
  imageUrl,
  imageName,
  UTKey,
}: {
  children: React.ReactNode;
  imageId: number;
  imageUrl: string;
  imageName: string;
  UTKey: string;
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
      try {
        await deleteImageAction(imageId, UTKey);
        router.refresh();
        toast.dismiss("delete-begin");
        toast.success("Image deleted successfully!");
      } catch (error) {
        toast.dismiss("delete-begin");
        toast.error("Failed to delete image");
        console.error("Error deleting image:", error);
      }
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
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = imageName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.dismiss("download-begin");
      toast.success("Finished!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.dismiss("download-begin");
      toast.error("Error downloading image");
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
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
