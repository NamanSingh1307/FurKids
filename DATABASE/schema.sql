-- ============================================================
-- FurKids – Smart Pet Care System
-- Database Schema (MySQL)
-- ============================================================

CREATE DATABASE IF NOT EXISTS furkids;
USE furkids;

-- ────────────────────────────────────────────────────────────
-- Table: pets
-- Stores information about each registered pet   
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pets (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100)   NOT NULL,
  breed     VARCHAR(100)   NOT NULL,
  age       DECIMAL(4,1)   NOT NULL,          -- age in years (e.g. 1.5)
  weight    DECIMAL(6,2)   NOT NULL,          -- weight in kg
  species   VARCHAR(50)    DEFAULT 'Dog',     -- Dog / Cat / Bird / etc.
  notes     TEXT,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────────────────
-- Table: reminders
-- Care reminders linked to a specific pet
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reminders (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  type      ENUM('vaccination','deworming','grooming','checkup','other') NOT NULL,
  date      DATE           NOT NULL,
  notes     TEXT,
  pet_id    INT            NOT NULL,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- Table: records
-- Medical / document records linked to a pet
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS records (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200)  NOT NULL,
  file_path   VARCHAR(500)  NOT NULL,          -- stored file path or URL
  record_type VARCHAR(100)  DEFAULT 'General', -- e.g. Prescription, X-Ray
  pet_id      INT           NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- ────────────────────────────────────────────────────────────
-- Sample seed data (optional – remove in production)
-- ────────────────────────────────────────────────────────────
INSERT INTO pets (name, breed, age, weight, species) VALUES
  ('Bruno',   'Labrador Retriever', 3.0, 28.5, 'Dog'),
  ('Milo',    'Persian Cat',        2.5, 4.2,  'Cat'),
  ('Tweety',  'Budgerigar',         1.0, 0.04, 'Bird');

INSERT INTO reminders (type, date, notes, pet_id) VALUES
  ('vaccination', DATE_ADD(CURDATE(), INTERVAL 7  DAY), 'Annual rabies shot',    1),
  ('grooming',    DATE_ADD(CURDATE(), INTERVAL 3  DAY), 'Full grooming session', 1),
  ('deworming',   DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'Monthly deworming',     2);
