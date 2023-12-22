<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mt-9"
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
      <div class=" mt-2 ml-4 lg:mt-0 lg:ml-0">
        <button
          class="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="showModalRepas = true"
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
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Prix</th>
          <th scope="col" class="px-6 py-3">Category</th>
          
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="(repas, index) in repass"
                      :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{repas.name}}
          </th>
          <td class="px-6 py-4"> {{repas.description}}</td>
          <td class="px-6 py-4"> {{repas.prix}}FCFA</td>
          <td class="px-6 py-4"> {{repas.categoris.name}}</td>

          
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteRepasModal"
    @cancel="showDeleteRepasModal = !showDeleteRepasModal"
    @delete="deleteRepas()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer ce repas </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepas"
    @close-modal="showModalRepas = false"
  >
    <template #header> Ajouter un Repas</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addRepas()">
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
                  <BaseLabel value="Prix" />
                  <div class="flex">
                  <BaseInput
                    id="prenom"
                    v-model="addform.prix"
                    class="mt-2"
                  />
                  <span class="mt-4 ml-1">FCFA</span>
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
                  <BaseLabel value="Choisissez une Category" />
                  <select
                    name="category"
                    id="category"
                    v-model="addform.categoris_id"
                    class="block w-full p-2 border mt-2 border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  >
                    <option
                      v-for="(category, index) in categorys"
                      :key="index"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                    <!-- Ajoutez plus d'options au besoin -->
                  </select>
                </div>
                 <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Image" />
                  <BaseInput
                    id="image"
                    type="file"
                    @change="onFileChange"
                    class="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter @cancel="showModalRepas = false" @send="addRepas()" />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepasUpdate"
    @close-modal="showModalRepasUpdate = false"
  >
    <template #header> Mettre à jour le Repas</template>

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
                  <BaseLabel value="Prix" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.last_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Type" />
                  <div class="relative mt-1">
                    <BaseInput v-model="phone" class="mt-2" />
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
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Image" />
                  <BaseInput
                    id="language"
                    type="file"
                    v-model="addform.language"
                    class="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter @cancel="showModalRepasUpdate = false" @send="addContact()" />
    </template>
  </TheModal>
</template>

<script>
import axios from "axios";
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { mapState } from "vuex";
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "RepasDash",
  components: {
    DeleteModalFooter,
    AlertComponent,
    TheModal,
    BaseLabel,
    BaseInput,
    AddModalFooter,
  },
  data() {
    return {
      addform: {
        categoris_id: "",
        name: "",
        description: "",
        prix: "",
        image_url: "",
        
      },
      showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteRepasModal: false,
      showModalRepas: false,
      showModalRepasUpdate: false,
      repass:[],
      user:"",
      filteredRestaurants: [],
      categorys: [],
    };
  },
  computed: {
    ...mapState({
      repas: (state) => state.repas.repas,
    }),
  },
  created() {
    this.fetchRepas();
    this.profile();
    this.getRepas();
    this.restaurant();
    this.getCategorys();
  },
  methods: {
      async profile() {
      try {
        const response = await axios.get(
          '/api/profile'
        );
       if (response.data) {
         this.user = response.data.id
        console.log(this.user);
        this.filterRestaurantsByUser(this.user);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
      async restaurant() {
      try {
        const response = await axios.get("/api/restaurants");
        if (response.data) {
          this.restaurants = response.data.data;
          console.log(this.restaurants);
          this.filteredRestaurants = this.restaurants.filter(
            (restaurant) => restaurant.user.id === this.user
          );
          console.log(this.filteredRestaurants);
        }
      } catch (error) {
        console.log(error.data);
      }
    },

     async getRepas() {
      try {
        const response = await axios.get(
          '/api/repas'
        );
       if (response.data) {
        this.repass = response.data.data;
        console.log(this.repass);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async fetchRepas() {
      this.processing = true;
      this.$store.dispatch("repas/fetchRepas").then(() => {
        this.processing = false;
      });
    },
     async getCategorys() {
      try {
        const response = await axios.get(
          '/api/categorys'
        );
       if (response.data) {
        this.categorys = response.data.data;
        console.log(this.categorys);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    deleteRepasModal() {
      this.showDeleteRepasModal = !this.showDeleteRepasModal;
    },
     addRepas() {
      const formData = new FormData();

      formData.append("file", this.image);

      axios
        .post("api/medias", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.addform.image_url = response.data.data.media_url;
            console.log(this.addform.image_url);
            this.sendRepas();
            
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async sendRepas() {
      try {
        this.addform.user_id = this.user;
        const response = await axios.post("/api/repas", this.addform );
        if (response.status ==201) {
          console.log(response);
          this.showModalRepas =!this.showModalRepas;
          this.addform ={};
            new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Votre Repas est créer avec succés',
            timeout: 5000,
          }).show( );
          this.getRepas();
        }
       else {
          //this.showModalRepas =!this.showModalRepas;
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
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
    },
  },
};
</script>