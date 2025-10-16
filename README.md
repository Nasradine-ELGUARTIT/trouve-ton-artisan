- Trouve Ton Artisan

Application **Fullstack (Node.js + React)** permettant de rechercher et contacter des artisans par catégorie.  
Projet structuré en deux parties :

- API (Back-end)** : Node.js / Express / MySQL  
- Front-end (Interface utilisateur)** : React / Vite / Bootstrap

---

-Installation et Lancement du projet

- Prérequis

Avant tout, assure-toi d’avoir installé :
- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [MySQL](https://www.mysql.com/)
- npm (inclus avec Node.js)

---

- 1. Configuration du Back-End (API)

- Étape 1 : Aller dans le dossier API
```bash
cd api

- Étape 2 : Installer les dépendances
npm install

-Étape 3 : Configurer les variables d’environnement

cp .env.example .env

- 2. Base de données MySQL
- Créer la base de données
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_c

-Importer les fichiers SQL
-Depuis le dossier api
mysql -u root -p trouve_ton_artisan < scripts/create.sql
mysql -u root -p trouve_ton_artisan < scripts/seed.sql

-lancer le serveur
npm run dev

-resultat:
Database connected successfully
API running on http://localhost:4000

-4. Lancer le Front-End (React)
-Étape 1 : Aller dans le dossier front/
cd ../front

-Étape 2 : Installer les dépendances
npm install

-Étape 3 : Démarrer le serveur Vite
npm run dev


Tu verras :

VITE v7.x ready in 250ms
Local: http://localhost:5173/

- 5. Vérification de la connexion Front ↔ API

Le front communique avec l’API via :

http://localhost:4000/api
