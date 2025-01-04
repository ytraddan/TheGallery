"use server";
import { deleteImage, updateImageTitle } from "~/server/queries";
import { deleteImageUT } from "~/server/uploadthing";
import { revalidatePath } from "next/cache";

export async function deleteImageAction(id: number, UTKey: string) {
  try {
    await deleteImage(id);
    await deleteImageUT(UTKey);
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to delete an image" };
  }
  return { status: "success", message: "Image was successfully deleted" };
}

export async function updateImageTitleAction(id: number, title: string) {
  await updateImageTitle(id, title);
  revalidatePath(`/img/${id}`);
}
