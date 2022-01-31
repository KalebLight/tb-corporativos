<template>
  <div>
    <div class="container h-100">
      <infoTatuador :usuario="usuario"></infoTatuador>
    </div>

    <div class="w-100 h-100 d-flex align-items-center justify-content-center m-2">
      <PulseLoader v-if="loadingGaleria" :color="color" :size="size"></PulseLoader>
    </div>
    <div class="cardsAlbuns mx-auto mt-5 col-md-10 container">
      <a
        v-for="album in albuns"
        :key="album.id"
        class="btn"
        @click="
          $router.push({
            name: 'paginaAlbum',
            params: { idAlbum: album.id },
          })
        "
      >
        <div class="album border ">
          <img
            width="200"
            :src="album.publicacao_id[0].imagem"
          />
        </div>
        <h5 class="d-flex mt-2 text-white">{{ album.nome }}</h5>
      </a>
    </div>
  </div>
</template>
<script>
import infoTatuador from "../../reutilizaveis/infoTatuador";
import serviceAlbuns from "@/service/serviceAlbuns";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "Galeria",
  props: ["usuario"],

  components: { infoTatuador, PulseLoader },

  data() {
    return {
      // usuario: '',
      novoAlbum: {
        publicacao_id: [1],
        criador_id: this.usuario.id,
        nome: "",
      },
      albuns: "",
      loadingGaleria: true,
      color: 'white',
      size: '1rem'
    };
  },
  methods: {
    criarAlbum() {
      this.$swal
        .fire({
          title: "Deseja realmente criar album?",
          text: "Ao criar esse album ele aparecerá no seu perfil!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Criar",
        })
        .then((result) => {
          if (result.value) {
            serviceAlbuns
              .criarAlbum(this.novoAlbum)
              .then((resposta) => {
                console.log(resposta.data);
                if (resposta.status == 201 || resposta.status == 200) {
                  this.$swal
                    .fire("Criado!", "Seu album foi criado!", "success")
                    .then((result) => {
                      console.log(result);
                      this.reloadPagina(true);
                    });
                }
              })
              .catch((error) => {
                this.$swal.fire(
                  "Oops...",
                  "Tivemos um problema, tente novamente!",
                  "error"
                );
                console.log(error);
              });
          }
        });
    },
    reloadPagina: function(reload) {
      location.reload(reload);
    },
  },

  mounted() {
    serviceAlbuns
      .listarAlbuns(localStorage.getItem("usuarioId"))
      .then((resposta) => {
        this.albuns = resposta.data;
        this.loadingGaleria = false;
      });
  },
};
</script>
<style scoped>
.divInfoTatuador {
  background-color: #1a1919 !important;
  border-width: 7px !important;
  border-color: #131313 !important;
  border-radius: 10px;
}
a.fill-div {
  display: block;
  position: relative;
  text-decoration: none;
}

.divLocation > h6 {
  font-size: 10px;
  margin-left: 5px;
}

.cardsAlbuns .album {
  background-color: #1a1919;
  border-width: 7px !important;
  border-color: #131313 !important;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 200px;
  width: 200px;
}
</style>
