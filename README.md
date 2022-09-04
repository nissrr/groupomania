
# Groupomania - réseau social d'entreprise pour le Projet 7 d'Open ClassRoom
 
Ce projet consiste a crée un réseau social d'entreprise permettant de faciliter les interactions entre collègues.

### Pré-requis

Pour installer ce projet, vous aurez besoin de :

NODEJS
MYSQL

### Base de donnée

Créer une base de donnée nomée groupomania

### Cloner et installer

Cloner le projet

```bash
  git clone https://github.com/ClementBellier/P7-Groupomania
```

Dirigez vous vers le dossier suivant via le terminal :

```bash
  cd P7-Groupomania
```

Installer les packages nécessaires

```bash
  npm install
```

### Viarables d'environnement

Pour faire fonctionner ce projet, vous devez créer un fichier .env contenant toutes les variables d'environnement

Creer un fichier `.env`  dans le dossier `back` contenant les infos suivante : 

`SECRET_TOKEN` Votre Token Secret
`TOKEN_EXPIRED` Exemple : 24H 
`DB_NAME` groupomania  
`DB_USER` Nom de l'utilisateur ayant accés a la base de donnée  
`DB_PASS` Mot de passe de l'utilisateur 
`DB_HOST` localhost

### Utilisateur ADMIN

Pour permettre un utilisateur de devenir ADMIN, rendez vous dans la base de donée dans le tableau users, et a la colonne 'role' remplacer user par admin

### Démarrer le serveur

```bash
  cd ./back
  node server
```
Adresse de l'API : http://localhost:3000/

### Démarrer le front-end

Dans un autre terminal : 

```bash
  cd ./front
  npm run dev
```
Vous pouvez allez sur le lien suivant :  http://127.0.0.1:5173 et profiter de ce réseau social !