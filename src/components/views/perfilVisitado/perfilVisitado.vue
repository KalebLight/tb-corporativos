<template>
    <div class="container h-100">
        <div >
            <info-tatuador :usuario="usuarioVisitado"></info-tatuador>
        </div>


        <div class="container mt-2">
            <div class="row">


                <div v-if="usuarioVisitado.tipo_usuario == 3" class="col-sm bg-dark m-1 d-flex flex-column align-items-center p-4 text-white" >
                    <div class="d-flex flex-column align-items-center" >
                        <FontAwesomeIcon icon="user-plus" size="3x" />
                        <span class="pt-3">Associar Tatuador</span>

                        <div class="mt-3">
                            <b-button v-b-modal.modal-1 @click="carregarListas">Acessar</b-button>

                            <b-modal :hide-footer="true" id="modal-1" title="Associar tatuadores" >

                                <b-alert variant="success" :show="showAlerta" dismissible >
                                   {{mensagemAlerta}}
                                </b-alert>

                                <div>
                                    <multiselect v-model="tatuador" placeholder="Selecione um tatuador"
                                    :options="tatuadoresLista"
                                    :custom-label="nomeUsuarioTatuador"
                                    :select-label="'Selecionar usuário'"
                                    track-by="usuario"></multiselect>
                                </div>

                                <b-list-group class="my-2">
                                    <label for="lista-tatuadores">Tatuadores Associados</label>
                                    <b-list-group-item class="lista-tatuadores"
                                    v-for="tatuadorAssociado in tatuadoresEstudioLista"
                                    :key="tatuadorAssociado.id">
                                            <span>{{tatuadorAssociado.usuarioVisitado.nome}} • @{{tatuadorAssociado.usuarioVisitado.username}}</span>
                                            <span class="float-right text-danger" id="remover-associacao" @click="removerAssociacao(tatuadorAssociado)">
                                                <FontAwesomeIcon icon="trash"/>
                                            </span>
                                        </b-list-group-item>
                                </b-list-group>

                                <button class="btn btn-primary mt-2 w-100" @click="associar">Associar</button>


                            </b-modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <listarPublicacoes :usuario="usuarioVisitado" :publicacoes="publicacoes"/>
    </div>

</template>

<script>
import infoTatuador from '../../reutilizaveis/infoTatuador'
import servicePublicacoes from '@/service/servicePublicacoes'
import serviceTatuador from '@/service/serviceTatuador'
import Multiselect from 'vue-multiselect'
import serviceUsuario from "@/service/serviceUsuario"
import listarPublicacoes from '../../reutilizaveis/listarPublicacoes'


export default {
    name: 'perfilVisitado',
    props:[
        'usuario',
    ],
    components:{
        infoTatuador,
        Multiselect,
       listarPublicacoes,

    },
    data(){
        return{
            publicacoes: '',
            tatuadoresLista: [],
            tatuador:'',
            tatuadoresEstudioLista:[],
            showAlerta: false,
            estudio:{
                estudio: this.usuario.id
            },
            mensagemAlerta:'',
            usuarioVisitado: '',
        }
    },
    methods:{
        carregarListas(){
            if(this.usuarioVisitado.tipo_usuario == 3){

                this.tatuadoresEstudio()
                this.tatuadores()
            }
        },
        tatuadores(){
                serviceTatuador.tatuadores().then(resp =>{
                    this.tatuadoresLista = resp.data.results
                    this.tatuadoresLista = this.tatuadoresLista.filter((o1) => !this.tatuadoresEstudioLista.some((o2) => o1.id === o2.id))
                })


        },
        nomeUsuarioTatuador({ usuario }) {
            return `${usuario.nome} • @${usuario.username}`
        },
        associar(){
            serviceTatuador.associar(this.tatuador.id ,this.estudio).then(resp =>{
                if(resp.status == 200){
                    this.mensagemAlerta = `${this.tatuador ? '@'+this.tatuador.usuario.username :'O Tatuador'} foi associado`
                    this.carregarListas()
                    this.delayAlerta()
                }
            })
        },
        tatuadoresEstudio(){
            serviceTatuador.tatuadoresEstudio(this.estudio.estudio).then(resp =>{
                this.tatuadoresEstudioLista = resp.data
            })
        },
        removerAssociacao(tatuador){
            serviceTatuador.removerAssociacao(tatuador.id).then(resp =>{
                if(resp.status == 200){
                    this.mensagemAlerta = `${tatuador ? '@'+ tatuador.usuario.username :'O Tatuador'} foi removido`
                    this.carregarListas()
                    this.delayAlerta()
                }
            })
        },
        delayAlerta() {
            this.showAlerta = true;
            setTimeout(() => {
                    this.showAlerta = false;
            }, 2000);
        },
    },
    mounted() {
            
            // pego o usuario visitado
            serviceUsuario.getUsuarioVisitado(this.$route.params.idUsuarioVisitado).then(resposta =>{
                this.usuarioVisitado = resposta.data
            })

            this.carregarListas()
            console.log(this.$route.params.idUsuarioVisitado)
            servicePublicacoes.getPublicacoesUsuario(this.$route.params.idUsuarioVisitado).then(resposta =>{
                this.publicacoes = resposta.data
            })
    },
}
</script>

<style scoped>
#remover-associacao{
    cursor: pointer;
}

</style>
