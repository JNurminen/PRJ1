import React from "react";

// ContactList komponentti renderöi yhteystiedot taulukkona
const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => { // onDelete funktiolla poistetaan yhteystieto tietokannasta
        try { // Yritetään suorittaa seuraavaa
            const url = `http://localhost:5000/api/contacts/${id}` // Tietokannan osoite
            await fetch(url, { method: 'DELETE' }) // fetch pyyntö
            updateCallback('Contact deleted successfully!') // Päivitetään yhteystiedot
        }
        catch (err) { // Jos yllä oleva ei onnistu, tulostetaan virheilmoitus konsoliin
            console.error("Failed to delete") // Tulostetaan virheilmoitus konsoliin
        }
    }

    // ContactList komponentti renderöi yhteystiedot taulukkona
    return <div>
        <h2>Contacts</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList;