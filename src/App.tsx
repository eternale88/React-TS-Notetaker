import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@mui/system'
import { NewNote, EditNote } from './assets/pages'
import { Note, NoteLayout, NoteList } from './assets/components'

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
