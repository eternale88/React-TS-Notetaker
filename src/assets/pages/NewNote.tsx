import { Typography } from '@mui/material'
import { NoteForm } from '../components/index'
import { NoteData } from '../interfaces'
import { useNotesContext } from '../context/NotesContext'

export const NewNote = () => {
  const { onSubmit } = useNotesContext()
  return (
    <>
      <Typography variant="h2" my={4}>
        New Note
      </Typography>
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}
