import { createContext, useContext, useState } from 'react'

const SelectionContext = createContext()

export const useSelection = () => useContext(SelectionContext)

export const SelectionProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <SelectionContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectionContext.Provider>
  )
}