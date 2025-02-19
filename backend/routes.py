from app import app, db
from flask import request, jsonify
from models import Contact

# Haetaan kaikki yhteystiedot
@app.route('/api/contacts', methods=['GET'])
def get_contacts(): # Funktio, joka suoritetaan, kun selain tekee GET-pyynnön osoitteeseen /api/contacts
    contacts = Contact.query.all() # Haetaan kaikki yhteystiedot tietokannasta
    result = [contact.to_json() for contact in contacts] # Muutetaan tietokannasta saadut oliot JSON-muotoon
    return jsonify(result), 200 # Palautetaan JSON-muotoinen vastaus ja statuskoodi 200


# Lisätään uusi yhteystieto
@app.route('/api/contacts', methods=['POST'])
def create_contact():
    try: # Yritetään suorittaa seuraava koodi
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'phone' not in data: # Tarkistetaan, että pyynnön mukana tulee nimi, sähköposti ja puhelinnumero
            return jsonify({'error': 'Bad Request', 'message': 'Name, email and phone are required'}), 400 # Palautetaan virheilmoitus ja statuskoodi 400, jos jokin tiedoista puuttuu
        
        new_contact = Contact(name=data['name'], email=data['email'], phone=data['phone']) # Luodaan uusi Contact-olio
        db.session.add(new_contact) # Lisätään uusi olio tietokantaan
        db.session.commit() # Tallennetaan muutokset tietokantaan
        
        return jsonify({'message': 'Contact created successfully'}), 201 # Palautetaan onnistunut vastaus ja statuskoodi 201
    except Exception as e: # Jos yllä oleva koodi aiheuttaa virheen, suoritetaan tämä lohko
        db.session.rollback() # Peruutetaan mahdolliset muutokset tietokantaan
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500 # Palautetaan virheilmoitus ja statuskoodi 500


# Poistetaan yhteystieto
@app.route('/api/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    try:
        contact = Contact.query.get(id) # Etsitään yhteystieto id:n perusteella
        if contact is None:
            return jsonify({'error': 'Not Found', 'message': 'Contact not found'}), 404 # Palautetaan virheilmoitus ja statuskoodi 404, jos yhteystietoa ei löydy
        
        db.session.delete(contact) # Poistetaan yhteystieto tietokannasta
        db.session.commit() # Tallennetaan muutokset tietokantaan
        return jsonify({'message': 'Contact deleted successfully'}), 200 # Palautetaan onnistunut vastaus ja statuskoodi 200
    except Exception as e: # Jos yllä oleva koodi aiheuttaa virheen, suoritetaan tämä lohko
        db.session.rollback() # Peruutetaan mahdolliset muutokset tietokantaan
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500 # Palautetaan virheilmoitus ja statuskoodi 500
    

# Päivitetään yhteystieto
@app.route('/api/contacts/<int:id>', methods=['Patch'])
def update_contact(id):
    try:
        contact = Contact.query.get(id) # Etsitään yhteystieto id:n perusteella
        if contact is None:
            return jsonify({'error': 'Not Found', 'message': 'Contact not found'}), 404 # Palautetaan virheilmoitus ja statuskoodi 404, jos yhteystietoa ei löydy
        
        data = request.get_json()

        contact.name = data.get('name', contact.name) # Päivitetään nimi, jos uusi nimi on annettu
        contact.email = data.get('email', contact.email) # Päivitetään sähköposti, jos uusi sähköposti on annettu
        contact.phone = data.get('phone', contact.phone) # Päivitetään puhelinnumero, jos uusi puhelinnumero on annettu

        db.session.commit() # Tallennetaan muutokset tietokantaan
        
        return jsonify({'message': 'Contact updated successfully'}), 200 # Palautetaan onnistunut vastaus ja statuskoodi 200
    except Exception as e: # Jos yllä oleva koodi aiheuttaa virheen, suoritetaan tämä lohko
        db.session.rollback() # Peruutetaan mahdolliset muutokset tietokantaan
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500 # Palautetaan virheilmoitus ja statuskoodi 500