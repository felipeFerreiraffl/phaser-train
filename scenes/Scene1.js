// Criação de uma scene que carrega todas as características ca classe super()
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  // Preparação dos dados da cena
  init() {}

  // Carrega os assets do jogo (músicas, imagens, etc.) na memória
  preload() {
    // Carrega uma imagem (key, path)
    // key = indentificador da imagem
    // path = caminho da imagem no projeto
    this.load.image("background", "assets/images/background.png");
    this.load.image("ship1", "assets/images/ship.png");
    this.load.image("ship2", "assets/images/ship2.png");
    this.load.image("ship3", "assets/images/ship3.png");
  }

  // Adiciona objetos ao jogo
  create() {
    // Criação de texto (posição x, posição y, texto)
    this.add.text(20, 20, "Carregando...");

    // Inicia a cena 2
    this.scene.start("playGame");
  }

  // Loop contínuo, ou seja, coisas que rodarão constantemente
  update() {}
}
