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
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { Tag } from '../interfaces'
import { v4 as uuidV4 } from 'uuid'
import { useNotesContext } from '../context/NotesContext'
import { useNote } from './NoteLayout'
export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const NoteForm = () => {
  const { title, markdown, id } = useNote()

  const navigate = useNavigate()

  const { onCreateNote, onEditNote, onAddTag, tags, isEditing, setIsEditing } =
    useNotesContext()

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const handleSubmit = (e: FormEvent) => {
    console.log(titleRef.current!.value, markdownRef)
    e.preventDefault()

    onCreateNote({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('..')
  }

  const handleEditSubmit = (e: FormEvent) => {
    console.log(titleRef.current!.value, markdownRef)
    e.preventDefault()

    onEditNote(id, {
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    setIsEditing(false)
    navigate('..')
  }
  return (
    <>
      <form onSubmit={!isEditing ? handleSubmit : handleEditSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <TextField
                inputRef={titleRef}
                fullWidth
                id="title"
                label="Title"
                defaultValue={title}
                required
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <FormControl id="tags" fullWidth sx={{ textAlign: 'left' }}>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label }
                    onAddTag(newTag)
                    setSelectedTags((prev) => [...prev, newTag])
                  }}
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
          <Grid item xs={12}>
            <TextField
              inputRef={
                markdownRef as unknown as React.RefObject<HTMLDivElement>
              }
              defaultValue={markdown}
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
