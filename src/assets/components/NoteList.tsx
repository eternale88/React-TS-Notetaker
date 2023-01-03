import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
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
  tagIds: Tag[]
}
export const NoteList = () => {
  const { tags, notes } = useNotesContext()
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])
  const filteredNotes = useMemo(() => {
    return notesWithTags.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  const NoteCard = ({ id, title, tagIds }: SimplifiedNote) => {
    return (
      <Card
      // as={Link}
      // to={`/${id}`}
      // className={`h-100 text-reset text-decoration-none ${styles.card}`}
      >
        <CardContent>
          <Stack
            gap={2}
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack gap={1} className="justify-content-center flex-wrap">
                {tags.map((tag) => (
                  <Avatar className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Avatar>
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    )
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
          {filteredNotes.map((note) => (
            <Grid key={note.id} item xs={6} md={2} lg={3} xl={4} gap={2}>
              <NoteCard id={note.id} tagIds={note.tags} title={note.title} />
            </Grid>
          ))}
        </Grid>
      </form>
    </>
  )
}
