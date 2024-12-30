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
