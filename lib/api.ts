import axios from 'axios';
import { type CreateNote, type Note } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (
  searchQuery: string,
  page: number
): Promise<NotesHttpResponse> => {
  const response = await axios.get<NotesHttpResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(searchQuery && { search: searchQuery }),
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNote): Promise<Note> => {
  const response = await axios.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
