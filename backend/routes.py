from app import app, db
from flask import request, jsonify
from models import Contact

# Haetaan kaikki yhteystiedot
@app.route('/api/contacts', methods=['GET'])
def get_contacts(): # Funktio, joka suoritetaan, kun selain tekee GET-pyynnön osoitteeseen /api/contacts
    contacts = Contact.query.all() # Haetaan kaikki yhteystiedot tietokannasta
    result = [contact.to_json() for contact in contacts] # Muutetaan tietokannasta saadut oliot JSON-muotoon
    return jsonify(result), 200 # Palautetaan JSON-muotoinen vastaus ja statuskoodi 200
