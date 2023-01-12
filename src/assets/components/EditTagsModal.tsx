import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import { Tag } from '../interfaces'
import { Item } from './NoteForm'
import { useNotesContext } from '../context/NotesContext'

interface EditModalProps {
  openDialog: boolean
  setOpenDialog: (openDialog: boolean) => void
  tags: Tag[]
}
export const EditTagsModal = ({
  openDialog,
  setOpenDialog,
  tags,
}: EditModalProps) => {
  const { onDeleteTag } = useNotesContext()

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit Tags</DialogTitle>
        <DialogContent>
          <form style={{ marginTop: '12px' }}>
            {tags.map((tag) => (
              <Stack
                key={tag.id}
                direction={'row'}
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <TextField
                  // sx={{
                  //   maxWidth: 500,
                  // }}
                  autoFocus
                  margin="dense"
                  id="name"
                  label={tag.label}
                  type="text"
                  fullWidth
                />
                <Button onClick={() => onDeleteTag(tag.id)} variant="outlined">
                  &times;
                </Button>
              </Stack>
            ))}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
