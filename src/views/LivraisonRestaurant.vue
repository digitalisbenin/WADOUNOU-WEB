<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-9 p-4"
  >
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
      <div>
        <button
          class="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="showModalLivraison = true"
        >
          Ajouter
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
          <th scope="col" class="px-6 py-3">Nom livreur</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(livraison, index) in livraisons"
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
          <td class="flex items-center px-6 py-4 space-x-3">
           
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
             
          </td>
        </tr>
      </tbody>
    </table>
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
                  <BaseInput
                    id="nom"
                    v-model="addform.name"
                    class="mt-2"
                  />
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
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
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
      livreurs:[],
      
    };
  },
  created() {
    this.profile();
    this.getLivraison();
    this.getCommande();
    this.getLivreur();
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
          console.log(this.user);
          this.filterRestaurantsByUser(this.user);
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
        const response = await axios.get(
          '/api/livreurs'
        );
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
          this.showModalLivraison =!this.showModalLivraison;
          this.addform ={};
            new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Votre commande est affecter au livreur avec succés',
            timeout: 5000,
          }).show( );
          this.getLivraison();
        }else {
         this.showModalLivraison =!this.showModalLivraison;
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