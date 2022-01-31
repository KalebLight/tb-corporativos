<template>
  <div class="bg-dark w-100">
    <b-navbar
      toggleable="lg"
      type="dark"
      class="bg-dark d-flex justify-content-end p-3 position-absolute"
      variant="info"
    >
      <router-link class="btn btn-outline-light float-right " to="Login"
        >Entrar</router-link
      >
    </b-navbar>
    <div class="container h-100">
      <div class="row justify-content-center h-100">
        <div class="col-md-6 col-sm-12 d-flex align-items-center">
          <div class="page-1" v-if="this.paginaAtual == 1">
            <div class="card">
              <div class="card-body">
                <div class="mb-5">
                  <h3 class="text-left text-white">Quem é você</h3>
                </div>
                <div class="col mb-3">
                  <div class="row justify-content-between align-items-center">
                    <div class="w-75 d-flex">
                      <div class="border box-avatar w-25">
                        <FontAwesomeIcon
                          icon="user"
                          size="2x"
                          :style="{ color: 'white' }"
                        />
                      </div>
                      <div
                        class="text-white text-left vertical-align-middle ml-3"
                      >
                        <h5 class="mb-0">Sou usuário</h5>
                        <p class="mb-0">
                          <small>Veja trabalhos de artistas, inspire-se</small>
                        </p>
                      </div>
                    </div>

                    <div>
                      <b-form-radio
                        v-model="novoUsuario.tipo_usuario"
                        name="radio-size"
                        size="lg"
                        value="2"
                      ></b-form-radio>
                    </div>
                  </div>
                </div>
                <div class="col mb-3">
                  <div class="row justify-content-between align-items-center">
                    <div class="w-75 d-flex">
                      <div class="border box-avatar w-25">
                        <FontAwesomeIcon
                          icon="smile-wink"
                          size="2x"
                          :style="{ color: 'white' }"
                        />
                      </div>
                      <div
                        class="text-white text-left vertical-align-middle ml-3 "
                      >
                        <h5 class="mb-0">Sou um tatuador</h5>
                        <p class="mb-0">
                          <small>
                            Divulgue seus trabalhos, seus desenho.
                          </small>
                        </p>
                      </div>
                    </div>

                    <div>
                      <b-form-radio
                        v-model="novoUsuario.tipo_usuario"
                        name="radio-size"
                        size="lg"
                        value="1"
                      ></b-form-radio>
                    </div>
                  </div>
                </div>
                <div class="col mb-5">
                  <div class="row justify-content-between align-items-center">
                    <div class="w-75 d-flex">
                      <div class="border box-avatar w-25">
                        <FontAwesomeIcon
                          icon="store-alt"
                          size="2x"
                          class=""
                          :style="{ color: 'white' }"
                        />
                      </div>

                      <div
                        class="text-white text-left vertical-align-middle ml-3"
                      >
                        <h5 class="mb-0">
                          Sou um estúdio
                        </h5>
                        <p class="mb-0">
                          <small
                            >Divulgue seu estúdio e seus artistas. Tenha
                            presença digital do seu estúdo.
                          </small>
                        </p>
                      </div>
                    </div>

                    <div class="">
                      <b-form-radio
                        v-model="novoUsuario.tipo_usuario"
                        name="radio-size"
                        size="lg"
                        value="3"
                      ></b-form-radio>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col mb-3">
                <div class="row justify-content-end">
                  <button
                    type="button"
                    class="btn btn-primary mr-4"
                    @click="avancaPagina"
                  >
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="page-2 w-100" v-if="this.paginaAtual == 2 && this.novoUsuario.tipo_usuario != 2">
            <div class="card">
              <div class="card-body">
                <div class="mb-5">
                  <h3 class="text-left text-white">Qual o seu endereço?</h3>
                </div>

                <div class="col mb-5">
                  <form action="" class="text-white">
					<div class="form-group">
						<label
						class="text-white float-left ml-2"
						for="inputEmailUsuarioCadastro"
						>CEP <b-spinner class="m-1 ml-2" small label="Small Spinner" v-if="loading"> </b-spinner>
						</label
						>
						<input
						v-model="enderecos_usuario.cep"
						type="number"
						class="form-control ml-2"
						id="inputCEPCadastro"
						required
						placeholder="Digite seu CEP"
						@change="buscarEndereco"
						/>
					</div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputNomeCadastro"
                        >Estado</label
                      >
                      <input
                        v-model="enderecos_usuario.estado"
                        type="text"
                        class="form-control ml-2"
                        id="inputEstadoCadastro"
                        required
                        placeholder="Digite seu Estado"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputUsernameUsuarioCadastro"
                        >Cidade</label
                      >
                      <input
                        v-model="enderecos_usuario.cidade"
                        type="text"
                        class="form-control ml-2"
                        id="inputCidadeCadastro"
                        required
                        placeholder="Digite sua Cidade"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputSenhaCadastro"
                        >Bairro</label
                      >
                      <input
                        v-model="enderecos_usuario.bairro"
                        type="text"
                        class="form-control ml-2"
                        id="inputBairroCadastro"
                        required
                        placeholder="Digite seu Bairro"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputSenhaCadastro"
                        >Logradouro</label
                      >
                      <input
                        v-model="enderecos_usuario.logradouro"
                        type="text"
                        class="form-control ml-2"
                        id="inputRuaCadastro"
                        required
                        placeholder="Digite sua Rua"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputSenhaCadastro"
                        >Numero</label
                      >
                      <input
                        v-model="enderecos_usuario.numero"
                        type="number"
                        class="form-control ml-2"
                        id="inputNumeroCadastro"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputSenhaCadastro"
                        >Complemento</label
                      >
                      <input
                        v-model="enderecos_usuario.complemento"
                        type="text"
                        class="form-control ml-2"
                        id="inputComplementoCadastro"
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div class="col mb-3  w-100">
                <div class="row justify-content-between">
                  <button class="btn btn-primary ml-4" @click="retornaPagina">
                    Voltar
                  </button>

                  <button class="btn btn-primary mr-4" @click="avancaPagina">
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="page-3 w-100" v-if="this.paginaAtual == 3 || (this.paginaAtual == 2 && this.novoUsuario.tipo_usuario == 2)">
            <div class="card">
              <div class="card-body">
                <div class="mb-5">
                  <h3 class="text-left text-white">Dados Complementares</h3>
                </div>

                <div class="col mb-5">
                  <form action="" class="text-white">
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputNomeCadastro"
                        >Nome</label
                      >
                      <input
                        v-model="novoUsuario.nome"
                        type="text"
                        class="form-control ml-2"
                        id="inputNome"
                        required
                        placeholder="Digite seu Estado"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputUsernameUsuarioCadastro"
                        >Username</label
                      >
                      <input
                        v-model="novoUsuario.username"
                        type="text"
                        class="form-control ml-2"
                        id="inputUsername"
                        required
                        placeholder="Digite seu username"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputEmailUsuarioCadastro"
                        >E-mail</label
                      >
                      <input
                        v-model="novoUsuario.email"
                        type="email"
                        class="form-control ml-2"
                        id="inputEmail"
                        required
                        placeholder="Digite seu E-mail"
                      />
                    </div>
                    <div class="form-group">
                      <label
                        class="text-white float-left ml-2"
                        for="inputEmailUsuarioCadastro"
                        >Senha</label
                      >
                      <input
                        v-model="novoUsuario.password"
                        type="password"
                        class="form-control ml-2"
                        id="inputSenha"
                        required
                        placeholder="Digite sua senha"
                      />
                    </div>
                    <div class="form-group" v-if="this.novoUsuario.tipo_usuario != 2">
                      <label
                        class="text-white float-left ml-2"
                        for="inputUsernameUsuarioCadastro"
                        >Whatsapp</label
                      >
                      <input
                        v-model="novoUsuario.whatsapp"
                        type="text"
                        class="form-control ml-2"
                        id="inputUsername"
                        required
                        placeholder="Digite seu whatsapp"
                      />
                    </div>
                    <div class="form-group" v-if="this.novoUsuario.tipo_usuario != 2">
                      <label
                        class="text-white float-left ml-2"
                        for="inputUsernameUsuarioCadastro"
                        >Instagram</label
                      >
                      <input
                        v-model="novoUsuario.instagram"
                        type="text"
                        class="form-control ml-2"
                        id="inputUsername"
                        required
                        placeholder="Digite seu instagram"
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div class="col mb-3">
                <div class="row justify-content-between">
                  <button class="btn btn-primary ml-4" @click="retornaPagina">
                    Voltar
                  </button>

                  <button class="btn btn-primary mr-4" @click="criarUsuario" v-bind:class="{ 'disabled' : loading }">
                    <span v-if="!loading">Enviar</span>
					<b-spinner class="m-1 ml-2" small label="Small Spinner" v-if="loading"> </b-spinner>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-avatar {
  width: 64px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 64px !important;
}

