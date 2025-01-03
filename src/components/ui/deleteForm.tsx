"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { deleteImageAction } from "~/lib/actions";

type DeleteFormProps = {
  id: number;
  UTKey: string;
  children: React.ReactNode;
};

type State = {
  status: string | null;
  message: string | null;
};

export default function DeleteForm({ id, UTKey, children }: DeleteFormProps) {
  const deleteImage = deleteImageAction.bind(null, id, UTKey);
  const initialState: State = { status: null, message: null };
  const router = useRouter();

  const [state, action] = useActionState(deleteImage, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      router.push("/");
    }
    if (state.status === "error") {
      toast.error(state.message);
      router.push("/");
    }
  }, [state, router]);

  return <form action={action}>{children}</form>;
}
