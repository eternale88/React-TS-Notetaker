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
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const titleRef = useRef<HTMLInputElement>(null)
const markdownRef = useRef<HTMLDivElement>(null)
export const NoteForm = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              ref={markdownRef}
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
              <Button variant="outlined">Save</Button>
              <Link to="..">
                <Button variant="contained">Cancel</Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
