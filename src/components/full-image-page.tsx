/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import SidePanel from "./side-panel";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);
  const uploader = {
    picture: uploaderInfo.imageUrl,
    fullName: uploaderInfo.fullName,
    username: uploaderInfo.username,
  };

  return (
    <div className="flex flex-col p-8 md:flex-row md:space-x-5 md:px-16">
      <div className="flex flex-1 items-center justify-center overflow-hidden rounded-xl border bg-card/65 backdrop-blur-xl md:aspect-video dark:bg-card/50">
        <Image
          src={image.url}
          alt={image.name}
          className="max-h-full w-auto"
          width={1920}
          height={1080}
        />
      </div>
      <SidePanel image={image} uploader={uploader} />
    </div>
  );
}
