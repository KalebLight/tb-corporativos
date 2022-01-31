<template>
    <div>
        <button
            style="width: 3em; height: 3em; color:#fff;"
            class="btn rounded-circle float-left"
            @click="$bvModal.show('modal-salvar-imagem'+publicacao.id)"
        >
            <FontAwesomeIcon :icon="['fa', 'bookmark']" size="lg"/>
        </button>    

        <b-modal
        centered
        :id="'modal-salvar-imagem'+publicacao.id"
        size="lg"
        title="Cadastrar Publicação"
        >

            <div class="d-flex select-escolha-album col">  
                <b-form-select v-model="selected" class="mb-3">
                    <!-- This slot appears above the options from 'options' prop -->
                    <template #first>
                        <b-form-select-option :value="null">Salvar novo Album</b-form-select-option>
                    </template>

                    <b-form-select-option v-for="album in albunsDoUsuario" :key="album.id" :value="album.id">{{album.nome}}</b-form-select-option>

                </b-form-select>
                <b-button v-if="selected != null" variant="primary" @click="vincularImagemAlbum">Salvar</b-button>
                <b-button v-if="selected == null" variant="secondary" v-b-modal.modal-adicionar-album>Criar</b-button>
                <b-modal
                    class="mx-auto col-md-3" 
                    title="Criação de album"
                    id="modal-adicionar-album"
                    >
                    <form action="">
                        <b-form-input v-model="novoAlbum.nome" placeholder="Insira o nome do novo album"></b-form-input>
                    </form>
                    <template v-slot:modal-footer>
                        <div class="w-100">
                            <button @click="criarAlbum" class="btn btn-primary btn-block">Criar Album</button>                    
                        </div>
                    </template>
                </b-modal>
            </div>
            
        </b-modal>
    </div>
</template>

<script>
import serviceAlbuns from '@/service/serviceAlbuns'

export default {
    name: 'salvarImagem',
    props:[
        'albunsDoUsuario',
        'usuario',
        'publicacao'
    ],
    data() {
        return {
            selected: null,
            novoAlbum: {
                publicacao_id: [this.publicacao.id],
                criador_id: this.usuario.id,
                nome: ''
            },
        }
    },
    methods: {
        vincularImagemAlbum: function(){
            console.log(this.publicacao)
            console.log(this.publicacao.id)
            var data = { publicacao_id: this.publicacao.id }

            serviceAlbuns.adicionarPublicacao(this.selected, data).then(resposta =>{
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
        criarAlbum(){
            this.$swal.fire({
                title: 'Deseja realmente criar album?',
                text: "Ao criar esse album ele aparecerá no seu perfil!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Criar'
            }).then((result) => {
                if (result.value) {
                    serviceAlbuns.criarAlbum(this.novoAlbum).then(resposta => {
                        console.log(resposta.data)
                        if(resposta.status == 201 || resposta.status == 200){
                            this.$swal.fire(
                                'Criado!',
                                'Seu album foi criado!',
                                'success'
                            )
                        }                        
                    }).catch(
                        (error) =>{
                            this.$swal.fire(
                                'Oops...',
                                'Tivemos um problema, tente novamente!',
                                'error',
                            )
                            console.log(error)
                        }
                    )
                }
            })
        },
    },


}
</script>