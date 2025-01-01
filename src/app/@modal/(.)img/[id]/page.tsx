import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default async function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: imageId } = await params;
  const idAsNumber = parseInt(imageId);

  if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
