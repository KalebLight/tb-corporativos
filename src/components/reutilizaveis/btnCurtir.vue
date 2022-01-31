<template>
  <div>
    <div v-if="!this.curtida" class="d-flex">
      <b-button variant="like" @click="curtir" class="p-0">
        <FontAwesomeIcon icon="fire" />
      </b-button>
      <p class="text-white mt-3 ml-2">
        {{ this.publicacao.curtida_por.length }}
      </p>
    </div>

    <div v-if="this.curtida" class="d-flex">
      <b-button variant="deslike" @click="curtir" class="p-0">
        <FontAwesomeIcon icon="fire" />
      </b-button>
      <p class="text-white mt-3 ml-2">
        {{ this.publicacao.curtida_por.length }}
      </p>
    </div>
  </div>
</template>

<script>
import serviceCurtir from "@/service/serviceCurtidas";
export default {
  name: "btnCurtir",
  props: {
    publicacao: Object,
  },

  data() {
    return {
      curtida: false,
      usuario: localStorage.getItem("usuarioId"),
    };
  },

  methods: {
    curtir: function() {
      serviceCurtir.curtir(this.publicacao.id).then((resposta) => {
        this.publicacao.curtida_por = resposta.data[1].curtida_por;
        this.curtida = !this.curtida;
      });
    },
  },
  mounted() {
    for (let i = 0; i < this.publicacao.curtida_por.length; i++) {
      let a = localStorage.getItem("usuarioId");

      console.log(a);

      console.log(this.publicacao.curtida_por[i]);
      if (this.publicacao.curtida_por[i] == a) {
        this.curtida = true;
      }
    }
  },
};
</script>
