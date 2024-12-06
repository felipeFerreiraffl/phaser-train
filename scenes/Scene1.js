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

    // this.load.image("ship1", "assets/images/ship.png");
    // this.load.image("ship2", "assets/images/ship2.png");
    // this.load.image("ship3", "assets/images/ship3.png");

    // Carregamento de spritesheets (imagens com vários frames)
    // Ele se localiza na pasta spritesheets pois são mais pesados do que as imagens
    this.load.spritesheet("ship1", "assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16,
    });

    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("player", "assets/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    // Carrega um bitmap de fontes
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
  }

  // Adiciona objetos ao jogo
  create() {
    // Criação de texto (posição x, posição y, texto)
    this.add.text(20, 20, "Carregando...");

    // Inicia a cena 2
    this.scene.start("playGame");

    // Cria uma animação com os sprites
    // key: id da animação (nome)
    // frames: cria um array de frames
    // frameRate: velocidade da animação (frames por seguundo)
    // repeat: quantas vezes vai ocorrer o loop
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship1"),
      frameRate: 20,
      repeat: -1, // -1 para loops infinitos
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1, // -1 para loops infinitos
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1, // -1 para loops infinitos
    });
    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true, // O sprite desaparece após o loop
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    // start e end determina dois objetos diferentes com o mesmo sprite
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1,
    });
  }

  // Loop contínuo, ou seja, coisas que rodarão constantemente
  update() {}
}
