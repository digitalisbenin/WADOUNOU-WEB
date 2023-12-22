<template>
  <div class="">
    <div class="">
      <img
                class=" w-full"
                src="../assets/ENsavoirplusrestau.jpg"
                alt="Image 2"
              />
    </div>
    <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
    </div>
    <div class="flex">
      <div class="lg:w-1/3 mt-4">
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
        class="z-0 flex flex-row hidden md:block items-start justify-center w-screen h-screen pt-20 -mb-16 bg-gray-50 lg:bg-white lg:w-1/3 lg:h-96 lg:pt-0"
      >
        <img
          class="absolute left-72 h-3/4 lg:-mt-32"
          src="../assets/Smartphonewadounou.png"
          alt=""
        />
        <img class="ml-52 lg:-mt-24" src="../assets/Smartphone wadounouCopie.png" alt="" />
      </div>
      <div class="w-1/3 hidden md:block mt-24 ml-4">
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
    <div class="flex">
      <div class="flex-1 border-r-2 pr-4">
        <!-- Contenu à gauche -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
      <div class="flex-1 text-center">
        <!-- Contenu au milieu -->
        <h1 class="text-4xl font-bold">Restaurant</h1>
      </div>
      <div class="flex-1 border-l-2 pl-4">
        <!-- Contenu à droite -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-6 mt-4">
      <div
        v-for="(restaurant, index) in filteredRestaurants"
        :key="index"
        class="flex lg:ml-80 shadow-xl lg:mr-80 h-80"
      >
        <img
          class="transform transition duration-700 hover:scale-125 h-72 lg:ml-24 mt-2 w-1/2"
          :src="restaurant.image_url"
          alt="{title}"
        />
        <div class="lg:ml-12 mt-6 text-left ml-9">
          <h2 class="text-2xl font-semibold mb-2">{{ restaurant.name }}</h2>
          <p class="text-gray-600 text-sm mb-2 mt-2 mr-2 hidden md:block">
            {{ restaurant.description }}
          </p>
          <p class="text-gray-600 text-sm mb-2">
            A {{ restaurant.adresse }} Contactez au {{ restaurant.phone }}
          </p>
          <p class="text-gray-600 text-sm mb-2">
            Spécialité {{ restaurant.specilite }} a une capacité de
            {{ restaurant.capacite }} place
          </p>
          <p class="text-gray-600 text-sm mb-2">
            Ouvre à {{ restaurant.heure_douverture }} et ferme à
            {{ restaurant.heure_fermeture }}
          </p>
          <button
            class="bg-green-600 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full"
            @click="showModalReservations = true"
          >
            Réserver
          </button>
        </div>
      </div>
      <h3 class="text-2xl font-semibold mt-9">Nos menus</h3>
      <div class="flex mt-4 flex-wrap lg:p-12">
      <div v-for="(repas, index) in filteredMenus" :key="index" class="lg:w-1/4 p-4">
        <div
          class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 rounded-lg relative lg:ml-4"
        >
          <img
            class="h-60 lg;w-72 lg:mx-auto transform transition duration-300 hover:scale-105"
            :src="repas.repas.image_url"
            alt=""
          />
          <div class="flex flex-col items-center my-3 space-y-2">
            <h1 class="text-gray-900 poppins text-lg">{{ repas.repas.name }}</h1>
            <p class="text-gray-500 poppins text-sm text-center">
              {{ repas.description }}
            </p>
            <h2 class="text-gray-900 poppins text-2xl font-bold">
              {{ repas.prix.split('.')[0]  }}FCFA
            </h2>
             <div class="flex">
              <button
                @click="RepasModal(repas.repas.id)"
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
              <button class="ml-4 mt-4" @click="CommentaireModal(repas.repas.id)">
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
  </div>
   
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalReservations"
    @close-modal="showModalReservations = false"
  >
    <template #header> Reservation</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="reservation()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" v-model="addform.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nombre de place" />
                  <div class="flex">
                    <BaseInput
                      id="prenom"
                      v-model="addform.place"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Informations Complémentaires" />
                  <BaseInput
                    id="language"
                    v-model="addform.description"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Contact" />
                  <BaseInput
                    id="language"
                    v-model="addform.contact"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Date et Heure" />
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    v-model="addform.date"
                    class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal mt-2 focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <AddModalFooter @cancel="showModalReservations = false" @send="reservation()" />
    </template>
  </TheModal>
   <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalRepas"
    @close-modal="showModalRepas = false"
  >
    <template #header> Faire votre commande</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="commande()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" v-model="addforms.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Addrese" />
                  <BaseInput
                    id="prenom"
                    v-model="addforms.adresse"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Télèphone" />
                  <div class="relative mt-1">
                    <BaseInput v-model="addforms.contact" class="mt-2" />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Informations Complémentaires (pas obligatoire)" />
                  <BaseInput
                    id="language"
                    v-model="addforms.description"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Qunatité" />
                  <BaseInput
                    id="language"
                    v-model="addforms.quantite"
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
      <AddModalFooter @cancel="showModalRepas = false" @send="commande()" />
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
                  <BaseInput id="nom"  class="mt-2" />
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
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import AlertComponent from "../components/AlertComponent.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
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
      addform: {
        place: "",
        name: "",
        description: "",
        contact: "",
        date: "",
        restaurant_id: "",
      },
      addforms: {
        repas_id: "",
        name: "",
        restaurant_id: "",
        contact: "",
        description: "",
        addrese: "",
        user_id: "",
        quantite: 1,
        status: "En attente",
        montant: 0,
      },
      sendform:{
        repas_id:"",
        content:"",

      },
      currentImage: 0,
      restaurantId: "",
      restaurants: [],
      filteredRestaurants: [],
      showModalRepas: false,
      showModalReservations:false,
      filteredMenus:[],
      showModalCommentaires: false,
      showAlert: false,
      commandeID:"",
      transationID:"",
      alert: {
        message: "",
      },
    };
  },
  mounted() {
    this.startSlider();
    this.restaurant();
    this.getMenus();
    this.restaurantId = this.$route.params.id;
    addKkiapayListener('success',this.successHandler)
    // Faites quelque chose avec l'ID, par exemple, affichez-le dans la console
    console.log("ID du restaurant :", this.restaurantId);
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
      this.addforms.repas_id = id;
       this.filteredMenus = this.menus.filter(
            (repas) => repas.repas.id === this.addforms.repas_id
          );
        
          
    },
     async commande() {
      try {
        this.filters = "";
        this.addforms.montant = this.filteredMenus[0].prix * this.addforms.quantite;
        this.addforms.restaurant_id =this.restaurantId;
            const data = {
            name: this.addforms.name,
            description: this.addforms.description,
            contact: this.addforms.contact,
            addrese: this.addforms.addrese,
            montant: this.addforms.montant,
            status: this.addforms.status,
            restaurant_id: this.addforms.restaurant_id,
          };
        
        const response = await axios.post("/api/commandes", data);
        if (response.status == 201) {
          console.log(response);
           this.commandeID = response.data.data.id;
          console.log(this.commandeID);
          this.showModalRepas = !this.showModalRepas;
          this.lignecommande();    
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
     async lignecommande() {
      try {
        this.filters = "";
        this.addforms.montant = this.filteredMenus[0].prix * this.addforms.quantite;
        const datas = {
        quantite: this.addforms.quantite,
        repas_id: this.addforms.repas_id,
        commande_id:  this.commandeID,
        montant: this.addforms.montant,
      };
        
        const response = await axios.post("/api/lignecommandes", datas);
        if (response.status == 201) {
          console.log(response);
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
    async payementmethod() {
      try {
            const data = {
            transationId: this.transationID,
            commande_id: this.commandeID,
            
          };
        
        const response = await axios.post("/api/payments", data);
        if (response.status == 201) {
          console.log(response);
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
    async commentaire() {
      try {
        const response = await axios.post("/api/commentaires", this.sendform);
        if (response.status == 201) {
          this.showModalCommentaires = !this.showModalCommentaires;
          this.sendform= {};
           new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Merci pour votre commentaire',
            timeout: 5000,
          }).show( );
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
    async restaurant() {
      try {
        const response = await axios.get("/api/restaurants");
        if (response.data) {
          this.restaurants = response.data.data;
          console.log(this.restaurants);
          this.filteredRestaurants = this.restaurants.filter(
            (restaurant) => restaurant.id === this.restaurantId
          );
          console.log(this.filteredRestaurants);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
      async reservation() {
      try {
        this.addform.restaurant_id = this.restaurantId;
        const response = await axios.post("/api/reservations", this.addform);
        if (response.status == 201) {
          this.showModalReservations = !this.showModalReservations;
          this.addform ={};
          new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Votre reservation à été éffectuer avec succés',
            timeout: 5000,
          }).show( );
        }else {
          this.showModalReservations = !this.showModalReservations;
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
     async getMenus() {
      try {
        const response = await axios.get("/api/menus");
        if (response.data) {
            console.log(response.data.data);
          this.menus = response.data.data;
          console.log(this.menus);
           this.filteredMenus = this.menus.filter(
            (menu) => menu.restaurant.id === this.restaurantId
          );
          console.log(this.filteredMenus);
        }
        
      } catch (error) {
        console.log(error.data);
      }
    },
       async createTransaction() {
      this.addforms.montant = this.filteredMenus[0].prix * this.addforms.quantite;
     openKkiapayWidget({
        amount: this.addforms.montant,
        firstname:this.addforms.name,
        lastname:this.addforms.name,
        api_key: "361197d0e64411ec848227abfc492dc7",
        sandbox: true,
        phone: "61000000",
      });
    },
    successHandler(response) {
      console.log(response);
      this.transationID = response.transactionId;
      console.log(this.transationID);
      
      this.payementmethod();
    },
  },
};
</script>
    
<style scoped>
.custom-background {
  /*background-image: url("~@/assets/la-cuisine.jpg");*/
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
    