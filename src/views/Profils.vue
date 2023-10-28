<script>

import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";

// import ApiService from "../../../services/api.service";
export default {
  name: "ProfileVue",
  components: {
    BaseInput,
    BaseLabel,
   
   
  },
  data() {
    return {
      // data table
      alert: {
        type: "",
        message: "",
      },
      security: {
        password: "",
        password_confirmation: "",
      },
      isSubmitting: false,
    };
  },


  created() {
    
  },

  methods: {
   
  },
};
</script>

<template>
  <div  class="p-4">
    <div>
     
      <div class="bg-white my-4 w-full p-4 rounded-lg">
        <form
          method="POST"
          action="#"
          class="space-y-6"
          @submit.prevent="update_user_info()"
        >
          <div class="flex p-2">
            <div class="w-1/2">
              <BaseLabel value="Email" />
              <div class="my-2 w-4/5">
                <BaseInput
                  disabled
                  type="email"
                  
                  autocomplete="current-email"
                  required
                />
              </div>
            </div>
            <div class="w-1/2">
              <BaseLabel value="Nom" />
              <div class="my-2 w-4/5">
                <BaseInput  type="text" required />
              </div>
            </div>
          </div>
          <div class="flex p-2">
            <div class="w-1/2">
              <BaseLabel value="Phone" />
              <div class="my-2 w-4/5">
                <BaseInput disabled type="text"  required />
              </div>
            </div>
            <div class="w-1/2">
              <BaseLabel value="Prenom" />
              <div class="my-2 w-4/5">
                <BaseInput  type="text" required />
              </div>
            </div>
          </div>
          <div class="flex justify-end w-full">
            <button  class="text-center p-2">
              
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div>
      <p class="mb-4">{{ "profil.security" }}</p>
      <div class="bg-white my-4 w-full p-4 rounded-lg">
        <form
          method="POST"
          action="#"
          class="space-y-6 flex"
          @submit.prevent="security_update()"
        >
          <div class="w-1/2 mt-6">
            <BaseLabel value="profil.currentPassword" />
            <div class="my-2 w-3/5">
              <BaseInput
                disabled
                value="xxxxxxxxx"
                type="password"
                autocomplete="current-email"
                required
              />
            </div>
          </div>
          <div class="w-1/2 flex flex-col">
            <div class="w-full">
              <BaseLabel value="profil.newPassword" />
              <div class="my-2 w-4/5">
                <BaseInput
                 
                  type="password"
                  required
                />
              </div>
            </div>
            <div class="w-full">
              <BaseLabel value="profil.confirmPassword" />
              <div class="my-2 w-4/5">
                <BaseInput
                  
                  type="password"
                  required
                />
              </div>
            </div>
            <div class="flex justify-end w-full">
              <button  class="text-center p-2">
                
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    
  </div>
</template>
