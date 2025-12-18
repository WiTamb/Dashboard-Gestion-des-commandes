# 🚀 Guide de Déploiement Gratuit (MEAN Stack)

Il n'est pas possible de tout héberger sur GitHub Pages (car c'est statique). Voici la solution 100% gratuite :

1.  **Frontend (Angular)** -> **GitHub Pages**
2.  **Backend (Node/Express)** -> **Render.com** (Gratuit)
3.  **Base de Données** -> **MongoDB Atlas** (Gratuit)

---

## Étape 1 : Metttre le Code sur GitHub
(Voir les instructions "Push to Git" déjà données)

## Étape 2 : La Base de Données (MongoDB Atlas)
1.  Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/atlas).
2.  Créez un Cluster (choisissez "Shared" -> "Free").
3.  Dans "Database Access", créez un utilisateur (ex: `admin_db` / `motdepasse`).
4.  Dans "Network Access", ajoutez l'IP `0.0.0.0/0` (pour autoriser l'accès depuis partout).
5.  Cliquez sur "Connect" -> "Drivers" et copiez l'URL (ex: `mongodb+srv://...`).

## Étape 3 : Le Backend (Render.com)
1.  Créez un compte sur [Render](https://render.com).
2.  Cliquez sur **"New" -> "Web Service"**.
3.  Connectez votre compte GitHub et sélectionnez votre repo `mean`.
4.  **Paramètres :**
    -   **Root Directory :** `backend`
    -   **Build Command :** `npm install`
    -   **Start Command :** `npm start`
5.  **Environment Variables (Important!) :**
    -   Ajoutez `MONGODB_URI` avec l'URL copiée à l'étape 2.
    -   Ajoutez `JWT_SECRET` avec une clé secrète.
6.  Cliquez sur **"Create Web Service"**.
7.  Une fois déployé, copiez l'URL de votre backend (ex: `https://mon-app-backend.onrender.com`).

## Étape 4 : Le Frontend (Lier le tout)
1.  **Ouvrez le projet localement.**
2.  Modifiez `frontend/src/environments/environment.prod.ts` :
    ```typescript
    export const environment = {
      production: true,
      apiUrl: 'https://VOTRE-URL-RENDER.com/api' // Collez l'URL de l'étape 3
    };
    ```
3.  **Poussez les modifications sur GitHub :**
    ```bash
    git add .
    git commit -m "Config production"
    git push
    ```

## Étape 5 : Déployer le Frontend (GitHub Pages)
1.  Dans votre terminal `frontend` :
    ```bash
    npm install -g angular-cli-ghpages
    ng build --configuration=production --base-href "https://VOTRE-USER.github.io/VOTRE-REPO/"
    npx angular-cli-ghpages --dir=dist/frontend/browser
    ```
2.  Votre site est en ligne ! 🌍
