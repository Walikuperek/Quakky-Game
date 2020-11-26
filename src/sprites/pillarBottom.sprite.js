class PillarBottom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, endWall) {
        super(scene, x, y, 'pillarBottom');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.setAllowGravity(false);

        this.x = x;
        if (endWall === true) {
            this.y = y;
        } else {
            this.y = game.config.height - 30;
        }

        this.scene = scene;

        this.scene.add.sprite(this.x, this.y, 'pillarBottom');
        this.setCollideWorldBounds(true);
        this.body.setSize(32, 65);
    }

}