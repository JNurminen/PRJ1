import { useState, useEffect } from 'react'
import ContactList from './ContactList' // Tuodaan ContactList komponentti
import './App.css'
import ContactForm from './ContactForm'

// App funktiolla haetaan yhteystiedot tietokannasta ja asetetaan ne stateen
function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getContacts()
  }
  , [])

  // getContacts funktiolla haetaan yhteystiedot tietokannasta
  const getContacts = async () => {
    const url = 'http://localhost:5000/api/contacts' // Tietokannan osoite
    const response = await fetch(url) // fetch pyyntö
    const data = await response.json() // Muutetaan vastaus JSON muotoon
    setContacts(data) // Asetetaan yhteystiedot stateen
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }


  return (
    <>
      <ContactList contacts={contacts} />
      <button onClick={openCreateModal}>Create Contact</button>
      { isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm />
      </div>

      </div>
  }
      
    </>
  )
}

export default App