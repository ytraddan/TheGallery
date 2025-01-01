import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
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
