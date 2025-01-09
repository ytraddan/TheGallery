import "server-only";
import { db } from "./db";
import { eq, inArray } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";

export async function getMyImages() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImages() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  return image;
}

export async function deleteImage(id: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
  // if (image.userId !== userId) throw new Error("Unauthorized");

  await db.delete(images).where(eq(images.id, id));
}

export async function deleteImages(ids: number[]) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const imageArr = await db.query.images.findMany({
    where: (model, { inArray }) => inArray(model.id, ids),
  });

  if (!imageArr) throw new Error("Images not found");
  // if (images.some((image) => image.userId !== userId))
  //   throw new Error("Unauthorized");

  await db.delete(images).where(inArray(images.id, ids));
}

export async function updateImageTitle(id: number, title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");
  // if (image.userId !== userId) throw new Error("Unauthorized");

  await db.update(images).set({ name: title }).where(eq(images.id, id));
}
