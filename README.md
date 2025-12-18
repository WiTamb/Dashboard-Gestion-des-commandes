# MEAN Stack E-commerce Dashboard (Tunisian Edition)

Ce projet est un tableau de bord e-commerce complet adapté au marché tunisien, construit avec la stack MEAN (MongoDB, Express, Angular, Node.js).

## 📋 Fonctionnalités Clés
- **Marché Tunisien** : Devise TND, produits locaux, et adresses tunisiennes.
- **Authentification** : Système sécurisé avec JWT (Login: `admin` / `password123`).
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

## 🔑 Connexion
Utilisez les identifiants par défaut pour accéder au dashboard :
- **Utilisateur :** `admin`
- **Mot de passe :** `password123`

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

## ⚠️ Dépannage
- **Erreur de connexion (Login reste en chargement) ?**
  - Vérifiez que le backend tourne sur le port 5000.
  - Vérifiez que vous avez bien lancé `npm run seed` pour créer l'utilisateur admin.
- **Les données ne s'affichent pas ?**
  - Vérifiez que MongoDB est bien lancé (`mongod` ou service Windows).
- **Problèmes de compilation Frontend ?**
  - Assurez-vous d'utiliser une version récente de Node.js.

## 📦 Exporter et Partager le Projet

### 1. Partager le Code Source
Pour partager le projet avec vos collègues :
- **Option A (Git - Recommandé) :** Poussez le code sur GitHub/GitLab. Vos collègues feront un `git clone`.
- **Option B (Zip) :** Compressez le dossier `mean` **en excluant** les dossiers `node_modules`.
  - Vos collègues devront lancer `npm install` dans `backend` et `frontend`.

### 2. Partager la Base de Données (3 Méthodes)

#### Méthode A : Le Script de Seed (Recommandé pour le dév)
C'est la méthode la plus simple. Le fichier `seed.js` contient déjà toutes les données de base pour le marché tunisien.
- **Vos collègues** lancent simplement : `npm run seed` (dans le dossier backend).
- **Résultat :** Tout le monde a exactement les mêmes produits, catégories et utilisateurs de test.

#### Méthode B : Export/Import MongoDB (Pour données personnalisées)
Si vous avez créé des données manuellement et voulez les partager :
1. **Exporter :**
   ```bash
   mongodump --db ecommerce_db --out dump/
   ```
   *Envoyez le dossier `dump/` généré à vos collègues.*

2. **Importer (Chez vos collègues) :**
   ```bash
   mongorestore dump/
   ```

#### Méthode C : MongoDB Atlas (Cloud)
Pour que tout le monde travaille sur la **mëme** base de données en temps réel :
1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Obtenez votre "Connection String" (ex: `mongodb+srv://user:pass@cluster...`).
3. Tout le monde met cette URL dans son fichier `.env` :
   ```env
   MONGODB_URI=mongodb+srv://...
   ```
