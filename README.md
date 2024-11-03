# Task-Management-System-To-Do-List
Une application de gestion de tâches permettant d’ajouter, de rechercher, de filtrer et de prioriser les tâches en utilisant Html, CSS et Javascript.

### Rapport de Projet - Application de Gestion de Tâches

---

### Introduction

Ce projet consiste en la création d'une application de gestion de tâches utilisant HTML, CSS (avec Tailwind CSS), et JavaScript. L'application permet aux utilisateurs de créer, modifier, supprimer et afficher leurs tâches avec des options de tri et de filtrage. Les données sont enregistrées en local grâce à `localStorage`, permettant ainsi de conserver les tâches entre les sessions.

---

### Fonctionnalités

- **Ajouter une tâche** : Création d'une nouvelle tâche avec titre, dates de début et de fin, statut, priorité et description.
  (![Code pour la Fonction pour ajouter une nouvelle tâche](/assets/imgs/image.png))
- **Afficher les tâches** : Affichage de chaque tâche dans une section correspondant à son statut.
  ![code pour la Fonction pour afficher une nouvelle tâche](/assets/imgs/image-1.png)
- **Modifier une tâche** : Affichage des informations de la tâche dans un formulaire de modification.
  ![Code pour la Fonction pour modifier une tâche](/assets/imgs/image-2.png)
- **Supprimer une tâche** : Suppression d'une tâche de l'affichage et de `localStorage`.
![Code pour la Fonction pour supprimer une tâche](/assets/imgs/image-3.png)
- **Drag-and-drop** : Déplacement des tâches entre les différentes sections.
- **Filtrage des tâches** : trier les tâches selon la méthode selecté.

---

### Structure des Fichiers et Dossiers

- **assets/**
  - *js/*
      - `script.js` : Contient la logique JavaScript du site.
  - *css/*
      - `output.css` : Fichier de style pour la mise en page avec Tailwind CSS.
  - *imgs/*
      - Contient les images utilisé pour le site.

- **vues/**
  - `index.html` : Fichier principal de l'application, contenant la structure HTML.

---

### Instructions pour l'Utilisation

1. **Installation** : Cloner le dépôt et ouvrir `index.html` dans le navigateur.
2. **Utilisation** : 
   - Ajouter une tâche via le formulaire en cliquant sur **Ajouter une tâche**.
   - Gérer chaque tâche avec les options de **Modifier** et **Supprimer**.
   - Réorganiser les tâches par glisser-déposer.

---

### Technologies Utilisées

- **HTML** : Structure de la page web.
- **CSS avec Tailwind** : Mise en page et stylisation.
- **JavaScript** : Gestion des événements et des tâches (ajout, modification, suppression).
- **Local Storage** : Sauvegarde locale des tâches.

---

### Remerciements

Nous tenons à exprimer notre gratitude envers notre formateur, [Houssni Ouchad], et toute l’équipe de **YouCode School** pour leur accompagnement et leurs conseils durant ce projet.

--- 

### Auteur

Créé par [Nmissi Nadia][[@nmissi-nadia](https://github.com/nmissi-nadia)], étudiant à YouCode School.