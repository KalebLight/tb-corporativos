<template>
  <div class="bg-dark w-100">
    <p class="w-100 border-bottom headerText">Tatuadores cadastrados</p>

    <!-- <div v-if="loading" class="w-100 h-100 d-flex align-items-center justify-content-center">
      <PulseLoader :color="color" :size="size"> </PulseLoader>
    </div> -->

    <!-- <div v-if="!loading" class="w-100 p-5 cardsContainer"> -->


      <div class="text-white m-2 p-3 row justify-content-start cardTatuador "
       v-for="tatuador in tatuadores" :key="tatuador.id">
          
        <div class="d-flex mt-3 mr-2 align-items-center flex-column ">
          <b-avatar size="7rem" class=" mb-3 " :src=tatuador.usuario.avatar />
          <p class="tatuadorNome">{{tatuador.usuario.nome}}</p>
        </div>

        <div class="cardInfos">

          <div class="infoContainer d-flex  align-items-center">
            <FontAwesomeIcon class="iconFontAwesome mr-3 mt-n3"  icon="map-marker-alt" />
            <p class="infoText">
              {{tatuador.usuario.enderecos_usuario[0].cidade}}/{{tatuador.usuario.enderecos_usuario[0].estado}}
            </p>
          </div>

          <div class="mt-4 infoContainer d-flex align-items-center">
            <FontAwesomeIcon class="iconFontAwesome mr-3 mt-n3"  icon="envelope" />
            <p class="infoTextEmail">
              {{tatuador.usuario.email}}
            </p>
          </div>

          <div class="mt-4 infoContainer d-flex align-items-center">
            <font-awesome-icon  class="iconFontAwesome mr-3 mt-n3" :icon="['fab', 'whatsapp']" size="lg"/>
            <p class="noNumberText" v-if="!tatuador.usuario.whatsapp">
              Número não informado
            </p>
             <p v-if="tatuador.usuario.whatsapp" class="infoTextEmail">
              {{tatuador.usuario.whatsapp}}
            </p>
          </div>

        </div>

      </div>
    <!-- </div> -->
  </div>
</template>

<script>
  import serviceTatuador from "../../../service/serviceTatuador";
  // import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default 
  {
    name: "tatuadores",
    components:{
      // PulseLoader
    },
    data(){
      return {
        loading: false,
        tatuadores: '',
        color: 'white',
        size: '1rem'
      }
    },
    mounted() {
     
      serviceTatuador.tatuadores().then((resposta) => {
        console.log(resposta.data.results);
        this.tatuadores = resposta.data.results;
        this.loading = false
      })
    }
  }
</script>

<style scoped>
.tatuadorNome{
  text-align: center;
}
.cardsContainer{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.cardTatuador{
  display: flex;
  width: 340px !important;
  height: 200px;
  background: #333;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: 1s;
  flex-wrap: nowrap;
}
.cardTatuador:hover{
  transition: 0.5s;
  background-color: #1b1b1b;
  border: 1px solid gray;
}
.cardInfos{
  height: 80%;
  width: 200px;
  padding-left: 15px;
  margin-top: 35px;
}

.infoContainer{
  height: 20px;
}

.infoText{
  font-size: 13px;
  text-align: start;
}

.noNumberText{
  font-size: 13px;
  text-align: start;
  color: #898989 !important
}

.infoTextEmail{
   font-size: 13px;
  text-align: start;
  word-wrap: anywhere;
}
.iconFontAwesome{
  font-size: 25px;
  color:#ad2549;
}

.headerText{
  text-align: start;
  padding: 20px 0px 0px 10px;
  font-size: 30px;
  color: white
}
</style>