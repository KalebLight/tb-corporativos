<template>
    <div id="estrutura" class="bg-fundo w-100 h-100">
        <Navbar :usuario="usuario"></Navbar>

        <div class="">
            <router-view :usuario="usuario"></router-view> 
        </div>
    </div>
</template>

<script>

import Navbar from './Navbar'
import serviceUsuario from '@/service/serviceUsuario'

export default {
    name: 'modeloEstruturaPagina',
    Components:{
        Navbar
    },
    data(){
        return{
            usuario: ''
        }
    },
    mounted() {
        serviceUsuario.getUsuarioLogado().then(resposta=>{
            if(resposta.status == 200){
                this.usuario = resposta.data

                localStorage.setItem('usuarioId', this.usuario.id)
            }
        }).catch(
            (error) =>{
                this.$router.push({name: 'login'})
                console.log(error)
        })
    },

}
</script>

<style scoped>
    #estrutura{
        min-width: 100vw;
        min-height: 100vh;
        overflow-x: hidden;
    }

</style>