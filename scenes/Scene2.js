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
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );

    // Seta a origem da imagem no canto superior esquerdo
    this.background.setOrigin(0, 0);

    // Criação de texto (posição x, posição y, texto)
    // Usa-se {} para estilos específicos
    // this.add.text(20, 20, "Jogando!", { font: "20px Arial", fill: "green" });

    // this.ship1 = this.add.image(
    //   config.width / 2 - 50,
    //   config.height / 2,
    //   "ship1"
    // );
    // this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2");
    // this.ship3 = this.add.image(
    //   config.width / 2 + 50,
    //   config.height / 2,
    //   "ship3"
    // );

    // Adição de sprites
    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "ship1"
    );
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    // Adição de sprites dentro de um grupo
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    // Inicia a animação
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    // Destrói o objeto quando clicado
    // gameobjectdown define o evento de click
    // this.DestroyShip é uma função de callback
    // this é o escopo da função
    this.input.on("gameobjectdown", this.destroyShip, this);

    // Torna os objetos interativos
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // Grupo de power-ups (sprites)
    this.powerUps = this.physics.add.group();

    // Laço for para guardar e criar os objetos no grupo
    var maxObjects = 4;
    for (var i = 0; i <= maxObjects; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp); // Adiciona os sprites
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.width);

      // Cria animações aleatórias com em 50% de chance de ser vermelho ou cinza
      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      // Adiciona velocidade ao sprite
      powerUp.setVelocity(100, 100);

      // Adiciona uma "parede" para que o sprite não saia da tela
      powerUp.setCollideWorldBounds(true);

      // Faz o objeto quicar quando chega na parede
      powerUp.setBounce(1);
    }

    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      "player"
    );
    this.player.play("thrust");
    // Adiciona eventos quando aperta os botões das setas
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    // Faz o player não sair da tela ao chegar na parede
    this.player.setCollideWorldBounds(true);

    // Adiciona um keyboard com o espaço
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Adiciona os projéteis no grupo
    this.projectiles = this.add.group();

    // Adiciona colisão entre os projéteis e os power-ups (objeto1, objeto2)
    this.physics.add.collider(
      this.projectiles,
      this.powerUps,
      function (projectile, powerUp) {
        projectile.destroy(); // Destrói o projétil quando toca no power-up
      }
    );

    // Adiciona um overlap (apenas toca, sem simular a física)
    // (objeto1, objeto2, função de callback, escope da função)
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPLayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );

    // Background da pontuação
    // Adiciona uma forma com cor preta
    var graphics = this.add.graphics();
    graphics.fillStyle("#000", 1);

    // Desenha um polígono por coordenadas
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);

    // Fecha o caminho e preenche a forma
    graphics.closePath();
    graphics.fillPath();

    // Inicia a pontuação em 0
    this.score = 0;

    // Criando o texto com bitmap (x, y, id, texto, tamanho da fonte)
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

    // Criando os objetos de áudio
    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

    // Criação da música
    this.music = this.sound.add("music");
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.music.play(musicConfig);
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

    // Controla o jogador
    this.movePlayerManager();

    // Ativa o evento do click do espaço
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      if (this.player.active) {
        this.shootBeam();
      }
    }

    // Faz o método de destruir o projétil para cada um atirado
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  // * Funções extras *

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
  }

  // Destrói os ships ao serem clicados
  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion"); // Muda para o sprite de explosão quando clicado
    gameObject.play("explosion_anim"); // Gera a animação de explosão
  }

  // Movimentos do jogador
  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed); // Move para a esquerda
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed); // Move para a direita
    } else if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed); // Move para a baixo
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed); // Move para a cima
    }
  }

  // Ativa o tiro
  shootBeam() {
    var beam = new Beam(this);
    this.beamSound.play();
  }

  // Coleta os power-ups
  pickPowerUp(player, powerUp) {
    // Desabilita o objeto
    powerUp.disableBody(true, true); // Deixa inativo e esconde o objeto

    this.pickupSound.play();
  }

  // Ativa o overlap quando o player toca no inimigo
  hurtPLayer(player, enemy) {
    this.resetShipPos(enemy); // Reseta a posição do inimigo

    // Verifica se o jagador está em fase de reset
    if (this.player.alpha < 1) {
      return;
    }

    var explosion = new Explosion(this, player.x, player.y);

    player.disableBody(true, true);

    // Adiciona um tempo até o player resetar
    this.time.addEvent({
      delay: 1500, // Tempo do reset em ms
      callback: this.resetPlayer(), // Chamada da função
      calbackScope: this,
      loop: false,
    });

    // this.resetPlayer();
  }

  // Ativa o overlap dos tiros aos inimigos
  hitEnemy(projectile, enemy) {
    // Cria uma instância de explosão quando acerta um inimigo
    var explosion = new Explosion(this, enemy.x, enemy.y);

    projectile.destroy();
    this.resetShipPos(enemy);

    // Aumenta o número baseado em quantos inimigos você derrota
    this.score += 15;
    var scoreFormatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormatted;

    this.explosionSound.play();
  }

  // Adiciona quantidade de zeros
  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }

    return stringNumber;
  }

  // Reseta o jogador na posição inicial
  resetPlayer() {
    var x = config.width / 2 - 8;
    var y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);

    // Deixa o player invencível após resetar por um tempo
    this.player.alpha = 0.5;

    // Volta ao estado original do player
    var tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64, // O jogador é jogado para cima após morrer
      ease: "Power1",
      duration: 1800,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1; // Retorna a trnasparência original após o tween
      },
      callbackScope: this,
    });
  }
}
