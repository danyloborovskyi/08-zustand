import { useFormikContext } from "formik";
import { useEffect } from "react";

import { NoteValues } from "../NoteForm/NoteForm";

type DraftSaverProps = {
  setDraft: (values: NoteValues) => void;
};

export default function DraftSaver({ setDraft }: DraftSaverProps) {
  const { values } = useFormikContext<NoteValues>();

  useEffect(() => {
    setDraft(values);
  }, [values, setDraft]);

  return null;
}
