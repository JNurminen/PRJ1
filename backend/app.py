from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Luodaan Flask-sovellus
app = Flask(__name__)
CORS(app) # Sallitaan CORS-rajapinnat

# Tietokanta asetukset
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db' # Tietokannan nimi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Estetään turhat varoitukset

db = SQLAlchemy(app) # Luodaan tietokanta

import routes # Tuodaan routes-moduuli, jotta reitit saadaan käyttöön

with app.app_context():
    db.create_all() # Luodaan tietokantataulut, jos niitä ei ole olemassa

if __name__ == '__main__':
    app.run(debug=True) # Käynnistetään sovellus
