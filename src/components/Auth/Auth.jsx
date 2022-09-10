import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { doc, getDoc } from "@firebase/firestore"
import { dataBase } from "../../firebase"
import React, { useState, useContext, useEffect } from "react"
import { app } from "../../firebase"

const userContext = React.createContext()
const userToggleContext = React.createContext()

const auth = getAuth(app)

export function useUserContext() {
  return useContext(userContext)
}

export function useUserToggleContext() {
  return useContext(userToggleContext)
}

export function UserProvider(props) {
  const [userApp, setUserApp] = useState([])
  useEffect(() => {
    getUser()
  }, [])
  function getUser() {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const docRef = doc(dataBase, "PRVM_DB_PLAYERS", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const userDb = docSnap.data()
          setUserApp(userDb)
        } else {
          setUserApp(user)
        }
      }
    })
  }
  return (
    <userContext.Provider value={userApp}>
      <userToggleContext.Provider value={getUser}>
        {props.children}
      </userToggleContext.Provider>
    </userContext.Provider>
  )
}