<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-0 p-4"
  >
    <div class="justify-between pb-4">
      <div v-show="showAlert">
        <AlertComponent :content="alert.message" type-alert="error" />
      </div>
      <div v-if="filteredLivreur.length === 0">
        <form action="#" method="POST" @submit.prevent="addLivreur()">
          <div>
            <div class="px-4 py-5 bg-white p-6">
              <div class="flex">
                <div class="w-2/3 mr-9">
                  <BaseLabel value="Nom" class="text-left font-bold" />
                  <BaseInput id="nom" v-model="addform.name" class="mt-1" />

                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Adresse"
                      class="text-left mt-2 font-bold"
                    />
                    <BaseInput
                      id="prenom"
                      v-model="addform.adresse"
                      class="mt-1"
                    />
                  </div>
                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Téléphone"
                      class="text-left mt-2 font-bold"
                    />
                    <div class="relative mt-1">
                      <BaseInput
                        v-model="addform.phone"
                        placeholder="62333333"
                        class="mt-1"
                      />
                    </div>
                  </div>
                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Photo de profil"
                      class="text-left mt-2 font-bold"
                    />
                    <BaseInput
                      id="image"
                      type="file"
                      @change="onFileChange"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="w-1/3 h-64 mt-4">
                  <img
                    src="../assets/profil_defaut-1-450x450.png"
                    alt="Logo"
                    class="w-full h-auto"
                  />
                </div>
              </div>

              <div class="col-span-8 sm:col-span-8">
                <BaseLabel
                  value="Pièce d'identité"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  id="image"
                  type="file"
                  @change="onFileChanges"
                  class="mt-1"
                />
              </div>
              <div class="col-span-8 sm:col-span-8">
                <BaseLabel
                  value="Description "
                  class="text-left mt-2 font-bold"
                />
                <div class="mt-1">
                  <textarea
                    class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                    v-model="addform.description"
                    autocomplete="current-password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            class="bg-green-600 text-white px-8 py-2 focus:outline-none rounded-lg mt-2 transform transition duration-300"
          >
            Mettre à jour
          </Button>
        </form>
      </div>
      <div v-else>
        <form action="#" method="POST" @submit.prevent="UpdateLivreur()">
          <div>
            <div
              v-for="(livreur, index) in filteredLivreur"
              :key="index"
              class="px-4 py-5 bg-white p-6"
            >
              <div class="flex">
                <div class="w-2/3 mr-9">
                  <BaseLabel value="Nom" class="text-left font-bold" />
                  <BaseInput id="nom" v-model="livreur.name" class="mt-1" />

                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Adresse"
                      class="text-left mt-2 font-bold"
                    />
                    <BaseInput
                      id="prenom"
                      v-model="livreur.adresse"
                      class="mt-1"
                    />
                  </div>
                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Téléphone"
                      class="text-left mt-2 font-bold"
                    />
                    <div class="relative mt-1">
                      <BaseInput
                        v-model="livreur.phone"
                        placeholder="62333333"
                        class="mt-1"
                      />
                    </div>
                  </div>
                  <div class="col-span-8 sm:col-span-8">
                    <BaseLabel
                      value="Photo de profil"
                      class="text-left mt-2 font-bold"
                    />
                    <BaseInput
                      id="image"
                      type="file"
                      @change="onFileChange"
                      class="mt-1"
                    />
                  </div>
                </div>
                <div class="w-1/3 mt-4">
                  <img class="w-full h-72" :src="livreur.image_url" alt="" />
                </div>
              </div>

              <div class="col-span-8 sm:col-span-8">
                <BaseLabel
                  value="Pièce d'identité"
                  class="text-left mt-2 font-bold"
                />
                <BaseInput
                  id="image"
                  type="file"
                  @change="onFileChanges"
                  class="mt-1"
                />
              </div>
              <div class="col-span-8 sm:col-span-8">
                <BaseLabel
                  value="Description "
                  class="text-left mt-2 font-bold"
                />
                <div class="mt-1">
                  <textarea
                    class="block w-full p-2 border border-input-disable rounded-md focus:outline-none focus:ring-primary-normal focus:ring focus:ring-opacity-50 shadow-sm focus:border"
                    v-model="livreur.description"
                    autocomplete="current-password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            class="bg-green-600 text-white px-8 py-2 focus:outline-none rounded-lg mt-2 transform transition duration-300"
          >
            Mettre à jour
          </Button>
        </form>
      </div>
    </div>
  </div>

  <DeleteModalFooter
    width="w-full md:w-2/3 lg:w-1/3"
    :is-open="showDeleteLivreurModal"
    @cancel="showDeleteLivreurModal = !showDeleteLivreurModal"
    @delete="deleteRestaurant()"
  >
    <template #header>Supprimer</template>
    <template #body> Vous voulez suppprimer ce livreur </template>
  </DeleteModalFooter>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivreur"
    @close-modal="showModalLivreur = false"
  >
    <template #header> Ajouter un Livreur</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addLivreur()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput id="nom" v-model="addform.name" class="mt-2" />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Adresse" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.adresse"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Position" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="addform.position"
                      placeholder="itta"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
                  <BaseInput
                    id="language"
                    v-model="addform.description"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Image" />
                  <BaseInput
                    id="image"
                    type="file"
                    @change="onFileChange"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="document(facultatif)" />
                  <BaseInput
                    id="pdf"
                    type="file"
                    @change="onFileChanges"
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
      <AddModalFooter @cancel="showModalLivreur = false" @send="addLivreur()" />
    </template>
  </TheModal>
  <TheModal
    width="w-full md:w-2/3 lg:w-1/2"
    :is-open="showModalLivreurUpdate"
    @close-modal="showModalLivreurUpdate = false"
  >
    <template #header> Mettre à jour un Livreur</template>

    <template #body>
      <form action="#" method="POST" @submit.prevent="addContact()">
        <div>
          <div class="mt-3 sm:mt-0 sm:col-span-2">
            <div class="px-4 py-5 bg-white p-6">
              <div class="grid grid-cols-8 gap-6">
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Nom " />
                  <BaseInput
                    id="nom"
                    v-model="addform.first_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Adresse" />
                  <BaseInput
                    id="prenom"
                    v-model="addform.last_name"
                    class="mt-2"
                  />
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-4">
                  <BaseLabel value="Télephone" />
                  <div class="relative mt-1">
                    <BaseInput
                      v-model="phone"
                      placeholder="62333333"
                      class="mt-2"
                    />
                  </div>
                </div>
                <div class="col-span-8 sm:col-span-8">
                  <BaseLabel value="Description" />
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
        @cancel="showModalLivreurUpdate = false"
        @send="addContact()"
      />
    </template>
  </TheModal>
