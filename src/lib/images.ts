import { toast } from "sonner";
import { type Image } from "~/server/db/schema";

export async function downloadImages(images: Image | Image[]) {
  const imagesToDownload = Array.isArray(images) ? images : [images];

  try {
    for (const image of imagesToDownload) {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
    toast.dismiss("download-begin");
    toast.success(
      imagesToDownload.length > 1
        ? "Images downloaded successfully!"
        : "Image downloaded successfully!",
    );
  } catch (error) {
    console.error("Download error:", error);
    toast.dismiss("download-begin");
    toast.error("Failed to download image(s)");
  }
}
