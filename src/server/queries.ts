import "server-only";
import { db } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function getMyImages() {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.id),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.id) throw new Error("Unauthorized");

  return image;
}
