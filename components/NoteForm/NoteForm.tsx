// import css from "./NoteForm.module.css";
// import { ErrorMessage, Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import type { Tag } from "@/types/note";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

// import { createNote } from "@/lib/api";
// import { useNoteDraftStore } from "@/lib/store/noteStore";
// import DraftSaver from "../DraftSaver/DraftSaver";

// export interface NoteValues {
//   title: string;
//   content: string;
//   tag: Tag;
// }

// interface NoteFormProps {
//   onClose: () => void;
// }

// const tags: Tag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

// export default function NoteForm({ onClose }: NoteFormProps) {
//   const { draft, setDraft, clearDraft } = useNoteDraftStore();
//   const router = useRouter();

//   const initialValues: NoteValues = {
//     title: draft?.title || "",
//     content: draft?.content || "",
//     tag: (draft?.tag as Tag) || "Todo",
//   };

//   const NoteFormSchema = Yup.object().shape({
//     title: Yup.string().min(3).max(50).required("Title is required"),

//     content: Yup.string().max(500),

//     tag: Yup.string().oneOf([...tags]),
//   });

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       console.log("Todo added successfully");
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onClose();
//       clearDraft();
//     },
//   });

//   function handleSubmit(values: NoteValues) {
//     mutation.mutate(values);
//     console.log(values);
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={NoteFormSchema}
//       onSubmit={handleSubmit}
//       enableReinitialize
//     >
//       <Form className={css.form}>
//         <DraftSaver setDraft={setDraft} />
//         <fieldset className={css.formGroup}>
//           <label htmlFor="title">Title</label>
//           <Field id="title" type="text" name="title" className={css.input} />
//           <ErrorMessage component="span" name="title" className={css.error} />
//         </fieldset>

//         <fieldset className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <Field
//             id="content"
//             name="content"
//             rows={8}
//             className={css.textarea}
//             as="textarea"
//           />
//           <ErrorMessage component="span" name="content" className={css.error} />
//         </fieldset>

//         <fieldset className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <Field as="select" id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage component="span" name="tag" className={css.error} />
//         </fieldset>

//         <fieldset className={css.actions}>
//           <button type="button" className={css.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button type="submit" className={css.submitButton} disabled={false}>
//             Create note
//           </button>
//         </fieldset>
//       </Form>
//     </Formik>
//   );
// }

import css from "./NoteForm.module.css";
// import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import type { Tag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createNote, NewNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
// import DraftSaver from "../DraftSaver/DraftSaver";

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
  const router = useRouter();

  const initialValues: NoteValues = {
    title: draft?.title || "",
    content: draft?.content || "",
    tag: (draft?.tag as Tag) || "Todo",
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => router.push("/notes/filter/All");

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
      clearDraft();
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNote;
    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <fieldset className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {/* <ErrorMessage component="span" name="title" className={css.error} /> */}
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {/* <ErrorMessage component="span" name="content" className={css.error} /> */}
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>

      <fieldset className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </fieldset>
    </form>
  );
}
