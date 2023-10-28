<template>
  <div class="">
    <div class="custom-background  h-96">
    </div>
    <div class="flex">
      <div class="w-1/3 mt-9">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img :src="images[currentImage].src" :alt="'Image ' + (currentImage + 1)" class="w-2/3 h-72 ml-16 object-cover">
            <p class="text-center text-xl font-sans font-bold mt-2">{{ images[currentImage].name }}</p>
          </div>
        </transition>
      </div>
      <div class="w-1/3 mt-9">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img :src="img[currentImage].src" :alt="'Image ' + (currentImage + 1)" class="w-2/3 h-72 ml-16 object-cover">
            <p class="text-center text-xl font-sans font-bold mt-2">{{ img[currentImage].name }}</p>
          </div>
        </transition>
      </div>
      <div class="w-1/3 mt-9">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img :src="image[currentImage].src" :alt="'Image ' + (currentImage + 1)" class="w-2/3 h-72 ml-16 object-cover">
            <p class="text-center text-xl font-sans font-bold mt-2">{{ image[currentImage].name }}</p>
          </div>
        </transition>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto my-12 px-6">
      <div class="flex">
        <div class="flex-1 border-r-2 pr-4">
          <!-- Contenu à gauche -->
          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
        </div>
        <div class="flex-1 text-center">
          <!-- Contenu au milieu -->
          <h1 class="text-4xl font-bold">Restaurants</h1>
        </div>
        <div class="flex-1 border-l-2 pl-4">
          <!-- Contenu à droite -->
          <h1 class="text-4xl font-bold border border-red-200 mt-4"></h1>
        </div>
      </div>
 <div class="flex mt-4 flex-wrap">
    <div v-for="(restaurant, index) in restaurants" :key="index" class="w-1/3 p-4">
        <div class="bg-white transform transition duration-700 hover:scale-105 p-6 rounded-2xl hover:shadow-xl">

          <div class="overflow-hidden rounded-2xl flex flex-grow">
            <img class="transform transition duration-700 hover:scale-125 h-72 w-full"
              :src="restaurant.image_url" alt={title} />
          </div>

          <div class="flex mt-6 space-x-3 ">

            <div class="flex flex-col space-y-3">
              <h1 class="text-2xl text-gray-800 poppins"> {{restaurant.name}}</h1>
              <p class="text-sm text-gray-500 poppins">{{restaurant.description}}</p>
              <router-link class="bg-green-600 text-white px-4 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105 text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/restaurantdetail">Plus
                Info</router-link>
            </div>
          </div>
        </div>
    </div>
</div>
    
    </div>

  </div>
</template>
  
<script>
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      images: [
        { src: require('@/assets/breakfast2.png'), name: 'Petit-déjeuner 1' },
        { src: require('@/assets/breakfast4.png'), name: 'Petit-déjeuner Bénin' },
        { src: require('@/assets/breakfast6.png'), name: 'Petit-déjeuner ' },
        { src: require('@/assets/lunch3.png'), name: 'Déjeuner' },
      ],
        
        image: [
        { src: require('@/assets/lunch4.png'), name: 'Plat Africa' },
        { src: require('@/assets/lunch5.png'), name: 'Plat Bénin' },
        { src: require('@/assets/lunch6.png'), name: 'Déjeuner Sud' },
        { src: require('@/assets/dinner2.png'), name: 'Déjeuner Nord' },
      ],
      img: [
        { src: require('@/assets/salmon-518032_960_720.jpg'), name: 'Pizza' },
        { src: require('@/assets/food-712665_960_720.jpg'), name: 'Chawma' },
        { src: require('@/assets/photo-1565299624946-b28f40a0ae38.png'), name: 'Burger' },
        { src: require('@/assets/photo-1512621776951-a57141f2eefd.png'), name: 'Déjeuner Chinois' },
      ],
      currentImage: 0,
      restaurants: [],
    };
  },
  mounted() {
    this.startSlider();
    this.restaurant();
  },
  methods: {
    startSlider() {
      setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 5000); // Défilement toutes les 5 secondes
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
  },
};

</script>
  
<style scoped>
.custom-background {
  background-image: url('~@/assets/restaurant-1837150_640.jpg');
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
}</style>
  