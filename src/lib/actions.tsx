/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { deleteImage } from "~/server/queries";
import { deleteImageUT } from "~/server/uploadthing";

export async function deleteImageAction(id: number, UTKey: string) {
  try {
    await deleteImage(id);
    await deleteImageUT(UTKey);
  } catch (error) {
    return { status: "error", message: "Failed to delete an image" };
  }
  return { status: "success", message: "Image was successfully deleted" };
}
