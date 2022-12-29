import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/system'
import { NewNote } from './assets/pages'
import { Tag } from './assets/interfaces'
import useLocalStorage from './assets/hooks/useLocalStorage'

//raw types because retrieve from local storage which stores as a string
export interface RawNote {
  id: string
}
export interface RawNoteData {
  title: string
  markdown: string
  tagIds: string[]
}
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('Notes', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('Tags', [])
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
