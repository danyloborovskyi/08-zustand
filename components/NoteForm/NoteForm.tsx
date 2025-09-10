import css from "./NoteForm.module.css";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import type { Tag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { createNote, NewNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/noteStore";

export interface NoteValues {
  title: string;
  content: string;
  tag: Tag;
}

interface NoteFormProps {
  onClose: () => void;
}

const tags: Tag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function NoteForm({ onClose }: NoteFormProps) {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const initialValues: NoteValues = {
    title: draft?.title || "",
    content: draft?.content || "",
    tag: (draft?.tag as Tag) || "Todo",
  };

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string().min(3).max(50).required("Title is required"),

    content: Yup.string().max(500),

    tag: Yup.string().oneOf([...tags]),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      console.log("Todo added successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      clearDraft();
    },
  });

  function handleSubmit(values: NoteValues) {
    mutation.mutate(values);
    console.log(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => {
        useEffect(() => {
          setDraft(values);
        }, [values, setDraft]);

        return (
          <Form className={css.form}>
            <fieldset className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field
                id="title"
                type="text"
                name="title"
                className={css.input}
              />
              <ErrorMessage
                component="span"
                name="title"
                className={css.error}
              />
            </fieldset>

            <fieldset className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
                as="textarea"
              />
              <ErrorMessage
                component="span"
                name="content"
                className={css.error}
              />
            </fieldset>

            <fieldset className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage component="span" name="tag" className={css.error} />
            </fieldset>

            <fieldset className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            </fieldset>
          </Form>
        );
      }}
    </Formik>
  );
}
