import { Typography } from '@mui/material'
import { NoteForm } from '../components/index'
import { NoteData } from '../interfaces'
import { NewNoteProps, useNotesContext } from '../context/NotesContext'

export const NewNote = () => {
  return (
    <>
      <Typography variant="h2" my={4}>
        New Note
      </Typography>
      <NoteForm />
    </>
  )
}
