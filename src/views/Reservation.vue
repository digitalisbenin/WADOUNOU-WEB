<template>
  <div class="">
    <div class="custom-background h-96"></div>
    <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
    </div>
    <div class="flex">
      <div class="w-1/3 mt-9">
        <transition name="fade" mode="out-in">
          <div :key="currentImage" class="w-full">
            <img
              :src="images[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 ml-16 h-72 object-cover"
            />
            <p class="text-center text-xl font-sans font-bold mt-2">
              {{ images[currentImage].name }}
            </p>
          </div>
        </transition>
      </div>
      <div class="w-1/3 mt-9 ml-2">
        <transition name="fade" mode="out-in">
          <div :key="currentImage" class="w-full">
            <img
              :src="img[currentImage].src"
              :alt="'Image ' + (currentImage + 1)"
              class="w-2/3 ml-16 h-72 object-cover"
            />
            <div class="flex">
              <p class="text-center text-xl font-sans font-bold mt-2 ml-24">
                {{ img[currentImage].name }}
              </p>
              <button
                class="bg-green-600 text-white rounded-full px-2 ml-6 mt-4 ml-12 transform transition duration-300 hover:scale-105"
              >
                Plus info
              </button>
            </div>
          </div>
        </transition>
      </div>

      <div class="w-1/3 mt-9">
        <transition name="fade" mode="out-in">
          <div :key="currentImage" class="w-full">
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
    <!-- component -->
    <div class="flex mt-6">
      <div class="flex-1 border-r-2 pr-4">
        <!-- Contenu à gauche -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
      <div class="flex-1 text-center">
        <!-- Contenu au milieu -->
        <h1 class="text-4xl font-bold">Reservation</h1>
      </div>
      <div class="flex-1 border-l-2 pl-4">
        <!-- Contenu à droite -->
        <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
      </div>
    </div>
     <label for="restaurant" class="mb-3 block text-2xl font-bold mt-12">
              Recherchez un restaurant
            </label>
    <div
      class="rounded-full p-1 mt-4 box-border border border-orange-500 mx-auto my-auto bg-white overflow-hidden ring-red-300 focus:ring-4 w-2/4 flex items-center py-1"
    >
      <input
      v-model="filter"
        type="text"
        class="rounded-full px-4 focus:outline-none w-full"
        placeholder="Recherche ......."
      />
      <button
        class="text-sm bg-green-600 py-2 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
      >
        Search
      </button>
    </div>
    <div class="flex items-center justify-center p-12">
      <!-- Author: FormBold Team -->
      <!-- Learn More: https://formbold.com -->

      <div class="mx-auto w-full max-w-[550px]">
        <form action="#" method="POST" @submit.prevent="reservation()">
          <div class="mb-5 mx-24">
            <label for="restaurant" class="mb-3 block text-2xl font-bold">
              Choisissez un restaurant
            </label>
            <select
              name="restaurant"
              id="restaurant"
              v-model="addform.restaurant_id"
              @click="search"
              class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option
                v-for="(restaurant, index) in filteredRestaurants"
                :key="index"
                :value="restaurant.id"
              >
                {{ restaurant.name }}
              </option>
              <!-- Ajoutez plus d'options au besoin -->
            </select>
          </div>
          <div class="mb-5 mx-24">
            <label for="guest" class="mb-3 block text-2xl font-bold">
              Nombre de place
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              v-model="addform.place"
              placeholder="1"
              min="0"
              class="w-full appearance-none rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class=" mx-24 ">
              <div class="mb-5 ">
                <label for="lName" class="mb-3 block text-2xl font-bold">
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
          <div class="mx-24 flex flex-wrap">
            <div class="w-full sm:w-1/2">
              <div class="mb-5">
                <label for="fName" class="mb-3 block text-2xl font-bold">
                  Nom Complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="fName"
                  v-model="addform.name"
                  placeholder=" Nom Complet"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full  sm:w-1/2">
              <div class="mb-5 ml-2">
                <label for="lName" class="mb-3 block text-2xl font-bold">
                  Contact
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  v-model="addform.contact"
                  placeholder="65962333"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          
          
            <div class="mx-24 ">
              <div class="mb-5">
                <label for="date" class="mb-3 block text-2xl font-bold">
                  Date et Heure
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  v-model="addform.date"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            
          

          <div>
            <button
              class="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "App",
  components: {
   
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
        description: "",
        place: "",
        date: "",
      },
      restaurants: [],
      user: "",
       filter:"",
       showAlert: false,
      alert: {
        message: "",
      },
    };
  },
  computed:{
  
  filteredRestaurants() {
    const searchTerm = this.filter.toLowerCase();
    const filtered_data = this.restaurants.filter((restaurants) => {
      const name = restaurants.name.toLowerCase();
      const adresse = restaurants.adresse.toLowerCase();
      return name.includes(searchTerm) ||  adresse.includes(searchTerm);
    });
    return filtered_data;
  },
  },
  mounted() {
    this.startSlider();
   // this.profile();
    this.restaurant();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 5000); // Défilement toutes les 5 secondes
    },
    search() {
      if (this.addform.restaurant_id !== "" ) {
        this.filter = "";
      }
    },
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.user = response.data.id;
          console.log(this.user);
          
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
    async reservation() {
      try {
        const response = await axios.post("/api/reservations", this.addform);
        if (response.status == 201) {
          this.addform ={};
          new Noty({
            type: 'success',
            layout: 'topRight',
            text: 'Votre reservation à été éffectuer avec succés',
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
  },
};
</script>
  
  <style scoped>
.custom-background {
  background-image: url("~@/assets/reservation.jpg");
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
  