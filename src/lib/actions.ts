"use server";
import { deleteImage, deleteImages, updateImageTitle } from "~/server/queries";
import { deleteImagesUT } from "~/server/uploadthing";
import { revalidatePath } from "next/cache";

export async function deleteImageAction(id: number, UTKey: string) {
  try {
    await deleteImage(id);
    await deleteImagesUT(UTKey);
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to delete an image" };
  }
  return { status: "success", message: "Image was successfully deleted" };
}

export async function deleteImagesAction(ids: number[], UTKeys: string[]) {
  try {
    await deleteImages(ids);
    await deleteImagesUT(UTKeys);
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to delete image(s)" };
  }
  return { status: "success", message: "Image(s) were successfully deleted" };
}

export async function updateImageTitleAction(id: number, title: string) {
  try {
    await updateImageTitle(id, title);
    revalidatePath(`/img/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", message: error.message };
    }
    return { status: "error", message: "Failed to update image title" };
  }
  return { status: "success", message: "Image title was successfully updated" };
}
