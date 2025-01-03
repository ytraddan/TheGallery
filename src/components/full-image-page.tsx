/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import DeleteForm from "./ui/deleteForm";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex flex-col p-8 md:flex-row md:space-x-5 md:px-16">
      <div className="flex flex-1 items-center justify-center overflow-hidden rounded-xl border bg-card/65 backdrop-blur-xl dark:bg-card/50 md:aspect-video">
        <Image
          src={image.url}
          alt={image.name}
          className="max-h-full w-auto"
          width={1920}
          height={1080}
        />
      </div>
      <div className="flex w-full flex-shrink-0 flex-col rounded-xl border bg-card/65 backdrop-blur-2xl dark:bg-card/50 md:w-80">
        <div className="border-b p-4">
          <h2 className="text-center text-xl font-semibold first-letter:capitalize">
            {image.name.split(".").slice(0, -1).join(".")}
          </h2>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-3">
            <span className="text-sm text-muted-foreground">Uploaded By</span>
            <div className="flex items-center gap-2">
              <Image
                src={uploaderInfo.imageUrl}
                alt="user picture"
                className="rounded-full"
                width={80}
                height={80}
              />
              <p>
                {uploaderInfo.fullName}
                <span className="block text-sm text-muted-foreground">
                  @{uploaderInfo.username}
                </span>
              </p>
            </div>
            <p className="text-sm">
              {new Date(image.createdAt).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="mt-auto space-y-4">
            {/* <button
              disabled 
              className="w-full rounded-xl bg-zinc-200/40 p-4 text-lg text-blue-500 dark:bg-zinc-800/40"
            >
              Edit
            </button> */}
            <DeleteForm id={image.id} UTKey={image.UTKey}>
              <button
                type="submit"
                className="w-full rounded-xl bg-red-500/5 p-4 text-lg font-medium text-red-500 transition-colors hover:bg-red-500/15 hover:text-red-600"
              >
                Delete
              </button>
            </DeleteForm>
          </div>
        </div>
      </div>
    </div>
  );
}
