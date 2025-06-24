import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        debug: true,
        interpolation: { escapeValue: false },
        resources: {
            fr: {
                translation: {
                    homeTitle: 'Séries TV',
                    searchPlaceholder: 'Rechercher une émission...',
                    searchButton: 'Rechercher',
                    recentSearches: 'Dernières recherches',
                    next: 'Suivant',
                    prev: 'Précédent',
                    noResults: 'Aucun résultat.',
                    showDetails: 'voir Détails',
                    comments: 'Commentaires',
                    addComment: 'Ajouter un commentaire...',
                    send: 'Envoyer',
                    addFavorite: '☆ Ajouter aux favoris',
                    removeFavorite: '★ Retirer des favoris',
                    favorites: 'Mes Séries Favorites',
                    login: 'Connexion',
                    register: 'Inscription',
                    email: "Adresse email",
                    password: "Mot de passe",
                    loginError: "Échec de la connexion. Vérifiez vos identifiants.",
                    confirmPassword: "Confirmer le mot de passe",
                    registerError: "Erreur lors de l'inscription.",
                    themeLight: "Clair",
                    themeDark: "Sombre",
                    Episodes: "Épisodes",
                    saisons: "Saisons",
                    Début: "Début",
                    DernierEp: "Dernier épisode ",
                    End: "Fin",
                    Durée: "Durée",
                    pop_text: "Vous devez créer un compte ou vous connecter pour ajouter des séries en favoris",
                    close: "Fermer",
                    authRequired: "Connexion requise ",
                    rate: "Note",
                    Pays: "Pays d'origine",
                    Network: "Réseau",
                    langue : "Langue originale",
                    genres: "Tous les genres",
                    noComments: "Pas encore de commentaires.",

                },
            },
            en: {
                translation: {
                    homeTitle: 'TV Shows',
                    searchPlaceholder: 'Search a show...',
                    searchButton: 'Search',
                    recentSearches: 'Recent searches',
                    next: 'Next',
                    prev: 'Previous',
                    noResults: 'No result.',
                    showDetails: 'Details',
                    comments: 'Comments',
                    addComment: 'Add a comment...',
                    send: 'Send',
                    addFavorite: '☆ Add to favorites',
                    removeFavorite: '★ Remove from favorites',
                    favorites: 'My Favorite Shows',
                    login: 'Login',
                    register: 'Register',
                    email: "email",
                    password: "Password",
                    confirmPassword: "Confirmed password",
                    Episodes: "Episodes",
                    saisons: "Seasons",
                    Début: "started date",
                    DernierEp: "Lastest episode ",
                    End: "End",
                    Durée: "Duration",
                    close: "Close",
                    authRequired: "authorization Required",
                    pop_text: "You need to login or register to add shows to favorite",
                    rate: "Rating",
                    Pays: "Country",
                    Network: "Network",
                    langue : "VOD Language",
                    genres:"All genres",
                    noComments: "no Comments.",



                },
            },
        },
    });

export default i18n;
