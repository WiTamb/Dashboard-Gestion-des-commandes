# MEAN Stack E-commerce Dashboard (Tunisian Edition)

Ce projet est un tableau de bord e-commerce complet adapté au marché tunisien, construit avec la stack MEAN (MongoDB, Express, Angular, Node.js).

## 📋 Fonctionnalités Clés
- **Marché Tunisien** : Devise TND, produits locaux, et adresses tunisiennes.
- **Authentification** : Système sécurisé avec JWT.
- **Dashboard** : Statistiques visuelles avec Chart.js (Ventes, répartition commandes).
- **Gestion Complète** : Articles, Commandes, Livraisons, et Stock.
- **Design** : Interface moderne "Glassmorphism" avec Bootstrap et Dark Mode.

## 🚀 Guide de Démarrage Rapide

Suivez ces étapes pour recréer le projet sur une nouvelle machine.

### 1. Prérequis
Assurez-vous d'avoir installé :
- **Node.js** (v18 ou plus récent) -> [Télécharger](https://nodejs.org/)
- **MongoDB Community Server** -> [Télécharger](https://www.mongodb.com/try/download/community)
- **Git** -> [Télécharger](https://git-scm.com/)

### 2. Installation du Backend

1. **Naviguez vers le dossier backend :**
   ```bash
   cd backend
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Configurez l'environnement :**
   - Copiez le fichier `.env.example` vers `.env` (si nécessaire) :
     ```bash
     cp .env.example .env
     ```
   - Assurez-vous que `.env` contient :
     ```env
     PORT=5000
     MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_db
     JWT_SECRET=votre_secret_jwt
     ```

4. **Initialisez la Base de Données (Seed) :**
   Cette commande crée l'utilisateur admin et remplit la base avec des données de test tunisiennes.
   ```bash
   npm run seed
   # Ou: node seed.js
   ```

5. **Lancez le serveur :**
   ```bash
   npm run dev
   ```
   *Le serveur démarrera sur http://localhost:5000*

### 3. Installation du Frontend

1. **Ouvrez un nouveau terminal et naviguez vers le dossier frontend :**
   ```bash
   cd frontend
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Lancez l'application Angular :**
   ```bash
   npm start
   ```
   *L'application sera accessible sur http://localhost:4200*



## 🛠 Structure du Projet

```
mean/
├── backend/                 # Serveur Node.js/Express
│   ├── controllers/         # Logique métier
│   ├── models/              # Schémas Mongoose (User, Article, Order...)
│   ├── routes/              # Routes API
│   ├── seed.js              # Script d'initialisation des données
│   └── server.js            # Point d'entrée serveur
│
└── frontend/                # Client Angular
    ├── src/app/components/  # Composants (Dashboard, Orders, Articles...)
    ├── src/app/services/    # Services HTTP
    └── src/styles.css       # Styles globaux (Glassmorphism)
```
