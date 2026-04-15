# 🐾 FurKids – Smart Pet Care System

> A full-stack web application to manage your pets' health, care schedules, and medical records — all in one place.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Design System](#-design-system)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🐶 About the Project

Pet owners often struggle with scattered information — vaccination dates in notebooks, prescriptions in WhatsApp chats, and vet contacts saved in random places.

**FurKids** solves this by bringing everything together into one clean, digital system. It helps you:

- 📋 Keep a complete profile for each of your pets
- ⏰ Never miss a vaccination, deworming, or grooming appointment
- 🚨 Get instant first-aid guidance when your pet shows symptoms
- 📁 Store and access medical records anytime
- 📍 Find trusted vets near you (India-focused)
- 📚 Learn proper feeding, grooming, and training techniques

This is a clean MVP — no login required, no overengineering. Just a practical tool that works.

---

## ✨ Features

| Page | Description |
|------|-------------|
| 🏠 **Home** | Hero section, quick-access CTA buttons, scrollable pet tips carousel |
| 🐶 **Dashboard** | Add / Edit / Delete pets with species, breed, age, weight; shows upcoming reminders per pet card |
| 🚨 **Problem Solver** | Select from 8 common symptoms and get instant first-aid guidance using pure JavaScript logic |
| ⏰ **Reminders** | Full CRUD for care reminders with colour-coded urgency (red → yellow → green) |
| 📁 **Records** | Drag-and-drop file upload; store prescriptions, X-rays, lab reports linked to each pet |
| 📍 **Vets** | Static directory of 12 India-based clinics with city filter, search, and emergency badges |
| 📚 **Guides** | Tabbed care guides: Feeding, Training, Grooming, Health, Puppy/Kitten Care |
| 👤 **Profile** | Editable user info (localStorage) with live stats pulled from the backend API |

---

## 🧱 Tech Stack

### Frontend
- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom design system with CSS variables, no UI frameworks
- **Vanilla JavaScript** — Fetch API, DOM manipulation, modals, toast notifications

### Backend
- **Node.js** — Runtime environment
- **Express.js** — REST API framework
- **Multer** — File upload middleware

### Database
- **MySQL** — Relational database with foreign key constraints and cascade deletes

---

## 📁 Project Structure

```
furkids/
│
├── 📂 frontend/
│   ├── 📂 pages/
│   │   ├── index.html          # Home / Landing page
│   │   ├── dashboard.html      # Pet management (core page)
│   │   ├── problem.html        # Symptom-based problem solver
│   │   ├── reminders.html      # Care reminders
│   │   ├── records.html        # Medical records & file upload
│   │   ├── vets.html           # Vet finder (India)
│   │   ├── guides.html         # Care guides (tabbed)
│   │   └── profile.html        # User profile
│   ├── 📂 css/
│   │   └── styles.css          # Global styles & design tokens
│   └── 📂 js/
│       ├── app.js              # Shared utilities (toast, modal, nav, helpers)
│       └── api.js              # Centralised fetch wrappers for all APIs
│
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js               # MySQL connection pool (mysql2)
│   ├── 📂 models/
│   │   ├── petModel.js         # Pet SQL queries
│   │   ├── reminderModel.js    # Reminder SQL queries
│   │   └── recordModel.js      # Record SQL queries
│   ├── 📂 controllers/
│   │   ├── petController.js    # Pet business logic & validation
│   │   ├── reminderController.js
│   │   └── recordController.js
│   ├── 📂 routes/
│   │   ├── petRoutes.js        # /api/pets
│   │   ├── reminderRoutes.js   # /api/reminders
│   │   └── recordRoutes.js     # /api/records (with file upload)
│   ├── 📂 uploads/             # Uploaded files stored here
│   ├── package.json
│   └── server.js               # Express app entry point (port 5000)
│
├── 📂 database/
│   └── schema.sql              # CREATE TABLE statements + seed data
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16+
- [MySQL](https://www.mysql.com/) v8+
- npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/furkids.git
cd furkids
```

---

### 2. Set Up the Database

```bash
mysql -u root -p < database/schema.sql
```

This will create the `furkids` database, all tables, and insert sample seed data.

---

### 3. Configure the Backend

```bash
cd backend
```

Open `config/db.js` and update your MySQL credentials:

```javascript
const pool = mysql.createPool({
  host:     'localhost',
  user:     'root',
  password: 'your_password',   // ← update this
  database: 'furkids',
});
```

> **Tip:** You can also create a `.env` file in `/backend/` for environment-based config:
> ```env
> DB_HOST=localhost
> DB_USER=root
> DB_PASSWORD=yourpassword
> DB_NAME=furkids
> PORT=5000
> ```

---

### 4. Install Dependencies & Start the Server

