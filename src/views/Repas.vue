<template>
    <div class="">
      <div class="custom-background   h-96  ">
        
  
      </div>
      <div class="flex">
      <div class="w-1/3 mt-4">
                <transition name="fade" mode="out-in">
                    <div :key="currentImage">
                        <img :src="images[currentImage].src" :alt="'Image ' + (currentImage + 1)"
                            class="w-2/3 h-72 object-cover ml-16">
                        <p class="text-center text-xl font-sans font-bold mt-2">{{ images[currentImage].name }}</p>
                    </div>
                </transition>
            </div>
      <div
        class="z-0 flex flex-row items-start justify-center w-screen h-screen pt-20 -mb-16 bg-gray-50 lg:bg-white lg:mb-20 lg:w-1/3 lg:h-96 lg:pt-0">
        <img class="absolute left-0 lg:left-auto lg:-mt-64" src="../assets/Rectangle_1.png" alt="" />
        <img class="ml-64 lg:-mt-16" src="../assets/Rectangle_2.png" alt="" />
      </div>
      <div class="w-1/3 mt-4 ml-4">
        <transition name="fade" mode="out-in">
          <div :key="currentImage">
            <img :src="image[currentImage].src" :alt="'Image ' + (currentImage + 1)" class="w-2/3 ml-16 h-72 object-cover">
            <p class="text-center text-xl font-sans font-bold mt-2">{{ image[currentImage].name }}</p>
          </div>
        </transition>
      </div>
    </div>
      <h1 class="text-4xl font-bold ">Repas</h1>
   <div class="flex mt-4 flex-wrap">
    <div v-for="(repas, index) in repass" :key="index" class="w-1/4 p-4">
        <div class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 rounded-lg relative ml-4">
            <span class="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4">{{ repas.foodType }}</span>

            <img class="h-60 w-72 mx-auto transform transition duration-300 hover:scale-105" :src="repas.image_url" alt="" />
            <div class="flex flex-col items-center my-3 space-y-2">
                <h1 class="text-gray-900 poppins text-lg">{{ repas.name }}</h1>
                <p class="text-gray-500 poppins text-sm text-center">{{ repas.description }}</p>
                <h2 class="text-gray-900 poppins text-2xl font-bold">{{ repas.prix }}</h2>
                <button @click="showModalRepas = true" class="bg-green-600 text-white px-8 py-2 focus:outline-none poppins rounded-full mt-4 transform transition duration-300 hover:scale-105">Commander</button>
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
        currentImage: 0,
      };
    },
    mounted() {
      this.startSlider();
      this.getRepas();
    },
    methods: {
      startSlider() {
        setInterval(() => {
          this.currentImage = (this.currentImage + 1) % this.images.length;
        }, 5000); // Défilement toutes les 5 secondes
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
    },
  };
  
  </script>
  
  <style scoped>
  .custom-background {
    background-image: url('~@/assets/4.-repas.jpg');
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
  