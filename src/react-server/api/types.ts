// Define the structure of a note
export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

// Define the type for the callback function
export type NoteCallback = (error: Error | null, result?: Note) => void;
