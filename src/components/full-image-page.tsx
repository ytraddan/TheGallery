/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex space-x-5 p-8 px-16">
      <div className="flex aspect-video flex-1 items-center justify-center rounded-lg border bg-card/30 backdrop-blur-xl">
        <img
          src={image.url}
          className="max-h-full rounded-lg"
          alt={image.name}
        />
      </div>
      <div className="flex w-80 flex-shrink-0 flex-col rounded-lg border bg-card/50 backdrop-blur-2xl">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold first-letter:capitalize">
            {image.name}
          </h2>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Uploaded By</span>
            <p className="font-medium">
              {uploaderInfo.fullName}{" "}
              <span className="text-sm text-muted-foreground">
                @{uploaderInfo.username}
              </span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Created On</span>
            <p className="font-medium">
              {new Date(image.createdAt).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
