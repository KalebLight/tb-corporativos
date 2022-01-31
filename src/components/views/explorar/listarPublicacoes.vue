<template>
  <div class="m-3">
    <div v-if="loading" class="w-100 h-100 d-flex align-items-center justify-content-center">
      <PulseLoader  :color="color" :size="size"></PulseLoader>
    </div>

    <div class="row m-1" v-if="!loading">
      <b-card-group columns>
        <a
          v-for="publicacao in publicacoes"
          :key="publicacao.id"
          @click="
            $router.push({
              name: 'detalharPublicacao',
              params: {
                publicacaoId: publicacao.id,
                usuario: usuario,
                albunsDoUsuario: albunsDoUsuario,
              },
            })
          "
          type="button"
        >
          <div class="card card-rounded ">
            <b-img
              rounded=""
              :src="publicacao.imagem"
              class="card-img img-fluid animate__animated animate__fadeIn"
            >
            </b-img>
          </div>
        </a>
      </b-card-group>
    </div>

  </div>
</template>

<script>
import serviceAlbuns from "@/service/serviceAlbuns";
import servicePublicacoes from "@/service/servicePublicacoes";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "listarPublicacoes",
  props: ["usuario"],
  components: {
    PulseLoader
  },
  data() {
    return {
      publicacoes: "",
      usuarioId: "",
      albunsDoUsuario: [],
      loading: true,
      color: 'white',
      size: '1rem'
    };
  },

  mounted() {

    (this.usuarioId = localStorage.getItem("usuarioId")),

    serviceAlbuns
      .listarAlbuns(localStorage.getItem("usuarioId"))
      .then((resposta) => {
        this.albunsDoUsuario = resposta.data;


      });
      servicePublicacoes.listarPublicacoes().then((resposta) => {
        this.publicacoes = resposta.data.slice().reverse();
                      this.loading = false
      });
  },
};
</script>

<style scoped>
	@media (max-width: 5000px) and (min-width: 300px) {
		.card-columns {
			column-count: 3 !important;
		}
	}
</style>
