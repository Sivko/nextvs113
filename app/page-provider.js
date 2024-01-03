'use client'
 
import { createContext, useState } from 'react'
 
export const Context = createContext({})
 
export default function PageProvider({ children }) {

  const [modals, setModals] = useState([]);

  return <Context.Provider value={{modals, setModals}}>{children}</Context.Provider>
}