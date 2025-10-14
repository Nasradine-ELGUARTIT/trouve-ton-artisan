-- create.sql
-- Structure complète de la base "tta"

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS specialties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS artisans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  specialty_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  city VARCHAR(120),
  department_code VARCHAR(3),
  postal_code VARCHAR(10),
  website_url VARCHAR(255),
  image_url VARCHAR(255),
  about TEXT,
  email_contact VARCHAR(160) NOT NULL,
  FOREIGN KEY (specialty_id) REFERENCES specialties(id)
);

CREATE TABLE IF NOT EXISTS artisan_month (
  artisan_id INT NOT NULL,
  month TINYINT NOT NULL,
  year SMALLINT NOT NULL,
  PRIMARY KEY (artisan_id, month, year),
  FOREIGN KEY (artisan_id) REFERENCES artisans(id)
);

CREATE TABLE IF NOT EXISTS contacts_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artisan_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(160) NOT NULL,
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  ip VARCHAR(64),
  user_agent VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (artisan_id) REFERENCES artisans(id)
);

SET FOREIGN_KEY_CHECKS = 1;
