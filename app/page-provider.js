'use client'
 
import { createContext, useState } from 'react'
 
export const Context = createContext({})
 
export default function PageProvider({ children }) {

  const [modals, setModals] = useState([]);
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("app.salesap.ru");

  return <Context.Provider value={{modals, setModals, token, setToken, address, setAddress}}>{children}</Context.Provider>
}