from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Luodaan Flask-sovellus
app = Flask(__name__)
CORS(app) # Sallitaan CORS-rajapinnat

# Tietokanta asetukset
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db' # Tietokannan nimi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Estetään turhat varoitukset

db = SQLAlchemy(app) # Luodaan tietokanta

if __name__ == '__main__':
    app.run(debug=True) # Käynnistetään sovellus
