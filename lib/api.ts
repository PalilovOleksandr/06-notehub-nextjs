import axios from 'axios';
import { type CreateNote, type Note } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!myKey) {
  throw new Error(
    'Environment variable NEXT_PUBLIC_NOTEHUB_TOKEN is not defined. Please ensure it is set.'
  );
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchQuery: string,
  page: number
): Promise<NotesHttpResponse> => {
  try {
    const { data } = await axios.get<NotesHttpResponse>('/notes', {
      params: {
        page,
        perPage: 12,
        ...(searchQuery && { search: searchQuery }),
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw new Error('Unable to retrieve notes. Please try again later.');
  }
};

export const createNote = async (noteData: CreateNote): Promise<Note> => {
  try {
    const { data } = await axios.post<Note>('/notes', noteData);
    return data;
  } catch (error) {
    console.error('Failed to create note:', error);
    throw new Error(
      'Unable to create note. Please check your data and try again.'
    );
  }
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  try {
    const { data } = await axios.delete<Note>(`/notes/${noteId}`);
    return data;
  } catch (error) {
    console.error(`Failed to delete note with ID ${noteId}:`, error);
    throw new Error(
      'Unable to delete note. It might have already been removed.'
    );
  }
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  try {
    const { data } = await axios.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch note with ID ${id}:`, error);
    throw new Error('Unable to retrieve note. It might not exist.');
  }
};
