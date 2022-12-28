export interface Note extends NoteData {
  id: string
}
export interface NoteData {
  title: string
  markdown: string
  tags: Tag[]
}
export interface Tag {
  id: string
  label: string
}
