import { useMemo, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/system'
import { NewNote } from './assets/pages'
import { useNotesContext } from './assets/context/NotesContext'

function App() {
  const { notes, tags } = useNotesContext()

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<h2>hello</h2>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          {/* index matches id to individual routes*/}
          <Route index element={<h2>show</h2>} />
          <Route path="edit" element={<h2>edit</h2>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
