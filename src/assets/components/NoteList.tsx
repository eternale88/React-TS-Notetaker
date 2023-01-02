import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Item } from './NoteForm'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { useNotesContext } from '../context/NotesContext'
import { useMemo, useState } from 'react'
import { Tag } from '../interfaces'

interface SimplifiedNote {
  id: string
  title: string
  tagIds: Tag[] | string[]
}
export const NoteList = () => {
  const { tags, notes } = useNotesContext()
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        title === '' ||
        (note.title.toLowerCase().includes(title.toLowerCase()) &&
          selectedTags.length === 0) ||
        selectedTags.every((tag) =>
          note.tagIds.some((noteTag) => noteTag === tag.id)
        )
    )
  }, [title, selectedTags, notes])

  const NoteCard = ({ id, title, tagIds }: SimplifiedNote) => {
    return <>Hi</>
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h2">Notes</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <Stack spacing={2} direction="row">
              <Link to="/new">
                <Button type="submit" variant="outlined">
                  Create
                </Button>
              </Link>
              <Button variant="contained">Edit Tags</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <form style={{ marginTop: '12px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                id="title"
                label="Title"
                required
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <FormControl id="tags" fullWidth sx={{ textAlign: 'left' }}>
                <ReactSelect
                  options={tags.map((tag) => {
                    return {
                      label: tag.label,
                      value: tag.id,
                    }
                  })}
                  isMulti
                  placeholder="Tags"
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value }
                      })
                    )
                  }}
                  styles={{
                    input: (baseStyles) => ({
                      ...baseStyles,
                      padding: '13px 14px',
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                    }),
                  }}
                />
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={1} md={2} lg={3} xl={4} gap={1}>
            {filteredNotes.map((note) => (
              <Item key={note.id}>
                <NoteCard {...note} />
              </Item>
            ))}
          </Grid>
        </Grid>
      </form>
    </>
  )
}
