import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useNotesContext } from '../context/NotesContext'
import { Note } from '../interfaces'
export const NoteLayout = () => {
  const { notesWithTags } = useNotesContext()

  const { id } = useParams()

  const note = notesWithTags.find((note) => note.id === id)

  if (note == null) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export const useNote = () => useOutletContext<Note>()
