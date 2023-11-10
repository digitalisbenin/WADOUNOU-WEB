// src/routes.js
import { createRouter, createWebHistory } from 'vue-router';


// Importez les composants associés à chaque route
import Home from './views/Home.vue';
import Restaurant from './views/Restaurant.vue';
import Repas from './views/Repas.vue';
import Reservation from './views/Reservation.vue';
import Commande from './views/Commande.vue';
import RestaurantDetail from './views/RestaurantDetail.vue';
import RestaurantDash from './views/RestaurantDash.vue';
import CommandeDash from './views/CommandeDash.vue';
import CategoryDash from './views/CategoryDash.vue';
import LivreurDash from './views/LivreurDash.vue';
import RepasDash from './views/RepasDash.vue';
import MenuDash from './views/MenuDash.vue';
import LivraisonDash from './views/LivraisonDash.vue';
import ReservationDash from './views/ReservationDash.vue';
import Profils from './views/Profils.vue';
import LoginForm from './views/LoginForm.vue';
import RegisterFrom from './views/RegisterFrom.vue';
import DashLayout from './layouts/DashLayout.vue';
import LoginLayout from './layouts/LoginLayout.vue';
import RegisterLayout from './layouts/RegisterLayout.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/restaurant', component: Restaurant },
  { path: '/repas', component: Repas },
  { path: '/reservation', component: Reservation },
  { path: '/commande', component: Commande },
  { path: '/restaurantdetail', component: RestaurantDetail },
  {
    path: '/auth/login',
    component: LoginForm,
    meta: { layout: LoginLayout, public: false },
  },
  {
    path: '/auth/register',
    component: RegisterFrom,
    meta: { layout: RegisterLayout, public: false }
  },
  {
    path: "/restaurantdash",
    component: RestaurantDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/commandeDash",
    component: CommandeDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/categorys",
    component: CategoryDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/livreurDash",
    component: LivreurDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/repasdash",
    component: RepasDash,
    meta: { layout: DashLayout, public: false },
  },
  {
  path: "/menudash",
  component: MenuDash,
  meta: { layout: DashLayout, public: false },
},
  {
    path: "/livraisonDash",
    component: LivraisonDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/reservationDash",
    component: ReservationDash,
    meta: { layout: DashLayout, public: false },
  },
  {
    path: "/profils",
    component: Profils,
    meta: { layout: DashLayout, public: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;