import type { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm";

import css from "@/app/Home.module.css";

const CreateNote = () => {
  return (
    <div className={css.container}>
      <NoteForm />
    </div>
  );
};

export default CreateNote;

export const metadata: Metadata = {
  title: `Notehub: create new note`,
  description: `Page for creating new notes`,
  openGraph: {
    title: `NNotehub: create new note`,
    description: `Page for creating new notes`,
    url: `https://notehub.com/notes/action/create`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `Notehub`,
      },
    ],
    type: "website",
  },
};
