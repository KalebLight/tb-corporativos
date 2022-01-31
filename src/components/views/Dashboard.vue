<template>
	<div class="m-3">
		<div class="row m-3">
			<b-card-group columns>
				<div class="card p-3 bg-dark animate__animated animate__fadeIn" v-for="publicacao in listaPublicacoesFeed" :key="publicacao.id">
					<a @click="$router.push({name:'detalharPublicacao', params:{ publicacaoId: publicacao.id, albunsDoUsuario: albunsDoUsuario, usuario: usuario}})"
						type="button">
						<div class="d-flex">
							<b-avatar :src="publicacao.criador.avatar" size="3.2em" />
							<div class="col">
								<h5 class="text-white text-left mb-0">{{publicacao.criador.nome}}</h5>
								<p class="text-muted text-left">@{{publicacao.criador.username}}</p>
								<p class="text-white text-left">
									<span v-for="tag in publicacao.tags.length" :key="tag.id">{{tag.nome}}</span>
								</p>
							</div>
						</div>
						<div class="card  ">
							<b-img rounded="" :src="publicacao.imagem" class="card-img img-fluid" />
						</div>
					</a>

					<div class="col-md-12">
						<div class="row justify-content-start">
							<btnCurtir :publicacao="publicacao" />
							<salvarImagem class="mt-1 ml-3" :publicacao="publicacao" :usuario="usuario"
								:albunsDoUsuario="albunsDoUsuario" />
						</div>
					</div>

				</div>
			</b-card-group>
		</div>
		<div v-if="loading" class="w-100 h-100 ">
			<PulseLoader :color="color" :size="size"></PulseLoader>
		</div>
		<div class=" col" v-if="loading != true  && this.listaPublicacoesFeed.length == 0">
			<h1 class="col">
				Não há nada aqui por enquanto!
			</h1>
			<br />
			<a class="btn btn-link" style="color: #2c3e50" @click="$router.push({ name: 'explorar' })">
				<h3>Veja algumas publicações aqui!</h3>
			</a>
		</div>

	</div>

</template>

<style scoped>
	@media (max-width: 5000px) and (min-width: 1440px) {
		.card-columns {
			column-count: 4 !important;
		}
	}
</style>

<script>
	// import serviceAlbuns from "@/service/serviceAlbuns";
	import salvarImagem from "../reutilizaveis/salvarImagem";
	import servicePublicacoes from "@/service/servicePublicacoes";
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

	export default {
		name: "Dashboard",
		components: {
			salvarImagem,
			PulseLoader
		},
		props: ["usuario"],
		data() {
			return {
				listaPublicacoesFeed: [],
				albunsDoUsuario: [],
				loading: true,
				color: 'white',
				size: '1rem'
			};
		},
		mounted() {
			servicePublicacoes.listarPublicacoesFeed().then((resposta) => {
				this.listaPublicacoesFeed = resposta.data;
			});
			// serviceAlbuns
			// 	.listarAlbuns(localStorage.getItem("usuarioId"))
			// 	.then((resposta) => {
			// 		this.albunsDoUsuario = resposta.data;
			// 	this.loading = false
			// });
		},

	};
</script>