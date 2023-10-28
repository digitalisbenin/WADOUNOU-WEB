<script>
import axios from "axios";
import TokenService from "../services/storage.service";
import ApiService from "../services/api.service";
export default {
  name: "LoginForm",

  data() {
    return {
      form: {
        email: "",
        password: "",
        // local: null,
      },
      alert: {
        type: "",
        message: "",
      },
      processing: false,
    };
  },
  // created() {
  //   this.form.local = this.$i18n.locale;
  // },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          '/api/auth/login',
          this.form
        );
       if (response.data.access_token) {
          TokenService.saveToken(response.data.access_token);
          ApiService.setHeader();
        
          this.$router.push("/restaurantdash");
        }
      } catch (error) {
        console.log(error.data);
      }
    },
  },
};
</script>

<template class="">
  <div
    class="p-6 space-y-4 md:space-y-6 sm:p-8 w-1/3 text-white mx-auto my-auto mt-4 mb-4 box-shadow-all-sides"
  >
    <h1 class="font-bold text-xl text-white">Se connecter</h1>
    <form
      method="POST"
      action="#"
      class="space-y-4 md:space-y-6"
      @submit.prevent="login()"
    >
      <div class="">
        <label class="block font-bold text-sm text-white text-left"
          >Email</label
        >
        <div class="mt-1">
          <input
            class="block w-full p-2 border border-input-disable rounded-md text-gray-800 focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
            type="email"
            v-model="form.email"
            autocomplete="current-email"
            required
          />
        </div>
      </div>
      <div class="space-y-1 mt-5">
        <label class="block font-bold text-sm text-white text-left"
          >Password</label
        >
        <div class="mt-1">
          <input
            class="block w-full p-2 border border-input-disable rounded-md focus:outline-none text-gray-800 focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
            type="password"
            v-model="form.password"
            autocomplete="current-password"
            required
          />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="hidden sm:flex sm:items-start">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="rounded border-gray-300 mt-1 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div class="ml-1 text-sm">
            <label
              for="remember"
              class="text-sm font-medium text-primary-normal dark:text-gray-300"
              >Se souvenir de moi
            </label>
          </div>
        </div>

        <a
          href="/auth/forgot-password"
          class="text-sm font-medium text-primary-normal hover:underline dark:text-primary-500"
        >
          Mot de passe oublie
        </a>
      </div>

      <Button
        type="submit"
        class="bg-green-600 text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
      >
        Connexion
      </Button>
    </form>
    <p class="text-sm text-white">
      Pas encore de compte
      <a
        href="/auth/register"
        class="font-sans text-blue-700 hover:underline dark:text-primary-500"
      >
        Inscrivez vous ici</a
      >
    </p>
  </div>
</template>
<style scoped>
.box-shadow-all-sides {
  box-shadow: 1px 1px 8px rgba(0.2, 0.2, 0.2, 0.2); /* Ajustez les valeurs en conséquence */
}
</style>