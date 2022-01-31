<template>
  <div class="p-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-white m-3">{{ album.nome }}</h2>
        </div>
      </div>
      <div class="row mt-5">
        <div class="p-5">
          <b-card-group columns>
            <a
              v-for="publicacao in album.publicacao_id"
              :key="publicacao.id"
              @click="
                $router.push({
                  name: 'detalharPublicacao',
                  params: {
                    publicacaoId: publicacao.id,
                    albunsDoUsuario: albunsDoUsuario,
                    usuario: usuario,
                  },
                })
              "
              type="button"
            >
              <div class="card card-rounded ">
                <b-img
                  rounded=""
                  :src="publicacao.imagem"
                  class="card-img img-fluid"
                >
                </b-img>
              </div>
            </a>
          </b-card-group>
        </div>
      </div>
    </div>
    <div class="w-100 h-100 d-flex align-items-center justify-content-center">
      <PulseLoader v-if="loadingGaleria" :color="color" :size="size"></PulseLoader>
    </div>
  </div>
</template>
<script>
import serviceAlbuns from "@/service/serviceAlbuns";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "paginaAlbum",
  props: ["usuario"],
  components: {
    PulseLoader
  },
  data() {
    return {
      album: "",
      albumId: this.$route.params.idAlbum,
      albunsDoUsuario: "",
      usuarioId: "",
      loadingGaleria: true,
      color: 'white',
      size: '1rem'
    };
  },
  mounted() {
    this.albumId = this.$route.params.idAlbum;

    this.usuarioId = localStorage.getItem("usuarioId");

    serviceAlbuns.detalharAlbum(this.albumId).then((resposta) => {
      this.album = resposta.data;
      console.log(this.album);
      this.loadingGaleria = false;

    });
    serviceAlbuns.listarAlbuns(this.usuarioId).then((resposta) => {
      this.albunsDoUsuario = resposta.data;
      this.loadingGaleria = false;
    });
  },
};
</script>
<style scoped>
.tudo {
  height: 100%;
  width: 100%;
}
</style>