.divOption > h6 {
  font-size: 13px;
}

.divEstilos > h6 {
  font-size: 9px;
}

.divIcon {
  border-width: 4px !important;
  border-radius: 10%;
  width: 53px;
}

.divForm {
  background-color: #202020;
}

input[type="radio"] {
  transform: scale(1.2);
}

input[type="radio"]:checked:after {
  transform: scale(2.5);
}

input,
input.form-control,
input.form-control:hover,
input.form-control:focus,
input.form-control:active {
  background-color: #2b2b2b !important;
  background: #2b2b2b !important;
  color: white;
  border-color: #2b2b2b !important;
}
</style>

<script>
import serviceUsuario from "@/service/serviceUsuario";
import axios from 'axios';

export default {
  name: "Cadastro",
  Components: {},
  data() {
    return {
		avatar: "",
		loading: false,
		novoUsuario: {
			tipo_usuario: "",
			nome: "",
			username: "",
			email: "",
			password: "",
			enderecos_usuario: "",
			whatsapp: "",
			instagram: ""
		},

		enderecos_usuario: {
			cidade: "",
			estado: "",
			logradouro: "",
			cep: "",
			numero: "",
			bairro: "",
			complemento: "",
		},

		paginaAtual: 1,
		};
  },
  methods: {
    buscarEndereco(){
    // var url ='https://cep.awesomeapi.com.br/json/';
    var url ='https://viacep.com.br/ws/'
    url +=  this.enderecos_usuario.cep + '/json'
		if(this.enderecos_usuario.cep >= 8) {
			this.loading = true;
			axios.get(url).then(res => {
				console.log(res.data)
				this.enderecos_usuario.logradouro = res.data.logradouro//res.data.address
				this.enderecos_usuario.cidade = res.data.localidade//res.data.city
				this.enderecos_usuario.bairro = res.data.bairro//res.data.district
				this.enderecos_usuario.estado = res.data.uf//res.data.state
				if(res.status === 200){
            this.loading = false
        }
			}).catch(err => {
			console.log(err)
				this.loading = false
			})
		}
	},
    criarUsuario: function() {
      if(this.novoUsuario.tipo_usuario != 2) {
        this.novoUsuario.enderecos_usuario = [this.enderecos_usuario];
      } else {
        delete this.novoUsuario.enderecos_usuario
      }
      console.log(this.novoUsuario); this.loading = true
      serviceUsuario
        .criarUsuario(this.novoUsuario)
        .then((resposta) => {
          if (resposta.status == 201) {
            this.loading = false
            this.$swal
              .fire(
                "Cadastrado",
                "Você foi cadastrado!",
                "success"
              )
              .then(this.$router.push("login"));
          }
        })
        .catch((erro) => {
          this.loading = false
          if (erro.response.data) {
            let password = "";
            let username = "";
            let tipo_usuario = "";
            if (erro.response.data.password) {
              password = "<b>Senha:</b> " + erro.response.data.password[0];
            }
            if (erro.response.data.username) {
              username = "<b>Username:</b> " + erro.response.data.username[0];
            }
            if (erro.response.data.tipo_usuario) {
              tipo_usuario = "<b>Por favor escolha um tipo de usuário</b> ";
            }

            this.$swal.fire(
              "Erro",
              password + "\n" + username + "\n" + tipo_usuario,
              "error"
            );
          }
        });
    },

    avancaPagina: function() {
      if (this.paginaAtual == 1) {
        if (this.novoUsuario.tipo_usuario == "") {
          this.$swal.fire(
            "Ops",
            "Selecione um tipo de usuário antes de prosseguir",
            "error"
          );
        } else {
          this.paginaAtual = this.paginaAtual + 1;
        }
      } else {
        if (
          this.enderecos_usuario.cidade != "" &&
          this.enderecos_usuario.estado != "" &&
          this.enderecos_usuario.logradouro != "" &&
          this.enderecos_usuario.cep != "" &&
          this.enderecos_usuario.numero != "" &&
          this.enderecos_usuario.bairro != "" &&
          this.enderecos_usuario.complemento != ""
        ) {
          this.paginaAtual = this.paginaAtual + 1;
        } else {
          this.$swal.fire(
            "Ops",
            "Preencha todos campos antes de prosseguir",
            "error"
          );
        }
      }
    },

    retornaPagina: function() {
      this.paginaAtual = this.paginaAtual - 1;
    },

    bloquearAvancos: function() {
      console.log("cter");
    },
  },
};
</script>
