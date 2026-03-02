# 🚀 Dashboard CANCER IA - Guide d'Utilisation

## 📋 Vue d'ensemble

Ce projet implémente un système d'authentification complet avec une page de tableau de bord (Dashboard) qui s'affiche après la connexion réussie.

## 🎯 Fonctionnalités Principales

### 1. **Système d'Authentification**
- ✅ Page de connexion sécurisée
- ✅ Gestion des tokens d'authentification
- ✅ Protection des routes
- ✅ Déconnexion automatique

### 2. **Page Dashboard**
- ✅ Header avec logos CANCER IA et drapeau tunisien
- ✅ Message de bienvenue personnalisé
- ✅ Deux cartes interactives :
  - **Carte 1** : Ajouter un nouveau patient et effectuer l'analyse
  - **Carte 2** : Accéder à l'historique des patients
- ✅ Bouton "Suivant" pour continuer
- ✅ Bouton de déconnexion

### 3. **Navigation Intelligente**
- ✅ Redirection automatique après connexion
- ✅ Protection des routes sensibles
- ✅ Navigation fluide entre les pages

## 🛠️ Structure des Fichiers

```
seifkh/src/
├── components/
│   ├── ProtectedRoute.tsx     # Protection des routes
│   └── Loading.css            # Styles de chargement
├── hooks/
│   └── useAuth.ts             # Hook d'authentification
├── navigation/
│   └── navigationConfig.ts    # Configuration des routes
├── Dashboard.tsx              # Page principale du dashboard
├── Dashboard.css              # Styles du dashboard
├── Login.tsx                  # Page de connexion
└── App.tsx                    # Configuration des routes
```

## 🚀 Comment Utiliser

### 1. **Connexion**
1. Ouvrez l'application
2. Entrez vos identifiants (nom et mot de passe)
3. Cliquez sur "Se Connecter"
4. Vous serez automatiquement redirigé vers le Dashboard

### 2. **Navigation dans le Dashboard**
- **Carte "Nouveau Patient"** : Cliquez pour aller à l'ajout de patient
- **Carte "Historique"** : Cliquez pour voir l'historique des patients
- **Bouton "Suivant"** : Continue vers l'ajout de patient
- **Bouton "Déconnexion"** : Se déconnecte et retourne à la page de connexion

### 3. **Sécurité**
- Toutes les pages protégées nécessitent une authentification
- Les tokens sont stockés localement
- Déconnexion automatique si le token expire

## 🎨 Design et Responsivité

### **Desktop (≥992px)**
- Layout horizontal avec cartes côte à côte
- Header avec logos alignés horizontalement
- Espacement optimisé pour grands écrans

### **Tablette (768px - 991px)**
- Layout vertical adapté
- Cartes empilées
- Header réorganisé

### **Mobile (≤768px)**
- Design optimisé pour petits écrans
- Cartes en pleine largeur
- Boutons adaptés au tactile

## 🔧 Configuration Technique

### **Variables d'Environnement**
```bash
# Backend API
REACT_APP_API_URL=http://localhost:9000
```

### **Dépendances Requises**
```json
{
  "react-router-dom": "^6.x",
  "sonner": "^1.x"
}
```

## 🚨 Dépannage

### **Problème de Connexion**
1. Vérifiez que le backend est démarré sur le port 9000
2. Vérifiez vos identifiants
3. Regardez la console pour les erreurs

### **Problème de Navigation**
1. Vérifiez que toutes les routes sont définies dans App.tsx
2. Vérifiez que ProtectedRoute fonctionne correctement
3. Vérifiez les permissions d'authentification

### **Problème d'Affichage**
1. Vérifiez que tous les fichiers CSS sont importés
2. Vérifiez la responsivité dans les DevTools
3. Vérifiez que les images sont dans le bon dossier

## 🔮 Améliorations Futures

- [ ] Ajout de notifications push
- [ ] Gestion des rôles utilisateur
- [ ] Sauvegarde automatique des données
- [ ] Mode sombre/clair
- [ ] Internationalisation (i18n)
- [ ] Tests automatisés

## 📞 Support

Pour toute question ou problème :
1. Vérifiez ce README
2. Consultez la console du navigateur
3. Vérifiez les logs du backend
4. Contactez l'équipe de développement

---

**🎉 Félicitations ! Votre Dashboard CANCER IA est maintenant opérationnel !** 