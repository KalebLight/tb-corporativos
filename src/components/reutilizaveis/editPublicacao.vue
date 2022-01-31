<template>
    <div>
        <b-button  class="btn text-align-center" v-b-modal.modal-editar-publicacao id="btnEditPubli">
            <FontAwesomeIcon icon="ellipsis-v" size="lg" class="text-align-center" :style="{ color: 'white' }"/>
        </b-button>

        <b-modal centered id="modal-editar-publicacao" size="lg" title="Editar Publicação">
            <div class="row">
                <div class="col">
                    <form
                        class="upload-arquivo d-flex align-items-center flex-column justify-content-center"
                        v-if="nova_publicacao.imagem == '' " >
                        <div style="font-size: 4rem">
                            <FontAwesomeIcon :icon="['fas', 'cloud-upload-alt']" />
                        </div>
                        <span>
                            Nenhum Arquivo foi adicionado
                        </span>
                        <h4>Arraste e solte para adicionar arquivo</h4>
                        <input
                            @change="fileSelected"
                            enctype="multipart/form-data"
                            type="file"
                            id="upload-arquivo"
                            name="upload-arquivo"
                            multiple="multiple">
                    </form>
                    <div
                        v-if="nova_publicacao.imagem != ''"
                        id="preview"
                        class="">
                        <img class="img-fluid" :src="nova_publicacao.imagem" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="tags-basic">Digite o Titulo da sua publicação </label>
                        <input type="text" class="form-control" placeholder="Titulo Publicação" id="input-titulo-publicacao" v-model="nova_publicacao.titulo">
                    </div>
                    <div class="form-group">
                        <label for="tags-basic">Escolha suas tags</label>
                        <div>
                            <multiselect v-model="nova_publicacao.tags" placeholder="Busque suas tags" label="nome" track-by="id" value="id" :options="tags" :multiple="true" ></multiselect>
                        </div>
                    </div>
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button
                        variant="primary"
                        class="btn btn-secondary float-right ml-3"
                        @click="atualizarPublicacao">
                        Atualizar
                    </b-button>

                    <b-button
                        variant="secondary"
                        class="btn btn-secondary float-right"
                        @click="cancelarAtualizacao">
                        Cancelar
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<style scoped>
#btnEditPubli{
    width: 110%;
    border-radius: 50%;    
    background-color: transparent;    
    border: none;
}

#btnEditPubli:hover{
    background-color: #404040
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<script>
import Multiselect from 'vue-multiselect'
import servicePublicacoes from '@/service/servicePublicacoes'

export default {
    components: { Multiselect },
    props:[
        'publicacao'
    ],
    data(){
        return{             
            nova_publicacao: this.publicacao,
            tags:[],

        }
    },
    methods: {

        atualizarPublicacao: function(){

            const formData = new FormData();

            formData.append("titulo",this.nova_publicacao.titulo)
            let a = []

            for(let i= 0 ; i < this.nova_publicacao.tags.length ; i++){
                a.push(this.nova_publicacao.tags[i].id)
            }
            formData.append("tags", a)
            servicePublicacoes.editarPublicacao(this.nova_publicacao.id, formData).then(resposta=>{
                if(resposta.status == 201 || resposta.status == 200){
                    this.$swal.fire(
                        'Publicado!',
                        'Sua foto foi publicada!',
                        'success'
                )}
            }).catch(
                    (error) =>{
                    console.log(error)
                    this.$swal.fire(
                        'Oops...',
                        'Tivemos um problema, tente novamente!',
                        'error',
                    )
                }
            )
        },
        cancelarAtualizacao: function(){
            this.tags = []
            this.$bvModal.hide("modal-editar-publicacao")
        }
          
    },
    mounted() {
        servicePublicacoes.getTags().then(resposta => {
            this.tags = resposta.data.results
            console.log(this.tags)
        })
    },
}
</script>
