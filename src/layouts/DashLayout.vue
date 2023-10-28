<template>

<div class="flex h-screen">
  <!-- Barre latérale -->
  <div class="w-1/7 shadow-2xl bg-gray-800 text-white ">
    <!-- Logo du tableau de bord -->
    <router-link class="flex items-center" to="/">
        <img src="../assets/WADOUNOU.png" alt="Logo" class="h-24 mt-4 w-auto" />
        
      </router-link>
    <div class="p-4 text-2xl font-bold">Dashboard</div>

    <!-- Menu de la barre latérale -->
    <ul class="py-4">
       <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/restaurantdash">Restaurants</router-link></li>
     <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/repasdash">Repas</router-link></li>
       <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/commandeDash">Commandes</router-link></li>
       <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/livreurDash">Livreurs</router-link></li>
        <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/livraisonDash">Livraisons</router-link></li>
       <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/reservationDash">Reservations</router-link></li>
       <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/profils">Profils</router-link></li>
      <li class="px-4 py-2 hover:bg-gray-600"><router-link class="text-slate-950 hover:text-gray-300" active-class="text-green-600" to="/">Aller au site</router-link></li>
      
      
      
      
    </ul>
  </div>

  <!-- Contenu du tableau de bord -->
  <div class="w-full p-4">
    <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>
