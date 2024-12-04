// Criação de uma scene que carrega todas as características ca classe super()
class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  // Preparação dos dados da cena
  init() {}

  // Carrega os assets do jogo (músicas, imagens, etc.) na memória
  preload() {}

  // Adiciona objetos ao jogo
  create() {
    // Adiciona a imagem carregada da Scene 1 (x, y, nome dado à imagem)
    // this.background = this.add.image(0, 0, "background");

    // Repete a textura do background
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");

    // Seta a origem da imagem no canto superior esquerdo
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.image(
      config.width / 2 - 50,
      config.height / 2,
      "ship1"
    );
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.image(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    // Criação de texto (posição x, posição y, texto)
    // Usa-se {} para estilos específicos
    this.add.text(20, 20, "Jogando!", { font: "20px Arial", fill: "green" });
  }

  // Loop contínuo, ou seja, coisas que rodarão constantemente
  update() {
    // Aumenta ou diminui a escala da imagem
    this.ship1.setScale(3);

    // Adiciona um flip tanto em Y (flipY) como em X (flipX)
    this.ship2.flipY = true;

    // Rotaciona a imagem, podendo alterar a velocidade de rotação
    this.ship3.angle += 5;

    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    // Diminui a posição da textura da imagem
    this.background.tilePositionY -= 0.5;
  }

  // * Funções *

  // Move as naves no eixo Y, retornando no início ao chegar no final
  moveShip(ship, speed) {
    ship.y += speed;

    // Caso a nova ultrapasse o final, ele ativa o reset
    if (ship.y > config.height) {
        this.resetShipPos(ship);
    }
  }

  // Reseta as naves à posição y0 e coloca as naves em posições x aleatórias 
  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  };
}
