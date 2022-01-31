<template>
     <div class="container-info pt-2 text-light">
        <div class="profile rounded">
            <div class="p-4">
                <button v-if="usuario.id == usuarioId" class="btn text-white float-right" @click="$router.push({name:'gerenciaPerfil'})" >
                    <FontAwesomeIcon icon="cog" />
                </button>
                <div class="media align-items-end">
                    <div class="profile mr-3 pt-2">
                        <b-avatar class="img-thumbnail mb-4 img-lg" :src=usuario.avatar alt="profile image"></b-avatar>

                    </div>
                    <div class="media-body mb-4 text-white">
                        <h4>{{usuario.nome}}</h4>
                        <small class="text-muted mb-0">{{usuario.enderecos_usuario[0] ? usuario.enderecos_usuario[0].cidade.toUpperCase() : '-'}}</small>
                    </div>
                    
                    <div class="p-4 d-flex justify-content-end text-center flex-column">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                                <h5 class="font-weight-bold mb-0 d-block">{{usuario.seguindo.length}}</h5>
                                <small class="text-muted">Seguindo</small>
                            </li>
                            <li class="list-inline-item">
                                <h5 class="font-weight-bold mb-0 d-block">{{usuario.seguidores.length}}</h5>
                                <small class="text-muted">Seguidores</small>
                            </li>
                        </ul>
                        <div class="row">
                            <div class="col">
                                <btnSeguir :autorPublicacao="usuario"></btnSeguir>
                            </div>
                        </div>


                    </div>
                
                </div>
            </div>
            
            <div class="bio px-4 pb-3">
                <h5>Bio</h5>
                <div class="p-2">
                    <p class="font-italic mb-0">{{ usuario.bio ? usuario.bio : '----' }}</p>
                </div>
            </div>
            <div class="bio px-4 pb-3" v-if="this.usuario.tipo_usuario != 2 && (this.usuario.whatsapp || this.usuario.instagram)">
                <h5>Informações de contato</h5>
                <div class="p-2">
                    <span v-if="this.usuario.whatsapp" class="my-2">
                        <font-awesome-icon :icon="['fab', 'whatsapp']" size="lg"/>
                        <a :href="'https://api.whatsapp.com/send?phone=+55'+ `${this.usuario.whatsapp}`+'&text='+'Olá, '+ `${this.usuario.nome}`+'! Vi seu perfil no TattooBook' " target="_blank" class="info-link"> Fale comigo</a>
                    </span>
                    <br>
                    <span v-if="this.usuario.instagram" class="my-2">
                        <font-awesome-icon :icon="['fab', 'instagram']" size="lg"/>
                        <a :href="'https://www.instagram.com/'+`${this.usuario.instagram}`+''" target="_blank" class="info-link">
                         {{this.usuario.instagram}}</a>
                    </span>
                </div>
            </div>

            <div class="bio px-4 pb-3" v-if="this.usuario.tipo_usuario != 2 && (this.usuario.enderecos_usuario[0])">
                <h5>Endereço</h5>
                <div class="p-2">
                    <p v-if="exibirEndereco"> 
                       Cidade: {{this.usuario.enderecos_usuario[0].cidade}} <br>
                       Bairro: {{this.usuario.enderecos_usuario[0].bairro}}<br>
                       Logradouro: {{this.usuario.enderecos_usuario[0].logradouro}}<br>
                       Numero: {{this.usuario.enderecos_usuario[0].numero}}<br>
                       Complemento: {{this.usuario.enderecos_usuario[0].complemento}}
                    </p>
                    <span @click="exibirEndereco = true"  class="exibirTexto" v-if="!exibirEndereco">Exibir</span>
                    <span @click="exibirEndereco = false" class="exibirTexto"  v-if="exibirEndereco">Ocultar</span>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script>

import btnSeguir from "../views/perfilVisitado/btnSeguir"
export default {
    name: 'infoTatuador',
    components: {
      btnSeguir  
    },
    props: [
        'usuario',
    ],
    data() {
        return {
            usuarioId: localStorage.getItem('usuarioId'),
            exibirEndereco: false,
        }
    },
}
</script>

<style scoped>
    .exibirTexto {
        cursor: pointer;
        font-style: italic;
    }
    .exibirTexto:hover{
        color: #833c80;
    }
    .info-link {
        color: #833c80 ;
        margin: 0.2em;
    }
    .container-info{
        text-align: left;
    }
    .profile, .profile-details{
        background-color: #121212;
    }
    .editar{
        background-color: #833c80;
    }
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .posts .row img{
        padding: 1em 0;
    }
    .img-thumbnail{
        background-color: rgb(124, 124, 124);
        overflow: hidden;
        width: 122px;
        height: 122px;
        border: 3px solid white;
    }
</style>
