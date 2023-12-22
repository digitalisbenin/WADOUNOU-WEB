<template>
  <div class="">
    <div class="">
      <img
                class=" w-full"
                src="../assets/commandeetlivraisons.jpg"
                alt="Image 2"
              />
    </div>
    <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
    </div>
    <div class="flex">
      <div class="lg:w-1/3 mt-9 ml-9 lg:ml-0">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img
              :src="images[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="lg:w-2/3 h-72 lg:ml-16 object-cover"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ images[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
      <div class="w-1/3 mt-9 hidden md:block">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img
              :src="img[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 h-72 ml-16 object-cover"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ img[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
      <div class="w-1/3 mt-9 hidden md:block">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img
              :src="image[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 h-72 ml-16 object-cover"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ image[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
    </div>
    <!-- component -->
    <div class="flex mt-6">
      <div class="flex-1 border-r-2 pr-4">
        <!-- Contenu à gauche -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
      <div class="flex-1 text-center">
        <!-- Contenu au milieu -->
        <h1 class="text-4xl font-bold">Fiche de commande de repas</h1>
      </div>
      <div class="flex-1 border-l-2 pl-4">
        <!-- Contenu à droite -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
    </div>
    <label for="restaurant" class="mb-3 block text-2xl font-bold mt-12">
      Recherchez un repas
    </label>
    <div
      class="rounded-full p-1 mt-4 box-border border border-orange-500 mx-auto my-auto bg-white overflow-hidden ring-red-300 focus:ring-4 w-2/4 flex items-center py-1"
    >
      <input
        type="text"
        v-model="filter"
        class="rounded-full px-4 focus:outline-none w-full"
        placeholder="Recherche ......."
      />
      <button
        class="text-sm bg-green-600 py-2 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
      >
        Search
      </button>
    </div>
    <div class="flex items-center justify-center p-12 ">
      <!-- Author: FormBold Team -->
      <!-- Learn More: https://formbold.com -->

      <div class="mx-auto w-full max-w-[550px] border border-gray-500">
        <div class="mb-5 lg:mx-24">
          <label
            for="restaurant"
            class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
          >
            Choisissez une catégorie
          </label>
          <select
            name="restaurant"
            id="restaurant"
            v-model="filter"
            class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="">Tous</option>
            <option
              v-for="(categorie, index) in categories"
              :key="index"
              :value="categorie.name"
            >
              {{ categorie.name }}
            </option>
            <!-- Ajoutez plus d'options au besoin -->
          </select>
        </div>
         <div class="mb-5 lg:mx-24">
            <label
              for="restaurant"
              class="mb-3 block lg:text-2xl text-lg font-bold mt-2"
            >
              Choisissez un restaurant
            </label>
            <select
              name="restaurant"
              id="restaurant"
              v-model="addform.restaurant_id"
              @change="searchr"
              :disabled="isSelectDisabled"
              class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option
                v-for="(restaurant, index) in restaurants"
                :key="index"
                :value="restaurant.id"
              >
                {{ restaurant.name }}
              </option>
              <!-- Ajoutez plus d'options au besoin -->
            </select>
          </div>
        <div v-if="form.repas_id === '' && addform.restaurant_id == ''">
          <div class="mb-5 lg:mx-24">
            <div class="flex">
              <div class="w-1/2 mr-4">
                <label
                  for="restaurant"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Choisissez un repas
                </label>
                <select
                  name="restaurant"
                  id="restaurant"
                  v-model="form.repas_id"
                  @click="updatePrix"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option
                    v-for="(repas, index) in filteredRepas"
                    :key="index"
                    :value="repas.id"
                  >
                    {{ repas.name }}
                  </option>
                </select>
              </div>
              
              <div class="ml-4 w-1/2">
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Quantité 
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  v-model="form.quantite"
                  placeholder="5"
                  min="0"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div class="col-span-8 sm:col-span-4 mt-16 ml-4">
                <button
                  @click="ligneCommande"
                  class="inline-flex text-white bg-green-700 mt-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.addform.restaurant_id !== ''">
          <div class="mb-5 lg:mx-24">
            <div class="flex">
              <div class="w-1/2 mr-4">
                <label
                  for="restaurant"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Choisissez un repas
                </label>
                <select
                  name="restaurant"
                  id="restaurant"
                  v-model="form.repas_id"
                  @click="AddPrix"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option
                    v-for="(repas, index) in filteredMenus"
                    :key="index"
                    :value="repas.repas.id"
                  >
                    {{ repas.repas.name }}
                  </option>
                </select>
              </div>
              <div class="ml-4 w-1/4">
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Prix
                </label>
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                   {{ menuSelectionne}}FCFA
                </label>
              </div>
              <div class="ml-4 w-1/4">
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Quantité
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  v-model="form.quantite"
                  placeholder="5"
                  min="0"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="col-span-8 sm:col-span-4 mt-16 ml-4">
                <button
                  @click="ligneCommande"
                  class="inline-flex text-white bg-green-700 mt-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="form.repas_id !== '' && addform.restaurant_id == ''">
          <div class="mb-5 lg:mx-24">
            <div class="flex">
              <div class="w-1/2 mr-4">
                <label
                  for="restaurant"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Choisissez un repas
                </label>
                <select
                  name="restaurant"
                  id="restaurant"
                  v-model="form.repas_id"
                  @click="updatePrix"
                 
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option
                    v-for="(repas, index) in filteredRepas"
                    :key="index"
                    :value="repas.id"
                  >
                    {{ repas.name }}
                  </option>
                </select>
              </div>
              <div class="ml-4 w-1/4">
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Prix
                </label>
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                 {{ prixSelectionne.split(".")[0] }}FCFA
                </label>
              </div>
              <div class="ml-4 w-1/4">
                <label
                  for="guest"
                  class="mb-3 block lg:text-2xl text-lg font-bold mt-4"
                >
                  Quantité
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  v-model="form.quantite"
                  placeholder="5"
                  min="0"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              

              <div class="col-span-8 sm:col-span-4 mt-16 ml-4">
                <button
                  @click="ligneCommande"
                  class="inline-flex text-white bg-green-700 mt-1 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        
          <div class="lg:mx-24 flex  flex-wrap " v-if="allcommande.length > 0">
            <div
              v-for="(cont, index) in allcommande"
              :key="index"
              class="  lg:w-1/4 "
              
            >
              <div class="mt-2 p-2 border border-dark-500 rounded mr-2">
                {{ cont.repas.name }} {{ cont.montant }}
                <button @click="remove(cont.id)">
                  <span class="sr-only">Close</span>
                  <svg
                    class="w-5 h-5 ml-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else></div>
        

        <form action="#" method="POST" @submit.prevent="commandeUpdate()">
         
          <div class="flex flex-wrap lg:mx-24">
            <div class="w-full sm:w-1/2">
              <div class="mb-5">
                <label
                  for="fName"
                  class="mb-3 block lg:text-2xl text-lg font-bold"
                >
                  Nom Complet
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  v-model="addform.name"
                  placeholder=" Nom Complet"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full sm:w-1/2">
              <div class="mb-5 ml-2">
                <label
                  for="lName"
                  class="mb-3 block lg:text-2xl text-lg font-bold"
                >
                  Contact
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  v-model="addform.contact"
                  placeholder="Contact"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div class="lg:mx-24 flex flex-wrap">
            <div class="w-full sm:w-1/2">
              <div class="mb-5">
                <label
                  for="fName"
                  class="mb-3 block lg:text-2xl text-lg font-bold"
                >
                  Adresse de livraison
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  v-model="addform.adresse"
                  placeholder=" Adresse"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full sm:w-1/2">
              <div class="mb-5 ml-2">
                <label
                  for="lName"
                  class="mb-3 block lg:text-2xl text-lg font-bold"
                >
                  Informations Complémentaires
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  v-model="addform.description"
                  placeholder="Decription"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center">
             <button
              class="hover:shadow-form mr-2 rounded-md bg-red-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Annuler
            </button>
            <button
              class="hover:shadow-form  ml-2 rounded-md bg-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Soumettre
            </button>
           
          </div>
          <div class="h-4"></div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "App",
  components: {
    AlertComponent,
  },
  data() {
    return {
      images: [
        { src: require("@/assets/breakfast2.png"), name: "Petit-déjeuner 1" },
        {
          src: require("@/assets/breakfast4.png"),
          name: "Petit-déjeuner Bénin",
        },
        { src: require("@/assets/breakfast6.png"), name: "Petit-déjeuner " },
        { src: require("@/assets/lunch3.png"), name: "Déjeuner" },
      ],

      image: [
        { src: require("@/assets/lunch4.png"), name: "Plat Africa" },
        { src: require("@/assets/lunch5.png"), name: "Plat Bénin" },
        { src: require("@/assets/lunch6.png"), name: "Déjeuner Sud" },
        { src: require("@/assets/dinner2.png"), name: "Déjeuner Nord" },
      ],

      img: [
        { src: require("@/assets/salmon-518032_960_720.jpg"), name: "Pizza" },
        { src: require("@/assets/food-712665_960_720.jpg"), name: "Chawma" },
        {
          src: require("@/assets/photo-1565299624946-b28f40a0ae38.png"),
          name: "Burger",
        },
        {
          src: require("@/assets/photo-1512621776951-a57141f2eefd.png"),
          name: "Déjeuner Chinois",
        },
      ],
      currentImage: 0,
      addform: {
        restaurant_id: "",
        name: "",
        contact: "",
        status: "En attente",
        description: "",
        adresse: "",
        user_id: "",
        montant: 0,
      },

      form: {
        repas_id: "",
        quantite: 1,
        montant: 0,
        commande_id: "",
      },
      restaurants: [],
      repass: [],
      repasMenu: [],
      user: "",
      filter: "",
      //filters:"",
      filteredRespas: [],
      RepaFitre: [],
      filteredMenus: [],
      filteredMenuRestau: [],
      commandeligne: [],
      allcommande: [],
      categories: [],
      showAlert: false,
      isSelectDisabled: false,
      commandeID: "",
      ligneMontant: 0,
      TotalMontant: 0,
      transationID: "",
      deleteID:"",
      prixSelectionne: null,
      menuSelectionne: null,
      //filteredPrix:[],
      alert: {
        message: "",
      },
    };
  },
  computed: {
    filteredRepas() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.repass.filter((repass) => {
        const name = repass.name.toLowerCase();
        const categorie = repass.categoris.name.toLowerCase();
        return name.includes(searchTerm) || categorie.includes(searchTerm);
      });

      return filtered_data;
    },
    filteredRestaurants() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.restaurants.filter((restaurants) => {
        const name = restaurants.name.toLowerCase();
        const adresse = restaurants.adresse.toLowerCase();
        return name.includes(searchTerm) || adresse.includes(searchTerm);
      });
      return filtered_data;
    },
  },
  mounted() {
    this.startSlider();
    //this.profile();
    this.restaurant();
    this.getRepas();
    this.getCategories();
    addKkiapayListener("success", this.successHandler);
    //this.getMenus();
  },
  beforeUnmount() {
    removeKkiapayListener("success", this.successHandler);
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 5000); // Défilement toutes les 5 secondes
    },
    search(id) {
      this.form.repas_id = id;
      this.getMenuRest();
      if (this.form.repas_id !== "") {
        this.filter = "";
      }
    },
    updatePrix() {
    // Récupérer le repas sélectionné
    const repasSelectionne = this.repass.find(
      (repas) => repas.id === this.form.repas_id
    );

    // Vérifier si le repas a été trouvé
    if (repasSelectionne) {
      // Mettre à jour la variable avec le prix du repas
      this.prixSelectionne = repasSelectionne.prix;
      console.log(this.prixSelectionne);
    } else {
      // Gérer le cas où le repas n'est pas trouvé
      this.prixSelectionne = null; // ou une valeur par défaut
    }
  },
     AddPrix() {
    // Récupérer le repas sélectionné
    const menuSelectionne = this.repasMenu.find(
      (menu) => menu.repas.id === this.form.repas_id
    );

    // Vérifier si le repas a été trouvé
    if (menuSelectionne) {
      // Mettre à jour la variable avec le prix du repas
      this.menuSelectionne = menuSelectionne.prix;
      console.log(this.menuSelectionne);
    } else {
      // Gérer le cas où le repas n'est pas trouvé
      this.menuSelectionne = null; // ou une valeur par défaut
    }
  },
    searchr() {
      this.getMenus();
      if (this.addform.restaurant_id !== "") {
        this.filter = "";
      }
    },
    async getMenuRest() {
      try {
        const response = await axios.get("/api/menus");
        if (response.data) {
          console.log(response.data.data);
          this.repasMenu = response.data.data;
          console.log(this.menus);
          this.filteredMenuRestau = this.repasMenu.filter(
            (menu) => menu.repas.id === this.addform.repas_id
          );
          console.log(this.filteredMenuRestau);
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
          console.log(this.user);
          this.filterRestaurantsByUser(this.user);
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
    async getCategories() {
      try {
        const response = await axios.get("/api/categorys");
        if (response.data) {
          this.categories = response.data.data;
          console.log(this.categories);
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
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    RepasModal() {
      this.RepaFitre = this.repass.filter(
        (repas) => repas.id === this.form.repas_id
      );
    },
    async ligneCommande() {
      if (this.commandeID === "") {
        this.commande();
      } else {
        try {
          this.RepasModal();
          this.form.montant = this.RepaFitre[0].prix * this.form.quantite;
          this.form.commande_id = this.commandeID;
          const response = await axios.post("/api/lignecommandes", this.form);
          if (response.status == 201) {
            this.commandeligne = response.data.data;
            this.ligneMontant = response.data.data.montant;
            console.log(this.ligneMontant);
            this.TotalMontant = this.TotalMontant + this.ligneMontant;
            console.log(this.TotalMontant);
            this.allcommande.push(this.commandeligne);
            console.log(this.allcommande);
            this.form.quantite = 1;
            this.isSelectDisabled = true;
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
      }
    },
    async commande() {
      try {
        this.RepasModal();
        const response = await axios.post("/api/commandes", this.addform);
        if (response.status == 201) {
          this.commandeID = response.data.data.id;
          console.log(this.commandeID);
          this.ligneCommande();
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
    async commandeUpdate() {
      try {
        this.RepasModal();
        const data = {
          name: this.addform.name,
          description: this.addform.description,
          contact: this.addform.contact,
          adresse: this.addform.adresse,
          montant: this.TotalMontant,
          status: this.addform.status,
        };
        const response = await axios.post(
          `/api/commandes/${this.commandeID}`,
          data
        );
        if (response.status == 200) {
          this.createTransaction();
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
    async remove(id) {
      try {
        this.deleteID =id;
        
        const response = await axios.delete(
          `/api/lignecommandes/${this.deleteID}`
        );
        if (response.status == 204) {
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre commande a été supprimer avec succès.",
            timeout: 5000,
          }).show();
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
    async getMenus() {
      try {
        const response = await axios.get("/api/menus");
        if (response.data) {
          console.log(response.data.data);
          this.repasMenu = response.data.data;
          console.log(this.menus);
          this.filteredMenus = this.repasMenu.filter(
            (menu) => menu.restaurant.id === this.addform.restaurant_id
          );
          console.log(this.filteredMenus);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async payementmethod() {
      try {
        const data = {
          transationId: this.transationID,
          commande_id: this.commandeID,
        };

        const response = await axios.post("/api/payments", data);
        if (response.status == 201) {
          console.log(response);
          this.allcommande = [],
          this.isSelectDisabled = false;
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre commande a été enregistrée avec succès.",
            timeout: 5000,
          }).show();
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
    async createTransaction() {
      //this.addform.montant = this.filteredRepas[0].prix * this.addform.quantite;
      openKkiapayWidget({
        amount: this.TotalMontant,
        firstname: this.addform.name,
        lastname: this.addform.name,
        api_key: "361197d0e64411ec848227abfc492dc7",
        sandbox: true,
        phone: "61000000",
      });
    },
    successHandler(response) {
      this.transationID = response.transactionId;
      console.log(this.transationID);
      this.this.form = {},
      this.this.addform = {},
      this.payementmethod();
    },
  },
};
</script>
 
<style scoped>
.custom-background {
  background-image: url("~@/assets/commandeetlivraisons.jpg");
  /* Remplacez 'votre-image.jpg' par le nom de votre image */
  background-size: cover;
  /*background-size: auto 100%;*/
  /* Ajustez la taille de l'image */
  background-repeat: no-repeat;
  background-position: center center;
  /* Centrez l'image */
  /* Ajoutez d'autres styles Tailwind CSS ou CSS personnalisés au besoin */
}

/* Ajoutez des styles personnalisés pour le slider ici */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
  