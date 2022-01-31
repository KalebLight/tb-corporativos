<template>
    <div>
        <div class="d-flex pb-3">
            <b-form-input class="mx-auto mt-3" type="search" placeholder="Buscar" id="inputBusca"></b-form-input>
            <FontAwesomeIcon icon="fire" />
        </div>
        <div class="cardSeguindo d-flex col-md-10 h-25 mx-auto">
            <b-avatar class="border border-light float-left my-auto" size="40px"></b-avatar>
            <h6 class="my-auto ml-1 ">Usuário da Silva</h6>
            <div class="divSeguindo my-auto pl-1 col-md-4 ml-3 border border-light   ">
                <h6 class="ml-2">Seguindo</h6>
            </div>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'listaSeguidores',
    props: [
        "seguidores"
    ]
}
</script>