import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
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

const StyledCard = styled(Card)({
  transition: 'translate ease-in-out 100ms, box-shadow ease-in-out 100ms',
  '&:hover ': {
    border: '1px solid black',
    translate: '0 -5px',
    boxShadow: '0 -5px 8px 0 rgba(0, 0, 0, 0.2)',
  },
})

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
      <Link to="/">
        <StyledCard
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
              <Typography sx={{ fontSize: 16 }} gutterBottom>
                {title}
              </Typography>
              {tags.length > 0 && (
                <Stack gap={1}>
                  {tags.map((tag) => (
                    <Avatar
                      sx={{ width: 'auto', padding: 0.25 }}
                      variant="rounded"
                      key={tag.id}
                    >
                      <Typography sx={{ fontSize: 14 }}>{tag.label}</Typography>
                    </Avatar>
                  ))}
                </Stack>
              )}
            </Stack>
          </CardContent>
        </StyledCard>
      </Link>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
            <Grid
              key={note.id}
              item
              xs={'auto'}
              sm={6}
              md={3}
              lg={3}
              xl={4}
              gap={2}
            >
              <NoteCard id={note.id} tagIds={note.tags} title={note.title} />
            </Grid>
          ))}
        </Grid>
      </form>
    </>
  )
}
