import { useState, useEffect } from 'react'
import './App.css'

// App funktiolla haetaan yhteystiedot tietokannasta ja asetetaan ne stateen
function App() {
  const [contacts, setContacts] = useState([])

  useEffect(() => { // useEffect hookilla haetaan yhteystiedot tietokannasta kun komponentti renderöidään
    fetchContacts()
  }
  , [])

// fetchContacts funktiolla haetaan yhteystiedot tietokannasta ja asetetaan ne stateen  
  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/api/contacts')
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  return (
    <>
    </>
  )
}

export default App
