<template>
  <div class="">
    <div class="custom-background h-96"></div>
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
    <div class="flex items-center justify-center p-36">
      <!-- Author: FormBold Team -->
      <!-- Learn More: https://formbold.com -->

      <div class="mx-auto w-full max-w-[550px]">
        <form action="#" method="POST" @submit.prevent="reservation()">
          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
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
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
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
          <div class="mb-5">
            <label for="guest" class="mb-3 block text-2xl font-bold">
              Nombre de place
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              v-model="addform.place"
              placeholder="5"
              min="0"
              class="w-full appearance-none rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div class="mb-5">
            <label for="restaurant" class="mb-3 block text-2xl font-bold">
              Choisissez un restaurant
            </label>
            <select
              name="restaurant"
              id="restaurant"
              v-model="addform.restaurant_id"
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

          <div class="-mx-3 flex flex-wrap">
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label for="date" class="mb-3 block text-2xl font-bold">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  v-model="addform.date"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:w-1/2">
              <div class="mb-5">
                <label for="time" class="mb-3 block text-2xl font-bold">
                  Heure
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  class="w-full rounded-md border border-gray-400 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              class="hover:shadow-form rounded-md bg-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "App",
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
    };
  },
  mounted() {
    this.startSlider();
    this.profile();
    this.restaurant();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 5000); // Défilement toutes les 5 secondes
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
  