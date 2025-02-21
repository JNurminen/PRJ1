import { useState, useEffect } from 'react'
import ContactList from './ContactList' // Tuodaan ContactList komponentti
import './App.css'
import ContactForm from './ContactForm'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

// App funktiolla haetaan yhteystiedot tietokannasta ja asetetaan ne stateen
function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

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

  // closeModal funktiolla suljetaan modaalinen ikkuna
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  // openCreateModal funktiolla avataan modaalinen ikkuna 
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // openEditModal funktiolla avataan modaalinen ikkuna ja asetetaan yhteystiedot stateen
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // onUpdate funktiolla suljetaan modaalinen ikkuna ja haetaan yhteystiedot tietokannasta
  const onUpdate = (message) => {
    closeModal()
    getContacts()
    toast.success(message)
  }

  // App funktio renderöi yhteystiedot ja modaalisen ikkunan
  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create Contact</button>
      { isModalOpen && 
      <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm existingContact={currentContact}  updateCallback={() => onUpdate(currentContact.id ? 'Contact updated successfully!' : 'New contact created successfully!')} />
      </div>
      </div>
    }   
    <ToastContainer />   
    </>
  )
}

export default App