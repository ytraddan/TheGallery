import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: imageId } = await params;
  const idAsNumber = parseInt(imageId);

  if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

  const image = await getImage(idAsNumber);
  return (
    <Image
      src={image.url}
      style={{ objectFit: "contain" }}
      width={800}
      height={240}
      alt={image.name}
    />
  );
}
