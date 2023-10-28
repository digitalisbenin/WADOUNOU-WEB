<template>

<div class="flex ">
  <!-- Barre latérale -->
  <div class="w-2/4   ">
    <!-- Logo du tableau de bord -->
    <router-link class="" to="/">
        <img src="../assets/people-2576336_960_720.jpg" alt="Logo" class="w-full h-screen" />
        
      </router-link>
    
  </div>

  <!-- Contenu du tableau de bord -->
  <div class="w-2/4 p-4 ">
    <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: 'RegisterLayout',
};
</script>



