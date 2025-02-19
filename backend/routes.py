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
    try:
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'phone' not in data:
            return jsonify({'error': 'Bad Request', 'message': 'Name, email and phone are required'}), 400
        
        new_contact = Contact(name=data['name'], email=data['email'], phone=data['phone'])
        db.session.add(new_contact)
        db.session.commit()
        
        return jsonify({'message': 'Contact created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500