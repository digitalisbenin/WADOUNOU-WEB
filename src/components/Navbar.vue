<template>
  <nav
    class="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center"
  >
    <div class="flex items-center justify-between">
      <div class="mb-4 md:mb-0">
        <img src="../assets/WADOUNOU.png" alt="Logo" class="h-16 w-auto" />
      </div>
      <!-- Mobile menu button -->
      <div @click="isOpen = !isOpen" class="flex md:hidden">
        <button
          type="button"
          class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          aria-label="toggle menu"
        >
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
    <div
      :class="isOpen ? 'flex' : 'hidden'"
      class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
    >
      <ul class="lg:flex space-x-4 text-2xl font-bold">
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/"
            >Acceuil</router-link
          >
        </li>
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/commande"
            >Commande</router-link
          >
        </li>
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/reservation"
            >Reservation</router-link
          >
        </li>
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/restaurant"
            >Restaurants</router-link
          >
        </li>
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/repas"
            >Repas</router-link
          >
        </li>
        <li>
          <router-link
            class="text-slate-950 hover:text-gray-500"
            active-class="text-green-600"
            to="/propos"
            >A propos</router-link
          >
        </li>
      </ul>
      <div
        v-if="this.user === ''"
        class="flex items-center lg:justify-end space-x-6 text-xl font-bold ml-16 lg:ml-0"
      >
        <router-link
          class="bg-green-600 px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          to="/auth/login"
        >
          Se connecter
        </router-link>
      </div>
      <div v-else>
        <div class="relative" @click="toggleDropdown">
          <div>
            <button
              type="button"
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img
                class="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>

          <!-- Dropdown menu -->
          <div
            v-show="isDropdownOpen"
            class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 font-bold"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
              >{{ this.name }}</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 font-bold"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
              >DashBoard</a
            >
            <button
              @click="logout()"
              class="block px-4 py-2 text-sm text-gray-700 font-bold"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
  

  <script>
import axios from "axios";
import TokenService from "../services/storage.service";
export default {
  name: "Navbar",
  data() {
    return {
      user: "",
      name: "",
      isDropdownOpen: false,
      isOpen: false,
      isconnetid:false,
    };
  },
  created() {
    this.profile();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    async logout() {
      try {
        const response = await axios.get("/api/logout");
        if (response.status === 204) {
          TokenService.removeToken();
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.name = response.data.name;
          this.user = response.data.id;
          console.log(this.user);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
  },
};
</script>



  