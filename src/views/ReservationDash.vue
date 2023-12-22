<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-4 mt-9"
  >
    <div class="flex items-center justify-between pb-4">
       <div v-show="showAlert">
      <AlertComponent :content="alert.message" type-alert="error" />
    </div>
      <label for="table-search" class="sr-only">Rechercher</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          wire:model="search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Rechercher ..."
        />
      </div>
      <div>
       
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Nom</th>
          <th scope="col" class="px-6 py-3">Decription</th>
          <th scope="col" class="px-6 py-3">Contact</th>
          <th scope="col" class="px-6 py-3">Place</th>
          <th scope="col" class="px-6 py-3">Date</th>

          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(reservation, index) in filteredReservations"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ reservation.name }}
          </th>
          <td class="px-6 py-4">
            {{ reservation.description }}
          </td>
          <td class="px-6 py-4">
            {{ reservation.contact }}
          </td>
          <td class="px-6 py-4">
            {{ reservation.place }}
          </td>
          <td class="px-6 py-4">
            {{ reservation.date }}
          </td>

          <td class="flex items-center px-6 py-4 space-x-3">
            <button
              class="text-red-500 hover:bg-gray-100 hover:rounded-lg font-medium"
              @click="deleteReservationModal()"
            >
              <span class="flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 pr-2"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd"
                  />
                </svg>
                Supprimer
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteReservationModal"
    @cancel="showDeleteReservationModal = !showDeleteReservationModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer cet reservation </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalReservation"
    @close-modal="showModalReservation = false"
  >
    <template #header> Ajouter une Reservation</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addContact()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="nom" />
                  <BaseInput
                    id="nom"
                    v-model="addform.first_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="prenom" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.last_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="phone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      type="phone"
                      placeholder="62333333"
                      class="pl-9 mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="langue" />
                  <BaseInput
                    id="language"
                    v-model="addform.language"
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
        @cancel="showModalReservation = false"
        @send="addContact()"
      />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalReservationUpdate"
    @close-modal="showModalReservationUpdate = false"
  >
    <template #header> Mettre à jour la Reservation</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addContact()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="nom" />
                  <BaseInput
                    id="nom"
                    v-model="addform.first_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="prenom" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.last_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="phone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      type="phone"
                      placeholder="62333333"
                      class="pl-9 mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="langue" />
                  <BaseInput
                    id="language"
                    v-model="addform.language"
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
        @cancel="showModalReservationUpdate = false"
        @send="addContact()"
      />
    </template>
  </TheModal>
</template>

<script>
import axios from "axios";
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
import AlertComponent from "../components/AlertComponent.vue";
export default {
  name: "ReservationDash",
  components: {
    DeleteModalFooter,
    AlertComponent,
    TheModal,
    BaseLabel,
    BaseInput,
    AddModalFooter,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        // local: null,
      },
      addform: {
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",
        language: "",
        customfield: "",
        customfields: "",
        custom_fields_attribute: "",
        custom_fields_attributes: "",
        custom_fields: "",
      },
      showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteReservationModal: false,
      showModalReservation: false,
      showModalReservationUpdate: false,
      filteredRestaurants: [],
      user: "",
      restaurant_id: "",
      reservations: [],
       filter: "",
      restaurants: [],
    };
  },
  created() {
    this.profile();
    this.getReservation();
    this.restaurant();
  },
  computed: {
      filteredRestaurant() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.restaurants.filter((restaurants) => {
        const name = restaurants.user.id.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },
    filteredReservations() {
  // Vérifiez si filteredRestaurant n'est pas vide
  if (this.filteredRestaurant.length > 0) {
    // Sélectionnez le premier élément de filteredRestaurant
    const selectedRestaurant = this.filteredRestaurant[0];
    
    // Utilisez l'ID du restaurant sélectionné pour filtrer les menus
    const searchTerm = selectedRestaurant.id.toLowerCase();
    
    // Filtrez les menus basés sur l'ID du restaurant
    const filtered_data = this.reservations.filter((reservations) => {
      const restaurantId = reservations.restaurant.id.toLowerCase();
      return restaurantId.includes(searchTerm);
    });

    return filtered_data;
  } else {
    // Retournez tous les menus si filteredRestaurant est vide
    return [];
  }
},

  
  },
  methods: {
    deleteReservationModal() {
      this.showDeleteReservationModal = !this.showDeleteReservationModal;
    },
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.user = response.data.id;
          this.filter= response.data.id;
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
    async getReservation() {
      try {
        const response = await axios.get("/api/reservations");
        if (response.data) {
          this.reservations = response.data.data;
          console.log(this.reservations);
         
        }
      } catch (error) {
        console.log(error.data);
      }
    },
  },
};
</script>