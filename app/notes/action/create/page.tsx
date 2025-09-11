"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { useState } from "react";
import css from "@/app/Home.module.css";

const CreateNote = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
  }
  return (
    <div className={css.container}>
      <NoteForm onClose={handleClose} />
    </div>
  );
};

export default CreateNote;
