<template>
  
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4">
    <div v-show="showAlert">
    <AlertComponent :content="alert.message" type-alert="error" />
  </div>
    <div class="flex items-center justify-between pb-4">
      <label for="table-search" class="sr-only">Rechercher</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        ></div>
      </div>
      <div>
        <button
          class="text-white hover:bg-gray-500 rounded-lg font-medium bg-green-700 mr-4"
          @click="MenuModal(restaurant.id)"
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
            Ajouter un menu
          </span>
        </button>
      </div>
    </div>
    <div v-if="filteredRestaurant.length === 0">
      <form action="#" method="POST" @submit.prevent="addRestaurant()">
        <div>
          <div class="px-4 py-5 bg-white p-6">
            <div class="flex">
              <div class="w-2/3 mr-9">
                <BaseLabel value="Nom du restaurant" class="text-left font-bold" />
                <BaseInput id="nom" v-model="addform.name" class="mt-1" />
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Ville" class="text-left mt-2 font-bold" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.ville"
                    class="mt-1"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Adresse" class="text-left mt-2 font-bold" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.adresse"
                    class="mt-1"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Téléphone"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.phone"
                      placeholder="62333333"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Capacité"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.capacite"
                      placeholder="100"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Spécialité"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.specilite"
                      
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Photo de profil"
                    class="text-left mt-2 font-bold"
                  />
                  <BaseInput
                    id="image"
                    type="file"
                    @change="onFileChange"
                    class="mt-1"
                  />
                </div>
              </div>
              <div class="w-1/3 mt-4">
                <img
                  src="../assets/profil_defaut-1-450x450.png"
                  alt="Logo"
                  class="w-full h-full"
                />
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mr-2">
                <BaseLabel
                  value="Heure d'ouverture"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  type="time"
                  id="time"
                  v-model="addform.heure_douverture"
                  class="mt-2"
                />
              </div>
              <div class="w-1/2 ml-2">
                <BaseLabel
                  value="Heure de fermeture"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  type="time"
                  id="time"
                  v-model="addform.heure_fermeture"
                  class="mt-2"
                />
              </div>
            </div>
            <div class="col-span-8 sm:col-span-8">
              <BaseLabel
                value="Pièce d'identité"
                class="text-left mt-2 font-bold"
              />
              <BaseInput
                id="image"
                type="file"
                @change="onFileChanges"
                class="mt-1"
              />
            </div>
            <div class="col-span-8 sm:col-span-8">
              <BaseLabel
                value="Description "
                class="text-left mt-2 font-bold"
              />
              <div class="mt-1">
                <textarea
                  class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  v-model="addform.description"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          class="bg-green-600 text-white px-8 py-2 focus:outline-none rounded-lg mt-2 transform transition duration-300"
        >
          Mettre à jour
        </Button>
      </form>
    </div>
    <div v-else>
      <form action="#" method="POST" @submit.prevent="UpdateRestaurant()">
        <div>
          <div
            v-for="(livreur, index) in filteredRestaurant"
            :key="index"
            class="px-4 py-5 bg-white p-6"
          >
            <div class="flex">
              <div class="w-2/3 mr-9">
                <BaseLabel value="Nom du restaurant" class="text-left font-bold" />
                <BaseInput id="nom" v-model="livreur.name" class="mt-1" />
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Ville" class="text-left mt-2 font-bold" />
                  <BaseInput
                    id="prenom"
                    v-model="livreur.ville"
                    class="mt-1"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Adresse" class="text-left mt-2 font-bold" />
                  <BaseInput
                    id="prenom"
                    v-model="livreur.adresse"
                    class="mt-1"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Téléphone"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="livreur.phone"
                      placeholder="62333333"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Capacité"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="livreur.capacite"
                      placeholder="62333333"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Spécialité"
                    class="text-left mt-2 font-bold"
                  />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="livreur.specilite"
                      placeholder="62333333"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel
                    value="Photo de profil"
                    class="text-left mt-2 font-bold"
                  />
                  <BaseInput
                    id="image"
                    type="file"
                    @change="onFileChange"
                    class="mt-1"
                  />
                </div>
              </div>
              <div class="w-1/3 mt-4">
                <img class="w-full h-96" :src="livreur.image_url" alt="" />
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mr-2">
                <BaseLabel
                  value="Heure d'ouverture"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  type="time"
                  id="time"
                  v-model="livreur.heure_douverture"
                  class="mt-2"
                />
              </div>
              <div class="w-1/2 ml-2">
                <BaseLabel
                  value="Heure de fermeture"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  type="time"
                  id="time"
                  v-model="livreur.heure_fermeture"
                  class="mt-2"
                />
              </div>
            </div>
            <div class="col-span-8 sm:col-span-8">
              <BaseLabel
                value="Pièce d'identité"
                class="text-left mt-2 font-bold"
              />
              <BaseInput
                id="image"
                type="file"
                @change="onFileChanges"
                class="mt-1"
              />
            </div>
            <div class="col-span-8 sm:col-span-8">
              <BaseLabel
                value="Description "
                class="text-left mt-2 font-bold"
              />
              <div class="mt-1">
                <textarea
                  class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  v-model="livreur.description"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          class="bg-green-600 text-white px-8 py-2 focus:outline-none rounded-lg mt-2 transform transition duration-300"
        >
          Mettre à jour
        </Button>
      </form>
    </div>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteRestaurantModal"
    @cancel="showDeleteRestaurantModal = !showDeleteRestaurantModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer ce restaurant </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRestaurant"
    @close-modal="showModalRestaurant = false"
  >
    <template #header> Ajouter un Restaurant</template>

    <template #body>
      <form
        action="#"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="addRestaurant()"
      >
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom complet" />
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
                  <BaseLabel value="Specialité" />
                  <BaseInput
                    id="nom"
                    v-model="addform.specilite"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Capacité" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.capacite"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Heure d'ouverture" />
                  <BaseInput
                    type="time"
                    id="time"
                    v-model="addform.heure_douverture"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Heure de fermeture" />
                  <BaseInput
                    type="time"
                    id="time"
                    v-model="addform.heure_fermeture"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.phone"
                      type="phone"
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
      <AddModalFooter
        @cancel="showModalRestaurant = false"
        @send="addRestaurant()"
      />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepas"
    @close-modal="showModalRepas = false"
  >
    <template #header> Ajouter un Menu</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addMenu()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Choisissez un repas" />
                  <select
                    name="category"
                    id="category"
                    v-model="addforms.repas_id"
                    class="block w-full p-2 border mt-2 border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  >
                    <option
                      v-for="(repas, index) in repass"
                      :key="index"
                      :value="repas.id"
                    >
                      {{ repas.name }}
                    </option>
                    <!-- Ajoutez plus d'options au besoin -->
                  </select>
                </div>
                <div class="col-span-8 sm:col-span-4 mt-6">
                  <button
                    class="inline-flex text-white bg-blue-700 mt-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="showModalRepasCreate = true"
                  >
                    Ajouter
                  </button>
                </div>

                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Prix" />
                  <BaseInput id="prenom" v-model="addforms.prix" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
                  <textarea
                    class="block w-full p-2 border mt-2 border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                    v-model="addforms.description"
                    autocomplete="current-password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter @cancel="showModalRepas = false" @send="addMenu()" />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepasCreate"
    @close-modal="showModalRepasCreate = false"
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
                  <BaseInput id="nom" v-model="addsend.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Prix" />
                  <div class="flex">
                    <BaseInput
                      id="prenom"
                      v-model="addsend.prix"
                      class="mt-2"
                    />
                    <span class="mt-4 ml-1">FCFA</span>
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
                  <BaseInput
                    id="language"
                    v-model="addsend.description"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Choisissez une Category" />
                  <select
                    name="category"
                    id="category"
                    v-model="addsend.categoris_id"
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
                    @change="onFileChangeRepas"
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
        @cancel="showModalRepasCreate = false"
        @send="addRepas()"
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
  name: "RestaurantDash",
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
      form: {
        email: "",
        password: "",
        // local: null,
      },
      addform: {
        name: "",
        ville: "",
        adresse: "",
        phone: "",
        description: "",
        abonnement_id: "",
        user_id: "",
        image_url: "",
        specilite: "",
        heure_douverture: "",
        heure_fermeture: "",
        document_url: "",
        capacite: "",
      },
      addsend: {
        categoris_id: "",
        name: "",
        description: "",
        prix: "",
        image_url: "",
      },
      addforms: {
        restaurant_id: "",
        name: "*",
        description: "",
        prix: "",
        repas_id: "",
      },
      showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteRestaurantModal: false,
      showModalRestaurant: false,
      showModalRestaurantUpdate: false,
      showModalRepasCreate: false,
      showModalRepas: false,
      filteredRestaurants: [],
      restaurants: [],
      user: "",
      deleteRestaurantID: "",
      repass: [],
      categorys: [],
      filter: "",
    };
  },
  created() {
    this.profile();
    this.restaurant();
    this.getRepas();
    this.getCategorys();
  },
  computed: {
    filteredRestaurant() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.restaurants.filter((restaurants) => {
        const name = restaurants.user.id.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },
  },
  methods: {
    deleteRestaurantModal(id) {
      this.showDeleteRestaurantModal = !this.showDeleteRestaurantModal;
      this.deleteRestaurantID = id;
    },
    MenuModal(id) {
      this.showModalRepas = !this.showModalRepas;
      this.addforms.restaurant_id = id;
    },
    async deleteRestaurant() {
      try {
        this.showDeleteRestaurantModal = !this.showDeleteRestaurantModal;
        const response = await axios.delete(
          `/api/restaurants/${this.deleteRestaurantID}`
        );
        if (response.status === 204) {
          console.log(this.response);
        }
      } catch (error) {
        console.log(error.data);
      }
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
    async getRepas() {
      try {
        const response = await axios.get("/api/repas");
        if (response.data) {
          this.repass = response.data.data;
          console.log(this.repass);
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
          // console.log(this.restaurants);
          this.filteredRestaurants = this.restaurants.filter(
            (restaurant) => restaurant.user.id === this.user
          );
          console.log(this.filteredRestaurants);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async getCategorys() {
      try {
        const response = await axios.get("/api/categorys");
        if (response.data) {
          this.categorys = response.data.data;
          console.log(this.categorys);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    addRestaurant() {
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
            this.sendRestaurant();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async sendRestaurant() {
      try {
        this.addform.user_id = this.user;
        const response = await axios.post("/api/restaurants", this.addform);
        if (response.status == 201) {
          console.log(response);
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre Restaurant est créer avec succés",
            timeout: 5000,
          }).show();
          this.restaurant();
        } else {
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
    async addMenu() {
      try {
        this.addforms.restaurant_id = this.filteredRestaurant[0].id;
        const response = await axios.post("/api/menus", this.addforms);
        if (response.status == 201) {
          console.log(response);
          //this.showModalRepas = !this.showModalRepas;
          this.addforms = {};
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre Menu est créer avec succés",
            timeout: 5000,
          }).show();
          this.getMenus();
        } else {
          this.showModalRepas = !this.showModalRepas;
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
            this.addsend.image_url = response.data.data.media_url;
            console.log(this.addsend.image_url);
            this.sendRepas();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async sendRepas() {
      try {
        this.addsend.user_id = this.user;
        const response = await axios.post("/api/repas", this.addsend);
        if (response.status == 201) {
          console.log(response);
          this.showModalRepasCreate = !this.showModalRepasCreate;
          this.addsend = {};
          this.showModalRepas = !this.showModalRepas;
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre Repas est créer avec succés",
            timeout: 5000,
          }).show();
          this.getRepas();
        } else {
          this.showModalRepasCreate = !this.showModalRepasCreate;
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
    onFileChangeRepas(e) {
      const file = e.target.files[0];
      this.image = file;
    },
  },
};
</script>