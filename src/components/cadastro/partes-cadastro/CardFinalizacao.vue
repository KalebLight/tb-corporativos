<template>
    <div >
        <b-navbar toggleable="lg" type="dark" class="bg-dark d-flex justify-content-end p-3" variant="info">
            <router-link class="btn btn-outline-light float-right" to="Cadastro">Registre-se</router-link>
        </b-navbar>

        <div class="d-flex my-auto p-5">
            <b-card class="mx-auto my-auto col-md-3 my-5 ">
                <h2 class="mb-3 text-left text-white font-weight-bold">Seja bem-vindo ao TattooBook! Entrar</h2>
                    
                <div class="mb-5">
                    <form class="text-left">
                        <div class="form-group">
                            <label class="text-white" for="inputEmailLogin">E-mail </label>
                            <input type="email" class="form-control" id="inputEmailLogin" aria-describedby="emailHelp" placeholder="Digite seu email">
                        </div>
                        <div class="form-group">
                            <label class="text-white" for="inputEmailSenha">Senha</label>
                            <input type="password" class="form-control" id="inputEmailSenha" placeholder="Digite sua Senha">
                        </div>
                        <div class="form-group text-right">
                            <a href="http://" style="color: #4c4c4c"><small>Esqueci minha senha</small></a>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Enviar</button>
                    </form>
                </div>

            </b-card>
                

        </div>
    </div>
</template>

<script>
export default {
    name: 'CardFinalizacao',
    props:[
        'novoUsuario'
    ],
    data() {
        return {
            
        }
    },
}
</script>