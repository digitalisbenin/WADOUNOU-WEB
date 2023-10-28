<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-9 p-4"
  >
    <div class="flex items-center justify-between pb-4">
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
            {{ livraison.name }}
          </th>
          <td class="px-6 py-4">{{ livraison.addrese }}</td>
          <td class="px-6 py-4">{{ livraison.phone }}</td>
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
            <a
              class="text-blue-600 font-medium hover:bg-gray-100 hover:rounded-lg"
              href="#"
              @click="showModalLivraisonUpdate = true"
            >
              <span class="flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 pr-2"
                >
                  <path
                    d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                  />
                  <path
                    d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                  />
                </svg>
                Modifier
              </span>
            </a>
            <button
              class="text-red-500 hover:bg-gray-100 hover:rounded-lg font-medium"
              @click="deleteLivraisonModal()"
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
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
export default {
  name: "LivraisonDash",
  components: {
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
      alert: {
        type: "",
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
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>