import { createRouter, createWebHistory } from 'vue-router';

// Importez vos composants/pages
import Connexion from '../components/ConnexionForm.vue';
import Register from '../components/RegisterForm.vue';
import Home from '../Home.vue';

// D�finissez les routes
const routes = [
    {
        path: '/',
        name: 'Connexion',
        component: Connexion, // Page de connexion
    },
    {
        path: '/home',
        name: 'Home',
        component: Home // Accueil
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: Register, // Page de cr�ation de compte
    },
];

// Cr�ez une instance du router
const router = createRouter({
    history: createWebHistory(), // Utilise l'historique du navigateur
    routes, // Passez les routes d�finies
});

export default router;
