<template>

        <div class="bg-dark w-100">

            <b-navbar toggleable="lg" type="dark" class="bg-dark d-flex justify-content-end p-3" variant="info">
                <router-link class="btn btn-outline-light float-right" to="Cadastro">Registre-se</router-link>
            </b-navbar>

            <div class="d-flex my-auto p-5">
                <b-card class="mx-auto my-auto col-lg-3 col-md-4 col-sm-12 my-5 ">
                    <div class="mb-3 card-header box-logo-card">
                        <img width="80" src="../../assets/img/logo.png" alt="">
                    </div>

                    <h2 class="mb-3 text-left text-white font-weight-bold">Seja bem-vindo ao TattooBook! Entrar</h2>
                    
                    <div class="mb-5">
                        <form class="text-left">
                            <div class="form-group">
                                <label class="text-white" for="inputEmailLogin">Username </label>
                                <input
                                    required
                                    v-model="usuario.username"
                                    type="text" 
                                    class="form-control" 
                                    id="inputEmailLogin" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Digite seu username">
                            </div>
                            <div class="form-group">
                                <label class="text-white" for="inputEmailSenha">Senha</label>
                                <input
                                    required
                                    v-model="usuario.password" 
                                    type="password" 
                                    class="form-control" 
                                    id="inputEmailSenha" 
                                    placeholder="Digite sua Senha" v-on:keyup.enter="logar">
                            </div>
                            <div class="form-group text-right">
                                <a href="http://" style="color: #4c4c4c"><small>Esqueci minha senha</small></a>
                            </div>
                            <button type="button" class="btn btn-primary btn-block" @click="logar" v-if="!loading">Enviar</button>
                            <button type="button" class="btn btn-secondary btn-block" disabled v-if="loading">
          
                                <b-spinner class="mr-1" small label="Small Spinner"> </b-spinner>
                                <!-- <PulseLoader v-if="loading" :color="color" :size="size"></PulseLoader> -->


                               
                            </button>

                        </form>
                    </div>

                </b-card>
                

            </div>

        </div>

</template>
<script>
import serviceLogin from '@/service/login'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import axios from 'axios'

export default {
    name: 'login',
    components:{
        // PulseLoader
    },
    data(){
        return{
            usuario:{
                username:'',
                password:''
            },
            usuarioLogado: {},
            loading: false,
            size: '0.5rem',
            color: 'white',

        }
    },
    methods:{
        logar: function(){
            this.loading = true
            serviceLogin.login(this.usuario).then(resposta => {
                console.log(resposta.data)
                if(resposta.status == 200){
                    console.log("Logou")
                    localStorage.setItem('token', resposta.data.token)
                    axios.defaults.headers.common['Authorization'] = 'Token '+resposta.data.token ;
                    this.$router.push({name: 'paginaInicial'})
                    this.$emit('buscaUsuario')
                    this.loading = false
                }
            }).catch(
                (error) =>{
                    var showError = {...error.response.data.non_field_errors}
                    showError = showError ? showError[0] : 'Tivemos um problema, tente novamente!'
                    console.log(showError) 
                    this.$swal.fire(
                        'Oops...',
                        showError,
                        'error',
                    )
                    this.loading = false
                }
            )
        }

    }
}
</script>

<style scoped>
    input, input.form-control, input.form-control:hover, input.form-control:focus, input.form-control:active{
        background-color: #2b2b2b !important;
        background: #2b2b2b !important;
        color: white;
        border-color: #2b2b2b !important;
    }
</style>