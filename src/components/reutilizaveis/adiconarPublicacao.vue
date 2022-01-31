<template>
  <div>
    <!-- <b-dropdown-item v-b-modal.modal-cadastrar-publicacao>
            Adicionar Publicação
        </b-dropdown-item> -->

    <b-button class="btn btn-secondary" v-b-modal.modal-cadastrar-publicacao>
      Adicionar Publicação
    </b-button>

    <!-- Modal de criação de publicação -->
    <b-modal
      centered
      id="modal-cadastrar-publicacao"
      size="lg"
      title="Cadastrar Publicação"
    >
      <div class="row">
        <div class="col">
          <form
            class="upload-arquivo d-flex align-items-center flex-column justify-content-center"
            v-if="nova_publicacao.imagem == ''"
          >
            <div style="font-size: 4rem">
              <FontAwesomeIcon :icon="['fas', 'cloud-upload-alt']" />
            </div>
            <span>
              Nenhum Arquivo foi adicionado
            </span>
            <h4>Arraste e solte para adicionar arquivo</h4>
			<small>Limite: 2.5MB</small>
            <input
              @change="fileSelected"
              enctype="multipart/form-data"
              type="file"
              id="upload-arquivo"
              name="upload-arquivo"
              multiple="multiple"
            />
          </form>
          <div v-if="nova_publicacao.imagem != ''" id="preview" class="">
            <img class="img-fluid" :src="url" id="imgPreview"/>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="tags-basic">Digite o Titulo da sua publicação </label>
            <input
              type="text"
              class="form-control"
              placeholder="Titulo Publicação"
              id="input-titulo-publicacao"
              v-model="nova_publicacao.titulo"
            />
          </div>
          <div class="form-group">
            <label for="tags-basic">Escolha suas tags</label>
            <div>
              <multiselect
                v-model="nova_publicacao.tags"
                placeholder="Busque suas tags"
                label="nome"
                track-by="id"
                value="id"
                :options="tags"
                :multiple="true"
              ></multiselect>
            </div>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            class="btn btn-secondary float-right ml-3"
            @click="submitDadosPublicacao"
          >
            Publicar
          </b-button>

          <b-button
            variant="secondary"
            class="btn btn-secondary float-right"
            @click="cancelarPublicacao"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
div#modal-1___BV_modal_content_ {
  min-height: 500px !important;
}
input#input-tags___input__ {
  color: black !important;
}

#preview {
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.mostraInput {
  opacity: 1 !important;
}

#upload-arquivo {
  position: absolute;
  /* top: 0; */
  opacity: 0;
  /* height: 100%; */
  width: 100%;
  cursor: pointer;
  min-height: 150px;
}

.upload-arquivo {
  border: 2px dashed #ced4da;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  min-height: 150px;
  padding: 20px;
  box-shadow: none;
  height: 100%;
  width: 100%;
}
#box-elementos-upload {
  min-height: 50vh;
}
</style>
<script>
import servicePublicacoes from '@/service/servicePublicacoes'
import Multiselect from 'vue-multiselect'

export default {

    components: { Multiselect },
    data(){
        return{
			imageSrc: null,
            nova_publicacao:{
                titulo: '',
                imagem: '',
                tags: []
            },
            tags:[],
            publicacaoIdRetornado: ''
        }
    },

    mounted() {
        servicePublicacoes.getTags().then(resposta => {
            this.tags = resposta.data.results
        })
    },

    methods: {
        uploadImageBase64: function(img) {   
			var canvas = document.createElement("canvas");
			var width = img.naturalWidth * 0.5;
			var height = img.naturalHeight * 0.5;
			canvas.width = width;
			canvas.height = height;
			
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width , height);
			var dataURL = canvas.toDataURL("image/png", 0.3);

			return dataURL;     
        },
        fileSelected: function(event){
            this.nova_publicacao.imagem = event.target.files[0]
			this.url = URL.createObjectURL(this.nova_publicacao.imagem);
        },
        cancelarPublicacao: function(){
            this.nova_publicacao.titulo = "",
            this.nova_publicacao.imagem ='',
            this.nova_publicacao.tags = ''
            this.$bvModal.hide("modal-cadastrar-publicacao")
        },
        submitDadosPublicacao: function(){
			this.imageSrc = this.uploadImageBase64(document.getElementById('imgPreview'))
            const formData = new FormData();
            formData.append("titulo", this.nova_publicacao.titulo)
            formData.append("imagem",this.imageSrc)
            for (let i = 0; i < this.nova_publicacao.tags.length; i++){
                formData.append("tags",this.nova_publicacao.tags[i].id)
			}
			
            this.$swal.fire({
                title: 'Deseja realmente publicar está imagem?',
                text: "Ao salvar essa publicação aparecerá no feed dos seus seguidores!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Publicar'
            }).then((result) => {
                if (result.value) {
                    servicePublicacoes.criarPublicacoes(formData).then(resposta=>{
                        this.publicacaoIdRetornado = resposta.data.id
                        if(resposta.status == 201 || resposta.status == 200){
                            this.$swal.fire(
                                'Publicado!',
                                'Sua foto foi publicada!',
                                'success'
                            )
                        this.postarTwitter()

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
        reloadPagina: function(reload){
            location.reload(reload);
        }
    },
}
</script>
