<template>
    <div class="w-100">
        <div class="w-100 mt-1" v-if="this.usuarioId != this.autorPublicacao.id">
            <b-button @click="seguir"  v-if="this.segue != true" size="sm" class="d-block w-100" variant="light">Seguir</b-button>
            <b-button @click="seguir" v-else size="sm"  variant="light" class="d-block w-100">Seguindo</b-button>
        </div>


        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="warning"
            @dismiss-count-down="countDownChanged"
            >
            Você agora está seguindo {{this.autorPublicacao.nome}} {{ dismissCountDown }}
        </b-alert>

    </div>
</template>

<script>
import serviceSeguir from '@/service/serviceSeguir'

export default {
    name: "btnSeguir",
    props: {
        autorPublicacao: Object
    },

    data(){
        return{
            segue: false,
            usuarioId:localStorage.getItem('usuarioId'),
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    methods: {
        seguir: function(){
            serviceSeguir.seguir(this.autorPublicacao.id).then(resposta=>{
                console.log(resposta.data)
                this.segue = !this.segue
            })
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    },
    mounted() {
        for(let i = 0; i < this.autorPublicacao.seguidores.length; i++){
            if (this.autorPublicacao.seguidores[i] == this.usuarioId) {
                this.segue = true
            }
        }
    },

}
</script>
