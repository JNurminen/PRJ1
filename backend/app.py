from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Luodaan Flask-sovellus
app = Flask(__name__)
CORS(app) # Sallitaan CORS-rajapinnat

# Tietokanta asetukset
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://contacts_postgre_user:JYUcOLDQx3HTDik3xpFJSJgBR2JkzaiU@dpg-cuu2312j1k6c738hh6dg-a.frankfurt-postgres.render.com/contacts_postgre' # Tietokannan nimi
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Estetään turhat varoitukset

db = SQLAlchemy(app) # Luodaan tietokanta

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Määritellään reitti, joka palauttaa frontendin
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

import routes # Tuodaan routes-moduuli, jotta reitit saadaan käyttöön

with app.app_context():
    db.create_all() # Luodaan tietokantataulut, jos niitä ei ole olemassa

if __name__ == '__main__':
    app.run(debug=True) # Käynnistetään sovellus
