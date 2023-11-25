<template>
  <div class="">
    <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
    </div>
    <div
      class="custom-background flex flex-col items-center justify-start font-sans min-h-96 lg:pt-10 lg:pb-20"
    >
      <div>
        <p
          class="p-2 text-4xl font-bold text-center text-blue-800  lg:text-5xl lg:text-gray-100"
        >
          Pourquoi rester affamé quand vous pouvez commander 
        </p>
        <p
          class="p-2 text-4xl font-bold text-center text-blue-800  lg:text-5xl lg:text-gray-100"
        >
         chez WADOUNOU ?
        </p>
        
      </div>
      <div>
        <p
          class="p-4 pt-6 font-sans text-2xl leading-10 text-center text-gray-500 lg:text-gray-200"
        >
          Téléchargez dès maintenant l'application WADOUNOU
        </p>
      </div>
      <div
        class="relative z-50 flex flex-col items-center justify-between h-48 lg:space-x-8 pt-7 lg:pt-0 lg:flex-row lg:justify-between lg:w-90"
      >
        <button
          class="pt-3 pb-3 pl-12 pr-12 text-2xl font-semibold text-center text-white transition-all bg-orange-600 rounded-full shadow-2xl lg:ml-5 hover:bg-orange-700 focus:outline-none ring-4 ring-orange-600 lg:ring-2 lg:font-medium"
        >
          Playstore
        </button>
        <button
          class="pt-3 pb-3 text-2xl font-semibold text-center text-orange-500 transition-all rounded-full shadow-2xl lg:mr-5 hover:text-orange-500 hover:bg-gray-50 pl-11 pr-11 bg-gray-50 focus:outline-none ring-4 ring-orange-500 lg:font-medium lg:text-gray-50 lg:bg-opacity-0 lg:ring-2 lg:ring-white"
        >
          App Store
        </button>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3 mt-4">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img
              :src="images[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 h-72 object-cover ml-16"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ images[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
      <div
        class="z-0 flex flex-row items-start justify-center w-screen h-screen pt-20 -mb-16 bg-gray-50 lg:bg-white  lg:w-1/3 lg:h-96 lg:pt-0"
      >
        <img
          class="absolute left-0 lg:left-auto lg:-mt-64"
          src="../assets/Rectangle_1.png"
          alt=""
        />
        <img class="ml-64 lg:-mt-16" src="../assets/Rectangle_2.png" alt="" />
      </div>
      <div class="w-1/3 mt-4 ml-4">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img
              :src="image[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 ml-16 h-72 object-cover"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ image[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
    </div>
      <label for="restaurant" class="mb-3 block text-2xl font-bold mt-9">
      Recherchez un restaurant
    </label>
    <div
      class="rounded-full p-1 mt-2 box-border border border-orange-500 mx-auto my-auto bg-white overflow-hidden ring-red-300 focus:ring-4 w-2/4 flex items-center py-1"
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
    <div class="relative overflow-hidden h-96 stop-scroll mt-2">
      <div
        class="flex transition-transform duration-500 ease-in-out -ml-64 mt-4 hover:scale-105 slider-item"
      >
        <!-- Première diapositive -->
        <div class="flex-shrink-0 w-1/4 ml-32">
          <div
            class="flex bg-white transform transition duration-700 hover:scale-105 p-6 rounded-2xl shadow-xl"
          >
            <div class="overflow-hidden rounded-2xl flex flex-grow w-2/3">
              <img
                class="transform transition duration-700 hover:scale-125 h-72 w-full"
                src="../assets/architecture-building-city-2047397.png"
                alt="Image 1"
              />
            </div>
            <div class="flex mt-6 ml-4 space-x-3 w-1/3">
              <div class="flex flex-col space-y-3">
                <h1 class="text-2xl text-gray-800 poppins">
                  Boca Del Rio, Grand Popo
                </h1>
                <p class="text-sm text-gray-500 poppins">
                  Vous sortez à Bénin,
                </p>
                <router-link
                  class="bg-green-600 text-white px-4 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 text-slate-950 hover:text-gray-300"
                  active-class="text-green-600"
                  to="/restaurantdetail"
                  >Plus Info</router-link
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Deuxième diapositive -->
        <div class="flex-shrink-0 w-1/4 ml-32">
          <div
            class="flex bg-white transform transition duration-700 hover:scale-105 p-6 rounded-2xl shadow-xl"
          >
            <div class="overflow-hidden rounded-2xl flex flex-grow w-2/3">
              <img
                class="transform transition duration-700 hover:scale-125 h-72 w-full"
                src="../assets/adult-blur-blurred-background-687824.png"
                alt="{title}"
              />
            </div>

            <div class="flex mt-6 ml-4 space-x-3 w-1/3">
              <div class="flex flex-col space-y-3">
                <h1 class="text-2xl text-gray-800 poppins">
                  Bon goût à Calavi IITA
                </h1>
                <p class="text-sm text-gray-500 poppins">
                  L’igname pilée est une spécialité du nord du Bénin qui est
                  devenue
                </p>
                <router-link
                  class="bg-green-600 text-white px-4 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 text-slate-950 hover:text-gray-300"
                  active-class="text-green-600"
                  to="/restaurantdetail"
                  >Plus Info</router-link
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Troisième diapositive -->
        <div class="flex-shrink-0 w-1/4 ml-32">
          <div
            class="flex bg-white transform transition duration-700 hover:scale-105 p-6 rounded-2xl shadow-xl"
          >
            <div class="overflow-hidden rounded-2xl flex flex-grow w-2/3">
              <img
                class="transform transition duration-700 hover:scale-125 h-72 w-full"
                src="../assets/architecture-building-city-2047397.png"
                alt="{title}"
              />
            </div>

            <div class="flex mt-6 ml-4 space-x-3 w-1/3">
              <div class="flex flex-col space-y-3">
                <h1 class="text-2xl text-gray-800 poppins">
                  Boca Del Rio, Grand Popo
                </h1>
                <p class="text-sm text-gray-500 poppins">
                  Vous sortez à Bénin,
                </p>
                <router-link
                  class="bg-green-600 text-white px-4 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 text-slate-950 hover:text-gray-300"
                  active-class="text-green-600"
                  to="/restaurantdetail"
                  >Plus Info</router-link
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Quatrième diapositive -->
        <div class="flex-shrink-0 w-1/4 ml-32">
          <div
            class="flex bg-white transform transition duration-700 hover:scale-105 p-6 rounded-2xl shadow-xl"
          >
            <div class="overflow-hidden rounded-2xl flex flex-grow w-2/3">
              <img
                class="transform transition duration-700 hover:scale-125 h-72 w-full"
                src="../assets/people-2576336_960_720.jpg"
                alt="{title}"
              />
            </div>

            <div class="flex mt-6 ml-4 space-x-3 w-1/3">
              <div class="flex flex-col space-y-3">
                <h1 class="text-2xl text-gray-800 poppins">
                  Wasabi Sushi Bar, Cotonou
                </h1>
                <p class="text-sm text-gray-500 poppins">
                  Nous y avons été avec mon mari
                </p>
                <router-link
                  class="bg-green-600 text-white px-4 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 text-slate-950 hover:text-gray-300"
                  active-class="text-green-600"
                  to="/restaurantdetail"
                  >Plus Info</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1 class="text-4xl font-bold">Repas</h1>
       <label for="restaurant" class="mb-3 block text-2xl font-bold mt-9">
      Recherchez un repas
    </label>
    <div
      class="rounded-full p-1 mt-2 box-border border border-orange-500 mx-auto my-auto bg-white overflow-hidden ring-red-300 focus:ring-4 w-2/4 flex items-center py-1"
    >
      <input
        type="text"
        v-model="filters"
        class="rounded-full px-4 focus:outline-none w-full"
        placeholder="Recherche ......."
      />
      <button
        class="text-sm bg-green-600 py-2 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
      >
        Search
      </button>
    </div>
    <div class="flex mt-6 flex-wrap">
      <div v-for="(repas, index) in filteredRepa" :key="index" class="w-1/4 p-4">
        <div
          class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 rounded-lg relative ml-4"
        >
          <img
            class="h-60 w-72 mx-auto transform transition duration-300 hover:scale-105"
            :src="repas.image_url"
            alt=""
          />
          <div class="flex flex-col items-center my-3 space-y-2">
            <h1 class="text-gray-900 poppins text-lg">{{ repas.name }}</h1>
            <p class="text-gray-500 poppins text-sm text-center">
              {{ repas.description }}
            </p>
            <h2 class="text-gray-900 poppins text-2xl font-bold">
              {{ repas.prix }}FCFA
            </h2>
            <div class="flex">
              <button
                @click="RepasModal(repas.id)"
                class="bg-green-600 text-white mr-6 px-8 py-2 focus:outline-none poppins rounded-full mt-4 transform transition duration-300 hover:scale-105"
              >
                Commander
              </button>
              <button class="transform transition duration-300 hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-12 h-12 text-red-500 mt-4 ml-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <button class="ml-4 mt-4" @click="CommentaireModal(repas.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-9 h-9"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="pt-4 pb-12 bg-gray-800 mt-6">
      <div class="my-16 text-center">
        <h2
          class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
        >
          Temoignages
        </h2>
        <p class="text-xl text-white">
          L'entreprise elle-même est une entreprise très prospère. lâche sage
        </p>
      </div>
      <div class="grid gap-2 lg:grid-cols-3 mx-4">
        <div class="max-w-md p-4 bg-white rounded-lg shadow-lg">
          <div class="flex justify-center -mt-16 md:justify-end">
            <img
              class="object-cover w-20 h-20 border-2 border-green-500 rounded-full"
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            />
          </div>
          <div>
            <h2 class="text-3xl font-semibold text-gray-800">Food</h2>
            <p class="mt-2 text-gray-600">
              L'entreprise elle-même est une entreprise très prospère. Lequel
              ces chagrins les abandonnent, et l'erreur née du chagrin, les
              choses que je déteste car il cherche ici par commodité, il
              s'engage à être moins épargné par la vérité résultat!
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a href="#" class="text-xl font-medium text-green-500">John Doe</a>
          </div>
        </div>
        <div class="max-w-md p-4 bg-white rounded-lg shadow-lg">
          <div class="flex justify-center -mt-16 md:justify-end">
            <img
              class="object-cover w-20 h-20 border-2 border-green-500 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652__340.jpg"
            />
          </div>
          <div>
            <h2 class="text-3xl font-semibold text-gray-800">Food</h2>
            <p class="mt-2 text-gray-600">
              L'entreprise elle-même est une entreprise très prospère. Lequel
              ces chagrins les abandonnent, et l'erreur née du chagrin, les
              choses que je déteste car il cherche ici par commodité, il
              s'engage à être moins épargné par la vérité résultat!
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a href="#" class="text-xl font-medium text-green-500">John Doe</a>
          </div>
        </div>
        <div class="max-w-md p-4 bg-white rounded-lg shadow-lg">
          <div class="flex justify-center -mt-16 md:justify-end">
            <img
              class="object-cover w-20 h-20 border-2 border-green-500 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/01/18/17/48/purchase-3090818__340.jpg"
            />
          </div>
          <div>
            <h2 class="text-3xl font-semibold text-gray-800">Food</h2>
            <p class="mt-2 text-gray-600">
              L'entreprise elle-même est une entreprise très prospère. Lequel
              ces chagrins les abandonnent, et l'erreur née du chagrin, les
              choses que je déteste car il cherche ici par commodité, il
              s'engage à être moins épargné par la vérité résultat!
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a href="#" class="text-xl font-medium text-green-500">John Doe</a>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- Composant de modal -->
  <ModalComponent :isOpen="isModalOpen" @close="closeModal" />
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepas"
    @close-modal="showModalRepas = false"
  >
    <template #header> Faire votre commande</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="createTransaction()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" v-model="addform.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Addrese" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.adresse"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Télèphone" />
                  <div class="relative mt-1">
                    <BaseInput v-model="addform.contact" class="mt-2" />
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
                  <BaseLabel value="Qunatité" />
                  <BaseInput
                    id="language"
                    v-model="addform.quantite"
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
      <AddModalFooter @cancel="showModalRepas = false" @send="createTransaction()" />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalCommentaires"
    @close-modal="showModalCommentaires = false"
  >
    <template #header> Votre commentaire</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="commentaire()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Votre message " />
                  <div class="mt-1">
                    <textarea
                      class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                      v-model="sendform.content"
                      autocomplete="current-password"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter
        @cancel="showModalCommentaires = false"
        @send="commentaire()"
      />
    </template>
  </TheModal>
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
import ModalComponent from "../components/ModalComponent .vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";

export default {
  name: "App",
  components: {
    ModalComponent,
    TheModal,
    BaseLabel,
    BaseInput,
    AlertComponent,
    AddModalFooter,
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
      currentImage: 0,
      showAlert: false,
      alert: {
        message: "",
      },
      isModalOpen: false,
      addform: {
        repas_id: "",
        name: "",
        contact: "",
        description: "",
        addrese: "",
        user_id: "",
        quantite: 1,
        status: "En cours",
        montant: 0,
      },
      sendform: {
        repas_id: "",
        content: "",
      },
      showModalRepas: false,
      showModalCommentaires: false,
      repass: [],
      restaurants: [],
      CommentaireId: "",
      filteredRepas: [],
      pris: 0,
      filters:"",
      filter:"",
    };
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
   filteredRepa() {
      const searchTerm = this.filters.toLowerCase();
      const filtered_data = this.repass.filter((repass) => {
        const name = repass.name.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },

   
  },
  mounted() {
    this.startSlider();
    this.getRepas();
    this.restaurant();
     addKkiapayListener('success',this.successHandler)
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
    openModal() {
      this.isModalOpen = true; // Ouvrir le modal
    },
    closeModal() {
      this.isModalOpen = false; // Fermer le modal
    },
    CommentaireModal(id) {
      this.showModalCommentaires = !this.showModalCommentaires;
      this.sendform.repas_id = id;
    },
    RepasModal(id) {
      this.showModalRepas = !this.showModalRepas;
      this.addform.repas_id = id;
      this.filteredRepas = this.repass.filter(
        (repas) => repas.id === this.addform.repas_id
      );

      this.addform.montant = this.filteredRepas[0].prix;
    },

    async commande() {
      try {
         this.filters= "";
        this.addform.montant =
          this.filteredRepas[0].prix * this.addform.quantite;
        const response = await axios.post("/api/commandes", this.addform);
        if (response.status == 201) {
          console.log(response);
          this.showModalRepas = !this.showModalRepas;
          this.addform = {};
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre commande est éffectuée avec succés",
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
    async commentaire() {
      try {
        const response = await axios.post("/api/commentaires", this.sendform);
        if (response.status == 201) {
          console.log(response);
          this.showModalCommentaires = !this.showModalCommentaires;
          this.sendform = {};
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Merci pour votre commentaire",
            timeout: 5000,
          }).show();
        } else {
          this.showModalCommentaires = !this.showModalCommentaires;
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
     async createTransaction() {
      this.addform.montant = this.filteredRepas[0].prix *this.addform.quantite ;
     openKkiapayWidget({
        amount: this.addform.montant,
        firstname:this.addform.name,
        lastname:this.addform.name,
        api_key: "361197d0e64411ec848227abfc492dc7",
        sandbox: true,
        phone: "61000000",
      });
    },
    successHandler(response) {
      console.log(response);
      this.commande();
    },
  },
};
</script>

<style scoped>
.custom-background {
  background-image: url("~@/assets/hero.png");
  /* Remplacez 'votre-image.jpg' par le nom de votre image */
  background-size: cover;
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

.slider-item {
  animation: slide 25s linear infinite;
}
.stop-scroll,
.stop-scroll *:hover {
  transition: none !important;
  animation: none !important;
}

@keyframes slide {
  0%,
  100% {
    transform: translateX(0%);
  }

  25% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-200%);
  }

  75% {
    transform: translateX(-300%);
  }
}
</style>
