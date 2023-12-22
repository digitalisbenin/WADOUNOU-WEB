<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-9 p-4"
  >
    <div v-if="filteredLivreur.length === 0">
      <div class="mt-6">
        <h3 class="font-bold text-gray-700 text-2xl mt-12">
          Votre profil n'est pas à jour. Veuillez le mettre à jour.
        </h3>
        <router-link to="/profils">
          <button
            class="text-gray-700 rounded-lg bg-green-500 px-8 py-2 text-xl mt-9"
          >
            Mettre à jour
          </button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-between pb-4">
        <div v-show="showAlert">
          <AlertComponent :content="alert.message" type-alert="error" />
        </div>
        <label for="table-search" class="sr-only">Rechercher</label>
        <div class="relative">
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
        <div class="ml-9 flex">
      <button
     
       class="text-gray-700 bg-blue-500 rounded-lg font-medium px-12 py-1"
         @click="filter = ''"
       >
        Tous
      </button>
      <button 
      @click="filter = 'En cours'"
      class="text-gray-700 bg-yellow-500 rounded-lg font-medium px-12 py-1 ml-4">
        En cours
      </button>
      <button
      @click="filter = 'suspended'"
       class="text-gray-700 bg-green-300 rounded-lg font-medium px-12 py-1 ml-4">
        suspended
      </button>
      <button 
      @click="filter = 'Terminer'"
       class="text-gray-700 bg-red-500 rounded-lg font-medium px-12 py-1 ml-4">
       Terminer
      </button>
      </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nom</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Nom restaurant</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(livraison, index) in filteredLivraisons"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ livraison.commande.name }}
            </th>
            <td class="px-6 py-4">{{ livraison.commande.adresse }}</td>
            <td class="px-6 py-4">{{ livraison.commande.contact }}</td>
            <td class="px-6 py-4">{{ livraison.livreur.name }}</td>

            <td class="px-6 py-4">
              <span
                v-if="livraison.status === 'En cours'"
                class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-blue-600 text-gray-900"
              >
                <span class="relative mr-1.5 flex h-2.5 w-2.5">
                  <span
                    class="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400"
                  >
                  </span>
                </span>
                {{ livraison.status }}
              </span>
              <span
                v-if="livraison.status === 'suspended'"
                class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-red-600 text-gray-900"
              >
                <span class="relative mr-1.5 flex h-2.5 w-2.5"
                  ><span
                    class="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400"
                  ></span
                ></span>
                {{ livraison.status }}</span
              >
              <span
                v-if="livraison.status === 'Terminer'"
                class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-green-600 text-gray-900"
              >
                <span class="relative mr-1.5 flex h-2.5 w-2.5">
                  <span
                    class="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400"
                  >
                  </span>
                </span>
                {{ livraison.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ livraison.livreur.name }}</td>
           <!-- <td class="flex items-center px-6 py-4 space-x-3">
              <label
                class="flex items-center relative w-max cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
                />

                <span
                  class="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200"
                />
              </label>
            </td>-->
            <td 
             class="flex items-center px-6 py-4 space-x-3">
            <button
              class="text-red-500 hover:bg-gray-100 hover:rounded-lg font-medium"
              @click="deleteCommandeModal()"
            >
              <span class="flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 pr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd"
                  />
                </svg>
                Supprimer
              </span>
            </button>
            <router-link
            
              class="text-green-500 hover:bg-gray-100 hover:rounded-lg font-medium"
              :to="`/commandeDetail/${livraison.commande.id}`"
            >
              <span class="flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Détail
              </span>
            </router-link>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteLivraisonModal"
    @cancel="showDeleteLivraisonModal = !showDeleteLivraisonModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer cet livraison </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivraison"
    @close-modal="showModalLivraison = false"
  >
    <template #header> Ajouter une Livraison</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="livraison()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" v-model="addform.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Adresse" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.addrese"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
                  <BaseInput
                    id="language"
                    v-model="addform.description"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Status" />

                  <select
                    id="compagnie"
                    v-model="addform.status"
                    class="rounded border border-gray-300 mt-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 px-9"
                    placeholder="status"
                  >
                    <option value="En cours">En cours</option>
                    <option value="suspended">Suspend</option>
                    <option value="Terminer">Terminer</option>
                  </select>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Choisissez la commande" />
                  <select
                    name="restaurant"
                    id="restaurant"
                    v-model="addform.commande_id"
                    class="block w-full p-2 border mt-2 border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  >
                    <option
                      v-for="(commande, index) in commandes"
                      :key="index"
                      :value="commande.id"
                    >
                      {{ commande.name }}
                    </option>
                    <!-- Ajoutez plus d'options au besoin -->
                  </select>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Choisissez le livreur" />
                  <select
                    name="restaurant"
                    id="restaurant"
                    v-model="addform.livreur_id"
                    class="block w-full p-2 border mt-2 border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  >
                    <option
                      v-for="(livreur, index) in livreurs"
                      :key="index"
                      :value="livreur.id"
                    >
                      {{ livreur.name }}
                    </option>
                    <!-- Ajoutez plus d'options au besoin -->
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter
        @cancel="showModalLivraison = false"
        @send="livraison()"
      />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivraisonUpdate"
    @close-modal="showModalLivraisonUpdate = false"
  >
    <template #header> Mettre à jour une Livraison</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addContact()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput
                    id="nom"
                    v-model="addform.first_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Adresse" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.last_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
                  <BaseInput
                    id="language"
                    v-model="addform.language"
                    class="mt-2"
                  />
                </div>

                <BaseLabel value="Status" />
                <div class="mt-auto">
                  <select
                    id="compagnie"
                    class="rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 px-9"
                    :placeholder="status"
                  >
                    <option>En cours</option>
                    <option>Suspend</option>
                    <option>Terminer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter
        @cancel="showModalLivraisonUpdate = false"
        @send="addContact()"
      />
    </template>
  </TheModal>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "LivraisonDash",
  components: {
    AlertComponent,
    DeleteModalFooter,
    TheModal,
    BaseLabel,
    BaseInput,
    AddModalFooter,
  },
  data() {
    return {
      addform: {
        name: "",
        livreur_id: "",
        address: "",
        commande_id: "",
        description: "",
        phone: "",
        status: "",
      },
      showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteLivraisonModal: false,
      showModalLivraison: false,
      showModalLivraisonUpdate: false,
      user: "",
      livraisons: [],
      commandes: [],
      livreurs: [],
      filter: "",
    };
  },
  created() {
    this.profile();
    this.getLivraison();
    this.getCommande();
    this.getLivreur();
  },
  computed: {
    filteredLivreur() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.livreurs.filter((livreurs) => {
        const name = livreurs.user.id.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },
    filteredLivraisons() {
      // Vérifiez si filteredRestaurant n'est pas vide
      if (this.filteredLivreur.length > 0) {
        // Sélectionnez le premier élément de filteredRestaurant
        const selectedRestaurant = this.filteredLivreur[0];

        // Assurez-vous que selectedRestaurant et son id sont définis avant de les utiliser
        const searchTerm = selectedRestaurant.id.toLowerCase();
        // Filtrez les menus basés sur l'ID du restaurant si celui-ci est défini
        const filtered_data = this.livraisons.filter((livraisons) => {
          const restaurantId = livraisons.livreur.id.toLowerCase();
          return restaurantId.includes(searchTerm);
        });

        return filtered_data;
      } else {
        // Retournez tous les menus si filteredRestaurant est vide
        return this.livraisons;
      }
    },
  },
  methods: {
    deleteLivraisonModal() {
      this.showDeleteLivraisonModal = !this.showDeleteLivraisonModal;
    },
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.user = response.data.id;
          this.filter = response.data.id;
          console.log(this.user);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async getLivraison() {
      try {
        const response = await axios.get("/api/livraisons");
        if (response.data) {
          this.livraisons = response.data.data;
          console.log(this.livraisons);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async getLivreur() {
      try {
        const response = await axios.get("/api/livreurs");
        if (response.data) {
          this.livreurs = response.data.data;
          console.log(this.livreurs);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async getCommande() {
      try {
        const response = await axios.get("/api/commandes");
        if (response.data) {
          this.commandes = response.data.data;
          console.log(this.commandes);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async livraison() {
      try {
        const response = await axios.post("/api/livraisons", this.addform);
        if (response.status == 201) {
          console.log(response);
          this.showModalLivraison = !this.showModalLivraison;
          this.addform = {};
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre commande est affecter au livreur avec succés",
            timeout: 5000,
          }).show();
          this.getLivraison();
        } else {
          this.showModalLivraison = !this.showModalLivraison;
          this.showAlert = true;
          this.alert.message =
            "Quelque chose c'est mal passé. Merci d'essayer plus tard!";
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      } catch (error) {
        if (error.response.status !== 500) {
          this.showAlert = true;
          this.alert.message =
            "Quelque chose c'est mal passé. Merci d'essayer plus tard!";
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      }
    },
  },
};
</script>
<style scoped>
/* Ajoutez des styles personnalisés pour le slider ici */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input:checked {
  background-color: #22c55e; /* bg-green-500 */
}

input:checked ~ span:last-child {
  --tw-translate-x: 1.75rem; /* translate-x-7 */
}
</style>