/* eslint-disable @typescript-eslint/no-unused-vars */
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteImageUT(key: string) {
  try {
    await utapi.deleteFiles(key);
  } catch (_error) {
    throw new Error(`Failed to delete file from uploadthing`);
  }
}
