import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useNote } from './NoteLayout'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useNotesContext } from '../context/NotesContext'

export const Note = () => {
  const { title, tags, id, markdown } = useNote()
  const { setIsEditing } = useNotesContext()
  //console.log(note)
  return (
    <>
      <Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={'auto'} sm={6}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Typography variant="h2">{title}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={'auto'} sm={6}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ justifyContent: 'flex-end' }}
            >
              <Link to={`/${id}/edit`}>
                <Button onClick={() => setIsEditing(true)} variant="contained">
                  Edit
                </Button>
              </Link>

              <Button type="submit" color="error" variant="outlined">
                Delete
              </Button>

              <Link to="..">
                <Button variant="outlined" color={'secondary'}>
                  Back
                </Button>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={'auto'} sm={12}>
            {tags.length > 0 && (
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignContent="center"
                gap={1}
                flexWrap="wrap"
              >
                {tags.map((tag) => (
                  <Avatar
                    sx={{
                      width: 'auto',
                      padding: 0.5,
                      background: '#1976d2',
                      marginTop: 1,
                    }}
                    variant="circular"
                    key={tag.id}
                  >
                    <Typography sx={{ fontSize: 14 }}>{tag.label}</Typography>
                  </Avatar>
                ))}
              </Stack>
            )}
          </Grid>
          <Grid item xs={'auto'} sm={12}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
