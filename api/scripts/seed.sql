-- seed.sql
-- Données issues du fichier Excel

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE artisan_month;
TRUNCATE TABLE contacts_log;
TRUNCATE TABLE artisans;
TRUNCATE TABLE specialties;
TRUNCATE TABLE categories;

START TRANSACTION;

-- ============================
-- Catégories
-- ============================
INSERT INTO categories (name, slug) VALUES
  ('Alimentation', 'alimentation'),
  ('Bâtiment',     'batiment'),
  ('Fabrication',  'fabrication'),
  ('Services',     'services');

-- ============================
-- Spécialités
-- ============================
INSERT INTO specialties (category_id, name, slug) VALUES
  ((SELECT id FROM categories WHERE slug='alimentation'), 'Boucher',      'boucher'),
  ((SELECT id FROM categories WHERE slug='alimentation'), 'Boulanger',    'boulanger'),
  ((SELECT id FROM categories WHERE slug='alimentation'), 'Chocolatier',  'chocolatier'),
  ((SELECT id FROM categories WHERE slug='alimentation'), 'Traiteur',     'traiteur'),

  ((SELECT id FROM categories WHERE slug='batiment'),     'Chauffagiste', 'chauffagiste'),
  ((SELECT id FROM categories WHERE slug='batiment'),     'Électricien',  'electricien'),
  ((SELECT id FROM categories WHERE slug='batiment'),     'Menuisier',    'menuisier'),
  ((SELECT id FROM categories WHERE slug='batiment'),     'Plombier',     'plombier'),

  ((SELECT id FROM categories WHERE slug='fabrication'),  'Bijoutier',    'bijoutier'),
  ((SELECT id FROM categories WHERE slug='fabrication'),  'Couturier',    'couturier'),
  ((SELECT id FROM categories WHERE slug='fabrication'),  'Ferronier',    'ferronier'),

  ((SELECT id FROM categories WHERE slug='services'),     'Coiffeur',     'coiffeur'),
  ((SELECT id FROM categories WHERE slug='services'),     'Fleuriste',    'fleuriste'),
  ((SELECT id FROM categories WHERE slug='services'),     'Toiletteur',   'toiletteur'),
  ((SELECT id FROM categories WHERE slug='services'),     'Webdesign',    'webdesign');

-- ============================
-- Artisans (17 lignes du fichier Excel)
-- ============================
SET @about := 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu.';

-- ALIMENTATION
INSERT INTO artisans (specialty_id, name, rating, city, department_code, postal_code, website_url, image_url, about, email_contact)
VALUES
  ((SELECT id FROM specialties WHERE slug='boucher'),     'Boucherie Dumont',       4.5, 'Lyon',           NULL, NULL, NULL,                                   NULL, @about, 'boucherie.dumond@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='boulanger'),   'Au pain chaud',          4.8, 'Montélimar',     NULL, NULL, NULL,                                   NULL, @about, 'aupainchaud@hotmail.com'),
  ((SELECT id FROM specialties WHERE slug='chocolatier'), 'Chocolaterie Labbé',     4.9, 'Lyon',           NULL, NULL, 'https://chocolaterie-labbe.fr',         NULL, @about, 'chocolaterie-labbe@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='traiteur'),    'Traiteur Truchon',       4.1, 'Lyon',           NULL, NULL, 'https://truchon-traiteur.fr',           NULL, @about, 'contact@truchon-traiteur.fr');

-- BÂTIMENT
INSERT INTO artisans (specialty_id, name, rating, city, department_code, postal_code, website_url, image_url, about, email_contact)
VALUES
  ((SELECT id FROM specialties WHERE slug='chauffagiste'), 'Orville Salmons',        4.0, 'Evian',          NULL, NULL, NULL,                                   NULL, @about, 'o.salmons@live.com'),
  ((SELECT id FROM specialties WHERE slug='electricien'),  'Mont Blanc Électricité', 4.7, 'Chamonix',       NULL, NULL, 'https://mont-blanc-electricite.com',   NULL, @about, 'contact@mont-blanc-electricite.com'),
  ((SELECT id FROM specialties WHERE slug='menuisier'),    'Boutot & fils',          4.5, 'Bourg-en-bresse',NULL, NULL, 'https://boutot-menuiserie.com',        NULL, @about, 'boutot-menuiserie@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='plombier'),     'Vallis Bellemare',       4.0, 'Vienne',         NULL, NULL, 'https://plomberie-bellemare.com',      NULL, @about, 'v.bellemare@gmail.com');

-- FABRICATION
INSERT INTO artisans (specialty_id, name, rating, city, department_code, postal_code, website_url, image_url, about, email_contact)
VALUES
  ((SELECT id FROM specialties WHERE slug='bijoutier'),    'Claude Quinn',           4.2, 'Aix-les-bains',  NULL, NULL, NULL,                                   NULL, @about, 'claude.quinn@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='couturier'),    'Aimée Lecuyer',          4.5, 'Annecy',         NULL, NULL, 'https://lecuyer-couture.com',          NULL, @about, 'a.amatiee@hotmail.com'),
  ((SELECT id FROM specialties WHERE slug='ferronier'),    'Ernest Carignan',        5.0, 'Le Puy-en-Velay',NULL, NULL, NULL,                                   NULL, @about, 'e-carigan@hotmail.com');

-- SERVICES
INSERT INTO artisans (specialty_id, name, rating, city, department_code, postal_code, website_url, image_url, about, email_contact)
VALUES
  ((SELECT id FROM specialties WHERE slug='coiffeur'),     'Royden Charbonneau',     3.8, 'Saint-Priest',   NULL, NULL, NULL,                                   NULL, @about, 'r.charbonneau@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='coiffeur'),     'Leala Dennis',           3.8, 'Chambéry',       NULL, NULL, 'https://coiffure-leala-chambery.fr',   NULL, @about, 'l.dennos@hotmail.fr'),
  ((SELECT id FROM specialties WHERE slug='coiffeur'),     'C''est suphair',         4.0, 'Romans-sur-Isère',NULL, NULL, 'https://sup-hair.fr',                 NULL, @about, 'sup-hair@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='fleuriste'),    'Le monde des fleurs',    4.6, 'Annonay',        NULL, NULL, 'https://le-monde-des-fleurs-annonay.fr',NULL, @about, 'contact@le-monde-des-fleurs-annonay.fr'),
  ((SELECT id FROM specialties WHERE slug='toiletteur'),   'Valérie Laderoute',      4.5, 'Valence',        NULL, NULL, NULL,                                   NULL, @about, 'v.laderoute@gmail.com'),
  ((SELECT id FROM specialties WHERE slug='webdesign'),    'CM Graphisme',           4.4, 'Valence',        NULL, NULL, 'https://cm-graphisme.com',             NULL, @about, 'contact@cm-graphisme.com');

-- ============================
-- Artisans du mois (Top = 1)
-- ============================
INSERT INTO artisan_month (artisan_id, month, year) VALUES
  ((SELECT id FROM artisans WHERE name='Au pain chaud'),       MONTH(CURDATE()), YEAR(CURDATE())),
  ((SELECT id FROM artisans WHERE name='Chocolaterie Labbé'),  MONTH(CURDATE()), YEAR(CURDATE())),
  ((SELECT id FROM artisans WHERE name='Orville Salmons'),     MONTH(CURDATE()), YEAR(CURDATE()));

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
