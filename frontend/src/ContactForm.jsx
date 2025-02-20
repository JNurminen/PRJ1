import { useState } from "react";

// ContactForm komponentti
const ContactForm = ({ existingContact = {}, updateCallback}) => { // Propsit existingContact ja updateCallback
  // useState hookilla luodaan tilat muuttujille
  const [name, setName] = useState(existingContact.name || ""); // Asetetaan oletusarvot existingContact muuttujalle
  const [email, setEmail] = useState(existingContact.email || ""); // Asetetaan oletusarvot existingContact muuttujalle
  const [phone, setPhone] = useState(existingContact.phone || ""); // Asetetaan oletusarvot existingContact muuttujalle

  const updating = Object.entries(existingContact).length !== 0; // Jos existingContact muuttujalla on arvoja, niin updating muuttuja saa arvon true

    // onSubmit funktiolla lisätään uusi yhteystieto
    const onSubmit = async (e) => {
        e.preventDefault()

        // Tarkistetaan onko nimi, sähköposti ja puhelinnumero syötetty
        const data = {
            name: name,
            email: email,
            phone: phone
        }
        const url = "http://localhost:5000/api/contacts" + (updating ? `/${existingContact.id}` : "") // Jos updating on true, niin lisätään id osoitteeseen
        const options = { // Asetetaan fetch asetukset
            method: updating ? "PATCH" : "POST", // POST metodi
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options) // fetch pyyntö
        if (response.status !== 201 && response.status !== 200) { // Jos tulee virhe
            const data = await response.json() // Muutetaan vastaus JSON muotoon
            alert(data.message) // Ilmoitetaan käyttäjälle virheestä
        } else {
            updateCallback() // Kutsutaan updateCallback funktiota
        }
    }

  return (
     <form onSubmit={onSubmit}>
    <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    <button type="submit">{updating ? "Update" : "Create"}</button>
  </form>
    );
}

export default ContactForm;