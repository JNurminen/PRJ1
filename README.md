# Yhteystietosovellus (Flask + React)

Sovellus yhteystietojen hallintaan. React-käyttöliittymä keskustelee Flaskilla tehdyn REST-rajapinnan kanssa, ja tiedot tallennetaan tietokantaan SQLAlchemyn avulla.

## Ominaisuudet

- Yhteystietojen listaus, lisäys, muokkaus ja poisto (CRUD)
- Pakollisten kenttien tarkistus rajapinnassa
- Flask palvelee myös käännetyn React-sovelluksen
- Yksikkötestit (Jest) ja päästä päähän -testit (Cypress)

## Teknologiat

| Osa | Teknologiat |
|---|---|
| Backend | Python, Flask, Flask-SQLAlchemy, SQLite / PostgreSQL |
| Frontend | React, Vite |
| Testaus | Jest, Cypress |

## API

| Metodi | Polku | Kuvaus |
|---|---|---|
| GET | `/api/contacts` | Kaikki yhteystiedot |
| POST | `/api/contacts` | Uusi yhteystieto (`name`, `email`, `phone`) |
| PATCH | `/api/contacts/<id>` | Yhteystiedon päivitys |
| DELETE | `/api/contacts/<id>` | Yhteystiedon poisto |

## Käynnistys

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Oletuksena käytetään SQLite-tietokantaa. PostgreSQL:n saa käyttöön asettamalla `DATABASE_URL`-ympäristömuuttujan (ks. `backend/.env.example`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontendin API-osoite on määritelty tiedostoissa `App.jsx`, `ContactForm.jsx` ja `ContactList.jsx`. Paikallisesti ajettaessa vaihda osoitteeksi `http://127.0.0.1:5000/api/contacts`.

### Testit

```bash
cd frontend
npm test              # Jest
npm run cypress:open  # Cypress
```
