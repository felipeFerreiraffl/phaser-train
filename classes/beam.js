// Animações específicas do tiro
class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y - 16;

        super(scene, x, y, "beam"); // Referencia o sprite do beam para o pai

        // Adiciona um objeto existente
        scene.add.existing(this);

        // Ativa a nnimação do projétil
        this.play("beam_anim");
        // Adiciona física ao projétil
        scene.physics.world.enableBody(this);
        // Atira o objeto para cima 
        this.body.velocity.y = -250;

        // Cria o objeto
        scene.projectiles.add(this);
    }

    // Faz desaparecer os projéteis em determinada altura
    // Isso evita que os projéteis se acumulem infinitamente, causand problema de performance
    update() {
        if (this.y < 32) {
            this.destroy();
        }
    }
}