# Utiliser l'image Node officielle
FROM node:18-alpine

# Créer le répertoire de l'app
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]

