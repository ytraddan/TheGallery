"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { Image as ImageType } from "~/server/db/schema";
import DeleteForm from "./ui/deleteForm";
import { updateImageTitleAction } from "~/lib/actions";
import { LoadingSpinnerSvg } from "~/app/_components/simple-upload-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SidePanelProps = {
  image: ImageType;
  uploader: {
    picture: string;
    fullName: string | null;
    username: string | null;
  };
};

export default function SidePanel({ image, uploader }: SidePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(image.name);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setIsLoading(true);
    const formData = new FormData(formRef.current!);
    const title = formData.get("title");
    const result = await updateImageTitleAction(image.id, title as string);
    if (result.status === "error") {
      router.push("/");
      toast.error(result.message);
      return;
    }
    setIsLoading(false);
  };

  return (
    <div className="flex w-full flex-shrink-0 flex-col rounded-xl border bg-card/75 backdrop-blur-2xl md:w-80 dark:bg-card/50">
      <div className="border-b p-4">
        {isEditing ? (
          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-background/50 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </form>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-1">
            <LoadingSpinnerSvg />
          </div>
        ) : (
          <h2 className="text-center text-xl font-semibold">{title}</h2>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground">Uploaded By</span>
          <div className="flex items-center gap-2">
            <Image
              src={uploader.picture}
              alt="user picture"
              className="rounded-full"
              width={80}
              height={80}
            />
            <p>
              {uploader.fullName ? uploader.fullName : "Unknown User"}
              <span className="block text-sm text-muted-foreground">
                {uploader.username && `@${uploader.username}`}
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
          {isEditing ? (
            <>
              <CancelButton />
              <SubmitButton />
            </>
          ) : (
            <>
              <EditButton />
              <DeleteButton />
            </>
          )}
        </div>
      </div>
    </div>
  );

  function CancelButton() {
    return (
      <button
        onClick={() => setIsEditing(false)}
        className="w-full rounded-xl bg-blue-500/20 p-4 text-lg font-medium text-blue-700 transition-colors hover:bg-blue-500/35 dark:bg-blue-500/10 dark:text-blue-500 dark:hover:bg-blue-500/20"
      >
        Cancel
      </button>
    );
  }

  function SubmitButton() {
    return (
      <button
        onClick={handleSubmit}
        className="w-full rounded-xl bg-green-500/20 p-4 text-lg font-medium text-green-700 transition-colors hover:bg-green-500/35 dark:bg-green-500/10 dark:text-green-500 dark:hover:bg-green-500/20"
      >
        Submit
      </button>
    );
  }

  function EditButton() {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="w-full rounded-xl bg-blue-500/20 p-4 text-lg font-medium text-blue-700 transition-colors hover:bg-blue-500/35 dark:bg-blue-500/10 dark:text-blue-500 dark:hover:bg-blue-500/20"
      >
        Edit
      </button>
    );
  }

  function DeleteButton() {
    return (
      <DeleteForm id={image.id} UTKey={image.UTKey}>
        <button
          type="submit"
          className="w-full rounded-xl bg-red-500/20 p-4 text-lg font-medium text-red-700 transition-colors hover:bg-red-500/35 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20"
        >
          Delete
        </button>
      </DeleteForm>
    );
  }
}
