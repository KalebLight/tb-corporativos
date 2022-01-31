<template>
  <div class="">
      <nav class="navbar navbar-fixed-top">
        <div class="container">
            <a class="navbar-brand" @click="$router.push({ name: 'paginaInicial' })">
                <img src="../../assets/img/logo.png" width="45" height="45" class="d-inline-block align-top" alt="Logo TattooBook">
            </a>

            <ul class="list-inline headers my-1">
                <li class="list-inline-item item-header" id="homeBtn">
                    <a class="nav-link px-2" @click="$router.push({ name: 'paginaInicial' })">
                        <span class="text-light"><FontAwesomeIcon icon="home" /></span>
                    </a>
                </li>
                <li class="list-inline-item item-header" id="addPubliBtn" v-if="usuario.tipo_usuario == 1">
                    <btnAdicionarPublicacao/>
                </li>
                <li class="list-inline-item item-header" id="searchBtn"> 
                    <a class="nav-link px-2" @click="$router.push({ name: 'buscar' })">
                        <span class="text-light"><FontAwesomeIcon icon="search" /></span>
                    </a>
                </li>
                <li class="list-inline-item item-header" id="tatArtBtn">
                    <a class="nav-link px-2" @click="$router.push({ name: 'tatuadoresAuth' })">
                        <span class="text-light"><FontAwesomeIcon icon="user-friends" /></span>
                    </a>
                </li>
				<li class="list-inline-item item-header" id="exploreBtn">
                    <a class="nav-link px-2" @click="$router.push({ name: 'explorar' })">
                        <span class="text-light"><FontAwesomeIcon icon="compass" /></span>
                    </a>
                </li>
                <li class="list-inline-item item-header" id="profileBtn">
                    <a class="nav-link px-2">
						<b-navbar-nav class="ml-auto">
							<b-nav-item-dropdown right>
							<template #button-content>
								<b-avatar
								:src="usuario.avatar"
								size="2em"
								></b-avatar>
							</template>
							<b-dropdown-item
                id="dropProfileBtn"
								type="button"
								@click="
								$router.push({
									name: 'perfilTatuador',
									params: { usuarioEscolhido: usuario },
								})
								"
							>
								Perfil do Usuário
							</b-dropdown-item>

							<b-dropdown-item
                id="gerProfileBtn"
								type="button"
								@click="$router.push({ name: 'gerenciaPerfil' })"
							>
								Gerenciar perfil
							</b-dropdown-item>
							<b-dropdown-item 
              id="sairBtn"
              @click="logout">Sair</b-dropdown-item>
							</b-nav-item-dropdown>
						</b-navbar-nav>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
  </div>
</template>

<style scoped>
body{
    background-color: #202020;
}
nav{
    background-color: #121212;
}
.navbar-brand, .nav-link {
  cursor: pointer;
}
</style>

<script>
import btnAdicionarPublicacao from "../reutilizaveis/adiconarPublicacao";
export default {
  name: "Navbar",
  Components: {
    btnAdicionarPublicacao,
  },
  props: ["usuario"],

  data() {
    return {
      buscarQuery: this.buscarInput,
      buscarInput: "",
    };
  },

  methods: {
    logout: function() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
    buscar: function() {
      if (this.$route.name != "buscar") {
        console.log("IN " + this.$route.name);
        this.$router.push({
          name: "buscar",
          params: { search: this.buscarInput },
        });
      } else {
        console.log("OUT " + this.$route.name);
        this.$router.push({
          name: "buscar",
          params: { search: this.buscarInput },
        });
        location.reload();
      }
    },
  },
};
</script>
