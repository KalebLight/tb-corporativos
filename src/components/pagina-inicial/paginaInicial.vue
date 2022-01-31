<template>
    <div>
        <div class="home-background">
            <img class="img-fluid" src="../../assets/img/home-background.jpg" @load="carregarTexto">
            <a href="#"><img class="logo-title" src="../../assets/img/logo.png"></a>
            <div class="home-text">
                <span class="zero-opacity" id="pense">Pense</span><br>
                <span class="zero-opacity" id="procure">procure</span><br>
                <span class="zero-opacity" id="tatue">tatue.</span>

				<div>
					<img class="scroll zero-opacity" id="scroll" src="../../assets/img/scroll.png">
				</div>
            </div>
            <div class="login-links">
                <router-link to="login">Entrar</router-link>
            </div>
        </div>
        <div class="no-padding no-margin bg-white color-black">
			<div class="bg-white-new"></div>
            <div class="container text-div p-5">
                <div class="home-card">
                    <span>Tatuador, cadastre-se agora e divulgue seus desenhos para milhares de clientes!</span>
                    <div class="mt-3">
                        <router-link to="Cadastro"><button class="btn btn-primary">
							Cadastrar-se</button>
						</router-link>
					</div>
                </div>
            </div>
        </div>
        <div class="no-padding no-margin color-white p-5" style="background-color: black;">
            <div class="container">
                <div class="home-card">
                    <span>Cliente, cadastre-se agora e realize seu sonho da tatuagem perfeita!</span>
                    <div class="mt-3">
                        <router-link to="Cadastro"><button class="btn btn-primary">
							Cadastrar-se</button>
						</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-padding no-margin">
			<div class="bg-white-new"></div>
            <div class="container text-div">
                <div class="question-card ">
                    <div class="row">
						<div class="col-2">
							<img class="m-top-1" width="120" src="../../assets/img/tattoo.png">
						</div>
						<div class="col-sm">
							<div class="question-title">
								Encontre o melhor tatuador para sua ideia e estilo
							</div>
							<div class="question-body">
								Conecte-se com nossa rede de tatuadores por todo Brasil e encontre o melhor profissional para você baseado na sua ideia e estilo específicos.
							</div>            
						</div>
            
					</div>
            <div class="mt-3 d-flex justify-content-center">
              <router-link to="tatuadores">
                <button class="btn btn-primary">
							Veja nossos tatuadores</button>
						</router-link>
            </div>
          </div>
                <div class="question-card m-top-1">
                    <div class="row">
                      <div class="col-2">
                        <img class="m-top-1" width="120" src="../../assets/img/cliente.png">
                      </div>
                      <div class="col-sm">
                            <div class="question-title">
                                Conquiste novos clientes através da nossa plataforma
                            </div>
                            <div class="question-body">
                                Conecte-se com nossa rede de amantes de tatuagem para ficar com sua agenda lotada e atenda clientes com demandas específicas para o estilo que você gosta. 
                            </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footer-content">
                <img class="m-top-1" width="120" src="../../assets/img/logo.png">
                <span class="footer-email text-muted">TattooBook - 2021</span>
                <div class="footer-icons">
                    <a href="#"><i class="fab fa-facebook-square"></i></a>
                    <a href="#"><i class="fab fa-twitter-square"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
    </div>



    </div>



</template>
<script>
export default {
    name: 'landing',
	methods: {
		carregarTexto(){
			if(document.getElementById('pense')!=null){
				setTimeout(() => {
					document.getElementById('pense').classList.toggle('zero-opacity')
					document.getElementById('pense').classList.toggle('full-opacity')
					setTimeout(() => {
						document.getElementById('procure').classList.toggle('zero-opacity')
						document.getElementById('procure').classList.toggle('full-opacity')
						setTimeout(() => {
							document.getElementById('tatue').classList.toggle('zero-opacity')
							document.getElementById('tatue').classList.toggle('full-opacity')
							setTimeout(() => {
								document.getElementById('scroll').classList.toggle('zero-opacity')
								document.getElementById('scroll').classList.toggle('down')
							},700)
						},700)
					},700)
				},100)
			}
		}
	}
}
</script>

<style scoped>

/* @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

@keyframes downarrow {
  0%    { transform: translateY(0); opacity: 0.4 }
  100%  { transform: translateY(0.1em); opacity: 0.6 }
}

.down {
  animation: downarrow 1s infinite alternate ease-in-out;
}

* {
	/* font-family: 'Noto Sans JP', sans-serif; */
    font-family: 'Quicksand', sans-serif;
}

.scroll {
	position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    width: 4%;
}

.bg-white{
	position: relative !important;
	overflow: hidden !important;
	background: #f1f1f1 !important;
}

.text-div {
	z-index: 2;
	position: relative;
}

.bg-white-new {
	position: absolute !important;
	background-image: url("../../assets/img/roses-bg.png");
	opacity: 0.08;
	width: 100%;
    height: 100%;
}

a {
  color: #833c80;
  text-decoration: none !important;
}

a:hover {
  color: #b346ad;
}

.logo-title{
  position: absolute;
  top: 1em;
  left: 2em;
  z-index: 999;
  width: 4em;
}
.home-background{
  position:relative;
}
.home-background .home-text{
  top:1.1em;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  position:absolute;
  z-index:999;
  color:white;
  font-size:8vw;
}
.home-background .login-links{
  top:1em;
  right:2em;
  position:absolute;
  z-index:999;
  font-size:1.5em;
}
.home-background .login-links a{
  color:white;
  text-decoration: none;
}
.home-card{
  text-align: center;
  padding:1em;
  font-size:1.5em;
  font-weight: bold;
}
.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding:2em;
}
.question-card{
  padding:2em;
  text-align: left;
}
.question-card .question-title{
  font-size:1.2em;
  font-weight: bold;
}
.question-card .question-body{
  font-size:1em;
} 
.color-white{
  color:white;
}

.footer{
  background-color: black;
  width:100%;
}
.footer-content{
  padding: 1em 0 1em 0;
  display:flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.footer-email{
  margin-top:1em;
}
.footer-icons{
  margin-top:.5em;
  font-size:2em;
}
.zero-opacity{
  opacity:0;
  transition:5s opacity;
}

.full-opacity{
  opacity:1;
  transition:5s opacity;
}


</style>