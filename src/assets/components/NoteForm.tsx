import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  Stack,
  TextField,
  styled,
} from '@mui/material'
import { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from '../interfaces'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

interface NoteFormProps {
  onSubmit: (data: NoteData) => void
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <TextField
                ref={titleRef}
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
                <InputLabel htmlFor="tags">Tags</InputLabel>
                <CreatableReactSelect
                  isMulti
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
                      fontSize: '16px',
                      color: 'rgba(0, 0, 0, 0.87)',
                      opacity: 0,
                    }),
                  }}
                />
              </FormControl>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <TextField
              ref={markdownRef as unknown as React.RefObject<HTMLDivElement>}
              fullWidth
              multiline
              id="body"
              label="Body"
              required
              minRows={15}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button type="submit" variant="outlined">
                Save
              </Button>
              <Link to="..">
                <Button variant="contained">Cancel</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
