import { Typography } from '@mui/material'
import { NoteForm } from '../components/index'
import { useNotesContext } from '../context/NotesContext'

export const EditNote = () => {
  return (
    <>
      <Typography variant="h2" my={4}>
        Edit Note
      </Typography>
      <NoteForm />
    </>
  )
}
