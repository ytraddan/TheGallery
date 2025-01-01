import FullPageImageView from "~/components/full-image-page";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: imageId } = await params;
  const idAsNumber = parseInt(imageId);

  if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

  return <FullPageImageView id={idAsNumber} />;
}