</template>

<script>
import axios from "axios";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
import DeleteModalFooter from "../components/DeleteModalFooter.vue";
import TheModal from "../components/TheModal.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import AlertComponent from "../components/AlertComponent.vue";
import AddModalFooter from "../components/AddModalFooter.vue";
export default {
  name: "LivreurDash",
  components: {
    AlertComponent,
    DeleteModalFooter,
    TheModal,
    BaseLabel,
    BaseInput,
    AddModalFooter,
  },
  data() {
    return {
      addform: {
        name: "",
        adresse: "",
        phone: "",
        description: "",
        user_id: "",
        position: "#",
        document_url: "",
        status: "disponible",
        image_url: "",
      },
      showAlert: false,
      alert: {
        message: "",
      },
      processing: false,
      showDeleteLivreurModal: false,
      showModalLivreur: false,
      showModalLivreurUpdate: false,
      user: "",
      livreurs: [],
      filter: "",
    };
  },
  created() {
    this.profile();
    this.getLivreur();
  },
  computed: {
    filteredLivreur() {
      const searchTerm = this.filter.toLowerCase();
      const filtered_data = this.livreurs.filter((livreurs) => {
        const name = livreurs.user.id.toLowerCase();
        return name.includes(searchTerm);
      });

      return filtered_data;
    },
  },
  methods: {
    deleteLivreurModal() {
      this.showDeleteLivreurModal = !this.showDeleteLivreurModal;
    },
    async profile() {
      try {
        const response = await axios.get("/api/profile");
        if (response.data) {
          this.user = response.data.id;
          this.filter = response.data.id;
          console.log(this.user);
          console.log(this.filter);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    async getLivreur() {
      try {
        const response = await axios.get("/api/livreurs");
        if (response.data) {
          this.livreurs = response.data.data;
          console.log(this.livreurs);
        }
      } catch (error) {
        console.log(error.data);
      }
    },
    addLivreur() {
      const formData = new FormData();

      formData.append("file", this.image);

      axios
        .post("api/medias", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.addform.image_url = response.data.data.media_url;
            console.log(this.addform.image_url);
            this.sendLivreur();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async sendLivreur() {
      try {
        this.addform.user_id = this.user;
        const response = await axios.post("/api/livreurs", this.addform);
        if (response.status == 201) {
          console.log(response);
          this.addform = {};
          new Noty({
            type: "success",
            layout: "topRight",
            text: "Votre profile livreur est créer avec succés",
            timeout: 5000,
          }).show();
          this.getLivreur();
        } else {
          this.showModalLivreur = !this.showModalLivreur;
          this.showAlert = true;
          this.alert.message =
            "Quelque chose c'est mal passé. Merci d'essayer plus tard!";
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      } catch (error) {
        if (error.response.status !== 500) {
          this.showAlert = true;
          this.alert.message =
            "Quelque chose c'est mal passé. Merci d'essayer plus tard!";
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.image = file;
    },
  },
};
</script>