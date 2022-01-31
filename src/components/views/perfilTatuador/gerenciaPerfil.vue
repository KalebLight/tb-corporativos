<template>
    <div class=" w-100 pt-5 h-100">

        <div class="col-md-3 mt-5 bg-dark pr-4 mx-auto text-white">
            <br>
            <div v-if="this.avatar == ''" >
                <label for="upload-arquivo">
                    <b-avatar :src="usuario.avatar" class="border border-light" size="85px"></b-avatar>
                </label>
            </div>
            <div
                v-else
                id="preview"
                class="">
                <label for="upload-arquivo">
                    <b-avatar :src="url" class="border border-light" size="85px"></b-avatar>
                    <img style="display:none" :src="url" id="imgPreview"/>
                </label>
            </div>
            <br>
            <input
                            @change="fileSelected"
                            enctype="multipart/form-data"
                            type="file"
                            id="upload-arquivo"
                            name="upload-arquivo"
                            class="d-none"
                            >

            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputNomeCadastro">Nome</label>
                <input type="text" class="form-control ml-2 text-white" id="inputNomeCadastro" v-model="usuario.nome">
            </div>
            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputNomeCadastro">Bio</label>
                <textarea type="text" class="form-control ml-2 text-white" id="inputBio" v-model="usuario.bio"></textarea>
            </div>
            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputUsernameUsuarioCadastro">Username</label>
                <input  type="text" class="form-control ml-2 text-white" id="inputUsernameUsuarioCadastro" v-model=" usuario.username">
            </div>
            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputEmailUsuarioCadastro">Endereço de e-mail</label>
                <input type="email" class="form-control ml-2 text-white" id="inputEmailUsuarioCadastro" v-model=" usuario.email">
            </div>
            <b-button id="btnUpdate" class="btnUpdate mt-3 mb-3" @click="salvar" size="sm">Atualizar</b-button>
            <br>
        </div>



    </div>
</template>

<style scoped>

input, textarea{
    background-color: #2b2b2b !important;
    background: #2b2b2b !important;
    color: white;
    border-color: #2b2b2b !important;
}


.btnUpdate{
    background-color: #800080 !important;
    width: 100px;
}

</style>

<script>
import serviceUsuario from '@/service/serviceUsuario'
export default {
    name: 'gerenciaPerfil',
    data() {
        return {
            imageSrc: null,
            usuario: '',
            avatar:'',
            novaUsuario:{},
        }
    },
    methods:{
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
        salvar: function () {

            if(document.getElementById('imgPreview')){
                this.imageSrc = this.uploadImageBase64(document.getElementById('imgPreview'))
            }
            console.log(this.imageSrc)
            const formData = new FormData();
            this.novaUsuario.nome = this.usuario.nome
            formData.append("nome",this.usuario.nome)
            formData.append("bio",this.usuario.bio)
            formData.append("username",this.usuario.username)
            formData.append("email",this.usuario.email)
            if (this.avatar != '') {
                formData.append("avatar", this.avatar)
            }
            serviceUsuario.updateUsuario(this.usuario.id,formData).then(resposta => {
                if (resposta.status == 200) {
                    location.reload()
                }
            }).catch((erro) => {
                if (erro.response.data) {
                    let username = ''
                    if (erro.response.data.username) {
                        username = '<b>Username:</b> ' + erro.response.data.username[0]
                    }

                    this.$swal.fire(
                        'Erro',
                        username,
                        'error'
                    )
                }

            })
        },
        fileSelected: function(event){
            this.avatar = event.target.files[0]
            this.url = URL.createObjectURL(this.avatar);
        },
    },
    mounted() {
        serviceUsuario.getUsuarioLogado().then(resposta => {
            if (resposta.status == 200) {
                this.usuario = resposta.data
                console.log(this.usuario)
            }
        })
    },
}
</script>
