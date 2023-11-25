<template>
  <div class="">
    <div class="custom-background h-96"></div>
     <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
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
        class="z-0 flex flex-row items-start justify-center w-screen h-screen pt-20 -mb-16 bg-gray-50 lg:bg-white lg:mb-20 lg:w-1/3 lg:h-96 lg:pt-0"
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
    <div class="flex mt-6">
      <div class="flex-1 border-r-2 pr-4">
        <!-- Contenu à gauche -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
      <div class="flex-1 text-center">
        <!-- Contenu au milieu -->
        <h1 class="text-4xl font-bold">Repas</h1>
      </div>
      <div class="flex-1 border-l-2 pl-4">
        <!-- Contenu à droite -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
    </div>
    <div class="flex mt-4 flex-wrap">
      <div v-for="(repas, index) in repass" :key="index" class="w-1/4 p-4">
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
  </div>
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
      <AddModalFooter
        @cancel="showModalRepas = false"
        @send="createTransaction()"
      />
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
//import { FedaPay, Transaction } from "fedapay";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
export default {
  name: "App",
  components: {
    TheModal,
    BaseLabel,
    BaseInput,
    AddModalFooter,
    AlertComponent
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
      showAlert: false,
      alert: {
        message: "",
      },
      showModalRepas: false,
      showModalCommentaires: false,
      repass: [],
      restaurants: [],
      CommentaireId: "",
      filteredRepas: [],
      user: {
        // Assurez-vous d'initialiser l'objet user
        email: "user@example.com", // Remplacez par l'email de l'utilisateur
      },
    };
  },
  mounted() {
    this.startSlider();
    this.getRepas();
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
   
    },
   
    async commande() {
      try {
        this.addform.montant = this.filteredRepas[0].prix *this.addform.quantite ;
        const response = await axios.post("/api/commandes", this.addform);
        if (response.status == 201) {
          console.log(response);
          this.showModalRepas = !this.showModalRepas;
          this.addform ={};

           new Noty({
           type: 'success',
           layout: 'topRight',
           text: 'Votre commande est éffectuée avec succés',
            timeout: 5000,
           }).show( );
        }else {
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
        }else {
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
  background-image: url("~@/assets/4.-repas.jpg");
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
</style>
  