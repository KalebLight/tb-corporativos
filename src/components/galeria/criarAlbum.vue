<template>
    <div class="">        
        <b-modal
            class="mx-auto col-md-3" 
            id="criarAlbum"
            title="Criar publicação"
            :header-bg-variant="bgModal"
            :header-text-variant="textModal"
            :body-bg-variant="bgModal"
            :footer-bg-variant="bgModal"
            >
            <div class="btn divAddPublic border rounded border-light ">
                <img width="91" height="60" src="../../assets/img/uploadIcon.png" alt="" class="mt-4">
                <h6 class="p-4 mx-auto text-white">Clique aqui para carregar uma imagem</h6>
                <input type="file" class="inputFile">
            </div>
            

            <template v-slot:modal-footer>
                <div class="w-100">
                    <button class="btn btn-primary btn-block">Publicar</button>                    
                </div>
            </template>
        </b-modal>
    </div>        
</template>
<script>
export default {
    name: "criarAlbum",
    data () {
        return {

        }

    }
}
</script>