```bash
npm install

# For production
npm start

# For development (auto-restarts on file changes)
npm run dev
```

✅ The API will be running at: **`http://localhost:5000`**

Verify it's working:
```
GET http://localhost:5000/api/health
→ { "status": "ok", "app": "FurKids API" }
```

---

### 5. Open the Frontend

No build step required. Open any page directly in your browser.

**Option A — Open directly:**
```
frontend/pages/index.html  ← double-click to open
```

**Option B — VS Code Live Server:**
Right-click `index.html` → *Open with Live Server*

**Option C — Python HTTP server:**
```bash
cd frontend
python3 -m http.server 3000
# Then open: http://localhost:3000/pages/index.html
```

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api`

All responses follow this envelope:
```json
{ "success": true, "data": { ... } }
```

### 🐾 Pets

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/pets` | Get all pets |
| `GET` | `/pets/:id` | Get a single pet by ID |
| `POST` | `/pets` | Create a new pet |
| `PUT` | `/pets/:id` | Update a pet |
| `DELETE` | `/pets/:id` | Delete a pet (cascades to reminders & records) |

**POST `/pets` — example body:**
```json
{
  "name": "Bruno",
  "breed": "Labrador Retriever",
  "age": 3.0,
  "weight": 28.5,
  "species": "Dog",
  "notes": "Loves fetch"
}
```

---

### ⏰ Reminders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/reminders` | Get all reminders (joined with pet name) |
| `POST` | `/reminders` | Create a reminder |
| `PUT` | `/reminders/:id` | Update a reminder |
| `DELETE` | `/reminders/:id` | Delete a reminder |

**POST `/reminders` — example body:**
```json
{
  "type": "vaccination",
  "date": "2025-06-15",
  "notes": "Annual rabies shot",
  "pet_id": 1
}
```

Allowed `type` values: `vaccination` · `deworming` · `grooming` · `checkup` · `other`

---

### 📁 Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/records` | Get all records (joined with pet name) |
| `POST` | `/records` | Upload a new record (`multipart/form-data`) |
| `DELETE` | `/records/:id` | Delete a record |

**POST `/records` — form fields:**
```
title        (string, required)
pet_id       (integer, required)
record_type  (string, optional) — Prescription / Lab Report / X-Ray / Vaccination / General
file         (file, optional)   — PDF, JPG, PNG, DOC
```

---

### 🩺 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Returns server status |

---

## 🗄️ Database Schema

```sql
-- Pets (core entity)
CREATE TABLE pets (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  breed      VARCHAR(100)  NOT NULL,
  age        DECIMAL(4,1)  NOT NULL,        -- in years (e.g. 1.5)
  weight     DECIMAL(6,2)  NOT NULL,        -- in kg
  species    VARCHAR(50)   DEFAULT 'Dog',
  notes      TEXT,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Reminders (linked to a pet)
CREATE TABLE reminders (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  type       ENUM('vaccination','deworming','grooming','checkup','other') NOT NULL,
  date       DATE          NOT NULL,
  notes      TEXT,
  pet_id     INT           NOT NULL,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Records (linked to a pet)
CREATE TABLE records (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200)  NOT NULL,
  file_path   VARCHAR(500)  NOT NULL,
  record_type VARCHAR(100)  DEFAULT 'General',
  pet_id      INT           NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
```

> ⚠️ Deleting a pet **automatically removes** all its reminders and records via `ON DELETE CASCADE`.

---

## 🎨 Design System

| CSS Variable | Value | Usage |
|---|---|---|
| `--bg` | `#0F172A` | Page background |
| `--card` | `#1E293B` | Card / panel background |
| `--border` | `#334155` | Borders & dividers |
| `--primary` | `#22C55E` | Buttons, success states |
| `--accent` | `#38BDF8` | Links, info badges |
| `--warn` | `#F59E0B` | Upcoming reminders |
| `--danger` | `#EF4444` | Delete actions, urgent alerts |

**Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts

---

## 🔮 Roadmap

- [ ] User authentication (JWT — register & login)
- [ ] Push / browser notifications for upcoming reminders
- [ ] Google Maps integration for Vet Finder
- [ ] Photo upload for pet profiles
- [ ] Export medical records as PDF
- [ ] AI-powered symptom analysis
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Tamil, Telugu, etc.)

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add: your feature description"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please follow the existing code style and comment any new functions clearly.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/) — Minimal, flexible Node.js web framework
- [mysql2](https://github.com/sidorares/node-mysql2) — Fast MySQL client for Node.js
- [Multer](https://github.com/expressjs/multer) — Multipart file upload middleware
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Open-source display font

---

<div align="center">

Made with ❤️ for pet lovers across India

**FurKids** — Because your pets deserve the best care 🐾

</div>
