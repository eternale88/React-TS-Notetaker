import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material'

export const NoteForm = () => {
  return (
    <>
      <Stack spacing={2}>
        <TextField defaultValue="Email address" />
      </Stack>
    </>
  )
}
