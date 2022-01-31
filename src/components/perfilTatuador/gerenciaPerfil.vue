<template>
    <div class=" w-100 pt-5 h-100">

        <div class="col-md-3 mt-5 bg-dark pr-4 mx-auto text-white">
            <br>

            <b-avatar class="border border-light" size="75px"></b-avatar>
            <br>
            <input @change="fileSelected"
                enctype="multipart/form-data"
                type="file"
                id="upload-arquivo"
                name="upload-arquivo"
            >

            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputNomeCadastro">nome</label>
                <input type="text" class="form-control ml-2" id="inputNomeCadastro" v-model="nome"  placeholder="nome">
            </div>
            <div class="form-group">
                <label class="text-white float-left ml-2" for="inputUsernameUsuarioCadastro">Usdhserdhserdhjrdhjrdshername</label>
                <input  type="text" class="form-control ml-2rehearhaeherh4ewghw



    </div>
</template>

<style>

input{
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
    name: 'Gerenciar Perfil',
    data() {
        return {
            usuario:'',
            nome:'',
            username:'',
            email:'',
            senha:'',
        }
    },
    mounted() {
        console.log('cu')
        serviceUsuario.getUsuarioLogado().then(resposta => {
            this.usuario = resposta.data
            this.nome = this.usuario.nome
            this.username = this.usuario.username
            this.email = this.usuario.email
            this.senha = this.usuario.senha
            console.log(this.usuario)
        })
    },
}
</script>
