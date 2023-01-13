import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
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
  const { onDeleteTag, onEditTag } = useNotesContext()

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            width: 600,
            maxWidth: 600,
          },
        }}
      >
        <Stack
          direction={'row'}
          alignItems="center"
          justifyContent="space-between"
          marginRight={3}
        >
          <DialogTitle>Edit Tags</DialogTitle>
          <Button onClick={handleClose} sx={{ color: '#5f5b5b' }}>
            <CloseIcon />
          </Button>
        </Stack>
        <Divider />

        <DialogContent>
          <form style={{ marginTop: '12px' }}>
            {tags.map((tag) => (
              <Stack
                key={tag.id}
                direction={'row'}
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                marginY={2}
              >
                <TextField
                  autoFocus
                  id="name"
                  label={tag.label}
                  type="text"
                  fullWidth
                  value={tag.label}
                  onChange={(e) => onEditTag(tag.id, e.target.value)}
                />
                <Button
                  color="error"
                  onClick={() => onDeleteTag(tag.id)}
                  variant="outlined"
                  sx={{
                    padding: '16.5px 14px',
                    lineHeight: '1.4375em',
                  }}
                >
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
