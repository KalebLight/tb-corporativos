<template>
  <div class="p-5 bg-dark">
    <div class="row">
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
              width="400"
              rounded=""
              :src="publicacao.imagem"
              class=" img-fluid"
            >
            </b-img>
          </div>
        </a>
      </b-card-group>
    </div>
        <div class="w-100 h-100 d-flex align-items-center justify-content-center">
      <PulseLoader v-if="loading" :color="color" :size="size"></PulseLoader>
    </div>
  </div>
</template>

<script>
import serviceAlbuns from "@/service/serviceAlbuns";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  data() {
    return {
      usuarioId: "",
      albunsDoUsuario: [],
      loading: true,
      color: 'white',
      size: '1rem'
    };
  },
  props: ["publicacoes", "usuario"],
  mounted() {
      this.usuarioId = localStorage.getItem("usuarioId")
      serviceAlbuns.listarAlbuns(localStorage.getItem("usuarioId")).then((resposta) => {
          this.albunsDoUsuario = resposta.data;
          this.loading =false
      });
  },
};
</script>
