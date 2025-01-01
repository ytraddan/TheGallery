import { getImage } from "~/server/queries";

export default async function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: imageId } = await params;
  return <div>{imageId}</div>;
}
