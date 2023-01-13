import { createContext, useContext, useMemo, useState } from 'react'
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
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  onEditNote: (id: string, data: NoteData) => void
  setNotes: (notes: RawNote[]) => void
  onDeleteNote: (id: string) => void
  onDeleteTag: (id: string) => void
  onEditTag: (id: string, label: string) => void
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
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onAddTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }
  const onEditTag = (id: string, label: string) => {
    setTags((prevTag) => {
      return prevTag.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

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

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  const onDeleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  return (
    <div>
      <NotesContext.Provider
        value={{
          notes,
          tags,
          setTags,
          onAddTag,
          notesWithTags,
          isEditing,
          setIsEditing,
          setNotes,
          onCreateNote,
          onEditNote,
          onDeleteNote,
          onDeleteTag,
          onEditTag,
        }}
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
