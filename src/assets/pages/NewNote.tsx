import { Typography } from '@mui/material'
import { NoteForm } from '../components/index'

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
