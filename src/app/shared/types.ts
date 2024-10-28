export interface CommonSectionProps {
  title: string;
  content: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}
