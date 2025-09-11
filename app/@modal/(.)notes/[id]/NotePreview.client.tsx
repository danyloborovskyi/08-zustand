"use client";

import css from "./NotePreview.module.css";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import ModalPreview from "@/components/ModalPreview/ModalPreview";

import NoteError from "../../../notes/filter/[...slug]/error";
import Loading from "../../../loading";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  function handleClick() {
    router.back();
  }

  if (isLoading) return <Loading />;
  if (error) return <NoteError error={error} />;

  return (
    <ModalPreview onClose={handleClick}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        )}
      </div>
    </ModalPreview>
  );
}
