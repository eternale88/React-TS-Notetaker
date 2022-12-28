import { createContext, useContext } from 'react'
import { NoteData } from '../interfaces'
interface NewNoteProps {
  onSubmit: (data: NoteData) => void
}

const onSubmit = (data: NoteData): void => {}

const NotesContext = createContext<NewNoteProps>(null!)

// From Dan Abramov's documentation
type childProp = {
  children?: React.ReactNode
}
const NotesProvider = ({ children }: childProp): React.ReactNode | any => {
  return (
    <div>
      <NotesContext.Provider value={{ onSubmit }}>
        {children}
      </NotesContext.Provider>
    </div>
  )
}

export const useNotesContext = () => {
  return useContext(NotesContext)
}
export { NotesContext, NotesProvider }
