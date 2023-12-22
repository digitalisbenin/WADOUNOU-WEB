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
      <div class=" mt-2 ml-4 lg:mt-0 lg:ml-0">
        <button
          class="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="showModalLivreur = true"
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
          <th scope="col" class="px-6 py-3">Adresse</th>
          <th scope="col" class="px-6 py-3">Phone</th>
          <th scope="col" class="px-6 py-3">Position</th>
          <th scope="col" class="px-6 py-3">Status</th>
          
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(livreur, index) in livreurs"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ livreur.name }}
          </th>
          <td class="px-6 py-4">{{ livreur.description }}</td>
          <td class="px-6 py-4">{{ livreur.adresse }}</td>
          <td class="px-6 py-4">{{ livreur.phone }}</td>
          <td class="px-6 py-4">{{ livreur.position }}</td>
           <td class="px-6 py-4">
            <span
              v-if="livreur.status === 'en cours livrason'"
              class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-blue-600 text-gray-900"
            >
              <span class="relative mr-1.5 flex h-2.5 w-2.5">
                <span
                  class="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400"
                >
                </span>
              </span>
              {{ livreur.status }}
            </span>
            <span
              v-if="livreur.status === 'occuper'"
              class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-red-600 text-gray-900"
            >
              <span class="relative mr-1.5 flex h-2.5 w-2.5"
                ><span
                  class="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400"
                ></span
              ></span>
              {{ livreur.status }}</span
            >
            <span
              v-if="livreur.status === 'disponible'"
              class="text-uppercase inline-flex items-center rounded-full px-2.5 py-1 text-sm bg-green-600 text-gray-900"
            >
              <span class="relative mr-1.5 flex h-2.5 w-2.5">
                <span
                  class="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400"
                >
                </span>
              </span>
              {{ livreur.status }}
            </span>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteLivreurModal"
    @cancel="showDeleteLivreurModal = !showDeleteLivreurModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer ce livreur </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivreur"
    @close-modal="showModalLivreur = false"
  >
    <template #header> Ajouter un Livreur</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addLivreur()">
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
                    v-model="addform.adresse"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Position" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.position"
                      placeholder="itta"
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
                  <BaseLabel value="Image" />
                  <BaseInput
                    id="image"
                    type="file"
                    @change="onFileChange"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="document(facultatif)" />
                  <BaseInput
                    id="pdf"
                    type="file"
                    @change="onFileChanges"
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
      <AddModalFooter @cancel="showModalLivreur = false" @send="addLivreur()" />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivreurUpdate"
    @close-modal="showModalLivreurUpdate = false"
  >
    <template #header> Mettre à jour un Livreur</template>

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
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-4">
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter
        @cancel="showModalLivreurUpdate = false"
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
import AlertComponent from "../components/AlertComponent.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
export default {
  name: "LivreurDash",
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
        adresse: "",
        phone: "",
        description: "",
        user_id: "",
        position: "",
        document_url: "",
        status: "disponible",
        image_url: "",
      },
    showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteLivreurModal: false,
      showModalLivreur: false,
      showModalLivreurUpdate: false,
      user: "",
      livreurs: [],
      filteredLivreurs:[],
    };
  },
  created() {
    this.profile();
    this.getLivreur();
  },
  methods: {
    deleteLivreurModal() {
      this.showDeleteLivreurModal = !this.showDeleteLivreurModal;
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
    addLivreur() {
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
            this.sendLivreur();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async sendLivreur() {
      try {
        this.addform.user_id = this.user;
        const response = await axios.post("/api/livreurs", this.addform);
        if (response.status == 201) {
          console.log(response);
         this.showModalLivreur =!this.showModalLivreur;
          this.addform ={};
            new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Votre profile livreur est créer avec succés',
            timeout: 5000,
          }).show( );
          this.getLivreur();
        }else {
          this.showModalLivreur =!this.showModalLivreur;
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