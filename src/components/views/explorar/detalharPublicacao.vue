<template>
	<div class="p-3">
		<div class="container" v-if="!loading">
			<div class="card bg-dark mx-auto pl-n4 divExt">

				<!-- div info e button de seguir -->
				<div class="dados-autor-publicacao mt-1 p-3">
					<div class="d-flex justify-content-between">
						<div class="d-flex">
							<a @click="$router.push({name:'perfilVisitado', params:{usuarioVisitado: publicacao.criador, 
							idUsuarioVisitado: publicacao.criador.id }})" style="cursor:pointer">
								<b-avatar variant="info" size="3.3rem" :src="this.publicacao.criador.avatar" />
							</a>
							<div class="ml-4">
								<h5 class="mb-0 text-white text-left">{{this.publicacao.criador.username}}</h5>
								<p class="text-left text-white">
									{{this.publicacao.criador.seguidores.length}} Seguidores
								</p>
							</div>
						</div>
						<btnSeguir :autorPublicacao="this.publicacao.criador" />
					</div>
				</div>
				<!-- div info e button de seguir -->
					<div class="mt-2">
						<b-img :src=this.publicacao.imagem class="pubImg">
						</b-img>
					</div>

				<div class="p-3 w-100">


					<h2 class="text-left text-white pubTitulo">{{this.publicacao.titulo}}</h2>

					<div class="d-flex  w-100">
						<div class="d-flex justify-content-between w-100">
							<btnCurtir :publicacao="this.publicacao" />
							<div class="d-flex">
								<salvarImagem :publicacao="publicacao" :usuario="usuario"
									:albunsDoUsuario="albunsDoUsuario" />
								<edit-publicacao class="mt-1" v-if="usuario.id == publicacao.criador.id"
									:usuario="usuario" :publicacao="publicacao" />
							</div>

						</div>

						<div class="dados-publicacao ">
							<p class="text-left text-white">
								<span v-for="tag in this.publicacao.tags" :key="tag.id">
									#{{tag.nome}}
								</span>
							</p>
						</div>


					</div>
				</div>
			</div>
		</div>
		<div v-if="loading" class="w-100 h-100 r">
			<PulseLoader :color="color" :size="size"></PulseLoader>
		</div>
	</div>

</template>

<script>
	import btnCurtir from "../../reutilizaveis/btnCurtir";
	import btnSeguir from "../../reutilizaveis/btnSeguir";
	import salvarImagem from "../../reutilizaveis/salvarImagem";
	import editPublicacao from "../../reutilizaveis/editPublicacao";
	import servicePublicacoes from "@/service/servicePublicacoes";
	import serviceUsuario from "@/service/serviceUsuario";
	import serviceAlbuns from "@/service/serviceAlbuns";
	
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


	export default {
		name: "detalharPublicacao",
		components: {
			btnCurtir,
			btnSeguir,
			salvarImagem,
			editPublicacao,
			PulseLoader
		},

		data() {
			return {
				usuario: "",
				publicacao: "",
				albunsDoUsuario: "",
				selected: null,
				loading: true,
				color: 'white',
				size: '1rem'
			};
		},
		created() {
			servicePublicacoes
				.getPublicacao(this.$route.params.publicacaoId)
				.then((resposta) => {
					this.publicacao = resposta.data;

				});

			serviceUsuario.getUsuarioLogado().then((resposta) => {
				this.usuario = resposta.data;
				serviceAlbuns.listarAlbuns(this.usuario.id).then((resposta) => {
					this.albunsDoUsuario = resposta.data;
				});
				this.loading = false
			});
		},
	};
</script>

<style scoped>
	.divExt {
		max-width: 600px
	}

	.pubImg {
		width: 100%;
	}

	.pubTitulo {
		margin-top: 5px;
		font-size: 19px;
	}
</style>