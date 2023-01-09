import { useMemo, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/system'
import { NewNote, EditNote } from './assets/pages'
import { RawNote, useNotesContext } from './assets/context/NotesContext'
import { Note, NoteLayout, NoteList } from './assets/components'
import { NoteData } from './assets/interfaces'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from './assets/hooks/useLocalStorage'

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout />}>
          {/* index matches id to individual routes*/}
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
