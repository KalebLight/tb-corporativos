//https://devops.ifrn.edu.br/2018/08/16/crie-seu-micro-servico/


def configFile = ''
def buildImage = 'node:latest'

continuousDelivery(configFile) {
  docker.image(buildImage).inside() {
    sh ""
  }
}
