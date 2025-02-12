<template>
    <div class="flex items-center justify-between bg-white shadow-md h-18 px-4">
      <!-- Logo à gauche -->
      <div class="text-black text-2xl font-serif tracking-wide flex flex-row items-center gap-8">
        <h1>NEGOSUD</h1>

        <!-- Menu -->
        <ul class="flex flex-row gap-8 ml-8">
            <li v-for="menu in menus" :key="menu.name" class="mb-2">
            <button @click="setActiveItem(menu)" :class="[
                'flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none',
                menu.isActive ? 'border-b-2 border-b-rose-700' : 'hover:border-b-2 hover:border-b-rose-700'
            ]">
                <span class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                    <path :d="menu.path"/>
                </svg>
                <span>{{ menu.name }}</span>
                </span>
            </button>
            </li>
        </ul>
      </div>
  
  
      <!-- Icône et Bouton à droite -->
      <div class="flex items-center space-x-2">
        <div class="bg-red-800 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
          BL
        </div>
        <button class="text-gray-700 hover:text-black transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
          </svg>
        </button>
      </div>
    </div>
  
    <!-- Affichage du composant actif -->
    <component :is="activeComponent"></component>
  </template>
  
  <script>
  import Orders from './Orders.vue';
import Products from './Products.vue';
  
  export default {
    name: 'TopBar',
    data() {
      return {
        activeComponent: Products, // Composant actif par défaut
        menus: [
          {
            name: 'Produits',
            path: "M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h2v2zm0 1h2v2H4a1 1 0 0 1-1-1zm3 2v-2h3v2zm4 0v-2h3v1a1 1 0 0 1-1 1zm3-3h-3v-2h3zm-7 0v-2h3v2z",
            component: Products,
            isActive: true,
          },
          {
            name: 'Commande',
            path: "M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708",
            component: Orders,
            isActive: false,
          },
        ]
      }
    },
    methods: {
      setActiveItem(item) {
        this.menus.forEach(menu => menu.isActive = false)
        item.isActive = true
        this.activeComponent = item.component // Change le composant affiché
      }
    }
  }
  </script>
