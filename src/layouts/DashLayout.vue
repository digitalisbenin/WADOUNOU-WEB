<template>
  <div class="flex h-screen">
    <!-- Barre latérale -->
    <div class="w-1/7 shadow-2xl bg-gray-800 text-white">
      <!-- Logo du tableau de bord -->
      <div class="flex items-center justify-between">
        <router-link class="flex items-center" to="/">
          <img
            src="../assets/WADOUNOU.png"
            alt="Logo"
            class="h-24 mt-4 w-auto"
          />
        </router-link>
        <div @click="isOpen = !isOpen" class="flex md:hidden">
          <button
            type="button"
            class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            aria-label="toggle menu"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current bg-white">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        :class="isOpen ? 'flex' : 'hidden'"
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <!-- Menu de la barre latérale -->
        <ul v-if="this.user === this.role_id" class="py-4">
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/repasdash"
              >Repas</router-link
            >
          </li>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/categorys"
              >Categories</router-link
            >
          </li>
          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>

          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/menudash"
              >Mon menus</router-link
            >
          </li>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/restaurantdash"
              >Mon restaurants</router-link
            >
          </li>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/reservationDash"
              >Mes reservations</router-link
            >
          </li>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/commandeDash"
              >Mes Commandes</router-link
            >
          </li>

          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/livreurDash"
              >Livreurs</router-link
            >
          </li>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/livraisonResto"
              >Livraisons</router-link
            >
          </li>
          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/"
              >Aller au site</router-link
            >
          </li>
        </ul>
        <ul v-else class="py-4">
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/livraisonDash"
              >Livraisons</router-link
            >
          </li>
          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/profils"
              >Profils</router-link
            >
          </li>

          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
          <li class="px-4 py-2 hover:bg-gray-600">
            <router-link
              class="text-slate-950 hover:text-gray-300"
              active-class="text-green-600"
              to="/"
              >Aller au site</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Contenu du tableau de bord -->
    <div class="w-full p-4">
      <slot />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",

  data() {
    return {
      user: "",
      role_id: "",
      isOpen: false,
    };
  },
  created() {
    this.profile();
    this.role();
  },
  methods: {
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) console.log(response.data);
        {
          this.user = response.data.role_id;
          console.log(this.user);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async role() {
      try {
        const response = await axios.get("/api/roles");
        if (response.data) {
          console.log(response.data);
          this.role_id = response.data.data[1].id;
          console.log(this.role_id);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
  },
};
</script>
