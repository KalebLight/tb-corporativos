<template>
    <div>
        <b-button class="btn btn-secondary" v-b-modal.modal-editar-album>
            Editar Album
        </b-button>


        <b-modal centered id="modal-editar-album" size="sm" title="Editar album" class="">
            <div class="">                
                <input type="text" class="form-control" placeholder="Nome album" id="inputNomeAlbum" >                                  
            </div>

            <template #modal-footer>
                <b-button @click="cancelarEdicao">
                    Cancelar
                </b-button>
            </template>
            
        </b-modal>
    </div>
</template>

<style scoped>


</style>

<script>
export default {
    data(){
        return{             
            
        }
    },
    methods: {
        cancelarEdicao: function(){
            this.$bvModal.hide("modal-editar-album")
        }    
    },
}
</script>
