<template>
  <Navbar />
  <router-view></router-view>
  
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
//import HelloWorld from './components/HelloWorld.vue';
import Footer from './components/Footer.vue';


export default {
  name: 'App',
  components: {
    //HelloWorld,
    Navbar,
    Footer,
   
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
</style>
