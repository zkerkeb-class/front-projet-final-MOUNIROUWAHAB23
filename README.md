



Projet : 📺 TVShowApp

Le projet consiste globalement en la conception d'une App web de catalogue de Séries et émissions télévisés et leurs informations respectives.




**Nom Prénom** : Mounirou wahab

---

## ✅ Liste des fonctionnalités principales

- 🔍 **Recherche de séries** avec suggestions récentes
- 🧠 **Filtrage par genre** (Action, Science-Fiction, Comédie, etc.)
- 🗂️ **Affichage des séries populaires** avec pagination dynamique
- 📄 **Fiche détail d’une série** avec :
  - Poster + image backdrop
  - Description, statut, date de début/fin, genres, langue, note
- 📅 **Liste des saisons et épisodes** sous forme d’accordéon scrollable
- 💬 **Section commentaires** (authentification requise)
- ❤️ **Ajout / Retrait des favoris** (authentification requise)
- 👤 **Connexion / inscription des utilisateurs**
- 🌙 **Mode sombre / clair**
- 🌐 **Support multilingue** (Français 🇫🇷 / Anglais 🇺🇸)
- 📱 **Responsive design** (mobile, tablette, desktop)

---

## 🎁 Liste des bonus

- 🔐 **Pop-up d’authentification requise** si interaction non autorisée
- 📌 **Historique des recherches récentes** (5 dernières)
- 🌈 **Icônes modernes** (paramètres, favoris, thème, langue)
- 🖼️ **Image placeholder personnalisée** pour les séries sans visuel
- 🧩 **Composants stylisés et modulaires**
- 🧭 **Menu paramètres déroulant (profil, logout, thème, langue)**
- 🖱️ **Effets de hover modernes** sur boutons et sélection
- 🔄 **Scroll personnalisé** pour les listes longues (infos, saisons)
- 🧪 **Gestion optimisée des performances côté filtrage**
- 🧼 **Suppression des marges inutiles et bug UI**



⚙️ Prérequis
Assurez-vous d’avoir installé sur votre machine :

Node.js (v18+ recommandé)

npm ou yarn

Une base de données MongoDB (locale ou MongoDB Atlas)

(optionnel) Postman pour tester les routes API



💻 Installation


1.Cloner les dépôts :

front : git clone  https://github.com/zkerkeb-class/front-projet-final-MOUNIROUWAHAB23.git
back : git clone https://github.com/zkerkeb-class/projet-final-back-MOUNIROUWAHAB23.git

2.Configurer les variables d’environnement :

Créez un fichier .env dans /backend contenant :

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db
JWT_SECRET=tonSecretJWT


2.🖥️ Lancer le Back-End (API Express)

npm install
npm run dev

Serveur lancé sur http://localhost:5000

3.🌐 Lancer le Front-End (React + Vite)

npm install
npm run dev

L’application React est disponible sur http://localhost:5173


