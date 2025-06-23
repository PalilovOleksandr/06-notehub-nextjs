export type Tags = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tags;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: Tags;
}
