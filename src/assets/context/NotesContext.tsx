import { createContext, useContext, useMemo } from 'react'
import { NoteData, Tag } from '../interfaces'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as uuidV4 } from 'uuid'

//raw types because retrieve from local storage which stores as a string
export interface RawNote extends RawNoteData {
  id: string
}
export interface RawNoteData {
  title: string
  markdown: string
  tagIds: string[]
}
export interface NewNoteProps {
  onCreateNote: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  notes: RawNote[]
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  notesWithTags: NoteWithTags
}

type NoteWithTags = {
  tags: Tag[]
  id: string
  title: string
  markdown: string
  tagIds: string[]
}[]

const NotesContext = createContext<NewNoteProps>(null!)

// From Dan Abramov's documentation
type childProp = {
  children?: React.ReactNode
}
const NotesProvider = ({ children }: childProp): React.ReactNode => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('Notes', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('Tags', [])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    // must convert NoteData type to RawNote for localStorage
    //assign real id, and give tagIds our real tag ids from user input

    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  const onAddTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])
  console.log()

  return (
    <div>
      <NotesContext.Provider
        value={{ onCreateNote, notes, tags, setTags, onAddTag, notesWithTags }}
      >
        {children}
      </NotesContext.Provider>
    </div>
  )
}

export const useNotesContext = () => {
  return useContext(NotesContext)
}
export { NotesContext, NotesProvider }
