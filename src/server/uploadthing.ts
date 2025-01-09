/* eslint-disable @typescript-eslint/no-unused-vars */
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteImagesUT(keys: string | string[]) {
  try {
    await utapi.deleteFiles(keys);
  } catch (_error) {
    throw new Error(`Failed to delete file from uploadthing`);
  }
}
