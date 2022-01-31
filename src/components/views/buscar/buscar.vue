<template>
    <div class="main">
        <div class="jumbotron text-center text-white jumbotron-fluid p-0 pt-2">
            <div class="container pt-5 pb-3">
                <h1 class="font-weight-bold">Siga o que você gosta!</h1>
                <p class="text-muted">Explore os conteúdos que o TattooBook oferece. <br/> Pesquise por assuntos do seu interesse.</p>


                <div class="form-inline justify-content-center">
                    <div class="input-group pt-3 col-sm-5">
                        <input class="form-control border-0 search" type="search" placeholder="Pesquise por usuário, locais..."
                        name="busca"
                        id="inputBusca"
                        v-model="buscarInput"
                        @keyup.enter="buscar">
                        <span class="input-group-append">
                            <div class="input-group-text border-0 btn-search">
                                <span class="text-black"><FontAwesomeIcon icon="search" /></span>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <div class="container pt-5" style="clear: both;">
                <ul class="list-inline">
                    <!-- <li class="list-inline-item border-bottom">
                        <a class="text-light nav-link" href="#">
                            <span>Tatuadores</span>
                        </a>
                    </li>
                    <li class="list-inline-item border-bottom">
                        <a class="text-light nav-link" href="#">
                            <span>Estúdios</span>
                        </a>
                    </li>
                    <li class="list-inline-item border-bottom">
                        <a class="text-light nav-link" href="#">
                            <span>Tags</span>
                        </a>
                    </li> -->
                </ul>
            </div>
        </div>

        <!-- <h4 class="text-light">Sugestões</h4> -->

        <div class="container">
            <div class="row">
                <div class="col-md-4 pt-3" v-for="resultado in resultados" :key="resultado.id" >
                    <div class="card">
                        <div class="card-body text-center">
                            <div @click="resultado.id == usuario ? $router.push({name:'perfilTatuador', params:{usuarioEscolhido: usuario }}) : $router.push({name:'perfilVisitado', params:{usuarioVisitado: resultado, idUsuarioVisitado: resultado.id }})">
                                <div class="pb-3"> 
                                    <b-avatar class="img-thumbnail mb-4 " :src=resultado.avatar alt="profile image"></b-avatar>

                                    <h4>{{resultado.nome.length > 22 ? resultado.nome.substring(0,22) + "..." : resultado.nome}}</h4>
                                    <small class="text-muted mb-0">{{resultado.enderecos_usuario[0].cidade.toUpperCase()}}</small>
                                </div>
                                <div class="border-top pt-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <h5 class="font-weight-bold mb-0 d-block">{{resultado.seguindo.length}}</h5>
                                            <small class="text-muted">Seguindo</small>
                                        </div>
                                        <div class="col-6">
                                            <h5 class="font-weight-bold mb-0 d-block">{{resultado.seguidores.length}}</h5>
                                            <small class="text-muted">Seguidores</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="seguir">
                                <button class="btn btn-primary w-100" @click="seguir(resultado.id)"
                                v-if="resultado.seguidores.filter(usuarioID => usuarioID == usuario).length == 0 && resultado.id != usuario"
                                >Seguir</button>
                                <button class="btn btn-light w-100" @click="seguir(resultado.id)"
                                v-if="resultado.seguidores.filter(usuarioID => usuarioID == usuario).length != 0 && resultado.id != usuario"
                                >Seguindo</button>
                                <button class="btn btn-secondary w-100 disabled" @click="seguir(resultado.id)"
                                v-if="resultado.id == usuario"
                                >Você</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <h4 class="text-light align-middle" v-if="!resultados || !resultados.length">
                Não temos nada aqui ainda :(
            </h4>

        </div>
    </div>

</template>

<script>
import serviceUsuario from '@/service/serviceUsuario'
import serviceSeguir from '@/service/serviceSeguir'
import btnSeguir from '../../reutilizaveis/btnSeguir'

export default {
    name: 'buscar',
    Components:{
        btnSeguir,
    },
    data(){
        return{
            resultados: '',
            query: 'search=',
            palavraChave:'',
            usuario:localStorage.getItem('usuarioId'),
            enderecoUsuario: '-'
        }
    },
    methods:{
        buscar(){
            this.palavraChave = this.buscarInput
            this.query += this.palavraChave
            console.log(this.query)
            serviceUsuario.buscar(this.query).then(resp =>{
                console.log(resp.data.results)
                this.resultados = resp.data.results
                this.enderecoUsuario =  resp.data.results.enderecos_usuario
                console.log(this.enderecoUsuario)
            }).finally(
                this.query = 'search='
            )
        },
        seguir(idUsuario){
            serviceSeguir.seguir(idUsuario).then(resp =>{
                this.segue = !this.segue
                console.log(resp.data)
                this.buscar()
            })
        },
    },
    created() {
       
    },
}

</script>

<style scoped>
body{
    background-color: #202020;
}
nav{
    background-color: #121212;
}
.jumbotron{
    background-color: #121212;
    border-top-style: solid;
    border-top-color: rgba(71, 71, 71, 0.295);
}
.card{
    background-color: #121212 !important;
    color: #ffffff;
    cursor: pointer;
    transition: all .2s ease-in-out;
}
.search, .btn-search {
    background-color: #ffffff;
}
.card:hover{
    transform: scale(1.05);
}
.img-thumbnail{
    background-color: rgb(124, 124, 124);
    overflow: hidden;
    width: 100px;
    height: 100px;
    border: 3px solid white;
}
.seguindo{
    background-color: gray !important;
}

</style>
