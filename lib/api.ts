import type { Note, Tag } from "@/types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_API_TOKEN;

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  search?: string;
  tag?: Tag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;
axios.defaults.headers.common["accept"] = "application/json";

export async function fetchNotes(
  params: FetchNotesProps
): Promise<NoteResponse> {
  const { search, tag, page, perPage, sortBy } = params;
  const response = await axios.get<NoteResponse>("/notes", {
    params: {
      search: search,
      tag,
      page: page,
      perPage: perPage,
      sortBy,
    },
  });
  console.log("Відповідь сервера:", response.data);
  return response.data;
}

// export async function fetchNotes(
//   params: FetchNotesProps
// ): Promise<NoteResponse> {
//   const { search, tag, page, perPage, sortBy } = params;
//   const response = await axios.get<NoteResponse>('/notes', {
//     params: {
//       search: '',
//       tag,
//       page: 1,
//       perPage: 12,
//       sortBy,
//     },
//   });
//   console.log('Відповідь сервера:', response.data);
//   return response.data;
// }

// export async function fetchNotes(): Promise<NoteResponse> {
//   const response = await axios.get<NoteResponse>('/notes', {
//     params: {
//       search: '',
//       page: 1,
//       perPage: 12,
//     },
//   });
//   console.log('Відповідь сервера:', response.data);
//   return response.data;
// }

export type NewNote = {
  title: string;
  content: string;
  tag: string;
};

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
}
