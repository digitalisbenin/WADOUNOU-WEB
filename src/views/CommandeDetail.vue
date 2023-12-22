<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-9 p-4"
  >
    <div class="flex  justify-between pb-4">
      <div v-show="showAlert">
        <AlertComponent :content="alert.message" type-alert="error" />
      </div>
      <label for="table-search" class="sr-only">Rechercher</label>
      <div class="relative hidden md:block">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          wire:model="search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Rechercher ..."
        />
      </div>
      
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Repas Nom</th>
          <th scope="col" class="px-6 py-3">Quantité</th>
          <th scope="col" class="px-6 py-3">Montant</th>
          
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(commande, index) in filteredLigneCommande"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ commande.repas.name }}
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ commande.quantite.split(".")[0] }}
          </th>
          <td class="px-6 py-4">
            {{ commande.montant.split(".")[0] }}FCFA 
          </td>
          
          
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteCommandeModal"
    @cancel="showDeleteCommandeModal = !showDeleteCommandeModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer cet commande </template>
  </DeleteModalFooter>

</template>
<script>
import axios from "axios";
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "CommandeDash",
  components: {
    AlertComponent,
    DeleteModalFooter,

  },
  data() {
    return {
      
      sendform: {
        livreur_id: "",
        commande_id: "",
        status: "En cours",
      },
      showAlert: false,
      alert: {
        message: "",
      },

      Lignecommandes: [],
      filteredRestaurants: [],
      user: "",
      restaurant_id: "",
      filter: "",
    };
  },
  mounted() {
    this.filter = this.$route.params.id;
  },
  created() {
    this.profile();
    this.getLigneommande();
  },
  computed: {

     filteredLigneCommande() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.Lignecommandes.filter((Lignecommandes) => {
        const name = Lignecommandes.commande.id.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },   
  },
  methods: {
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.user = response.data.id;
          console.log(this.user);
        }
      } catch (error) {
        console.log(error.data);
      }
    },

   
    async getLigneommande() {
      try {
        const response = await axios.get("/api/lignecommandes");
        if (response.data) {
          this.Lignecommandes = response.data.data;
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    
  },
};
</script>