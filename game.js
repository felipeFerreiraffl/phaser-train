// Configurações do jogo
var config = {
  width: 256,
  height: 272,
  backgroundColor: "#0C0C0C",
  // Cenas do jogo
  scene: [Scene1, Scene2],
  pixelArt: true,
  // Adiciona físicas ao jogo
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    }
  }
};

var gameSettings = {
  playerSpeed: 200,
}

// Criação de uma nova instância do jogo Phaser
// config é usado como parâmetro para carregar as configurações
var game = new Phaser.Game(config);
