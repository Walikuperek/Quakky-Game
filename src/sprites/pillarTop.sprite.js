class PillarTop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pillarTop');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.setAllowGravity(false);

        this.x = x;
        this.y = 30;

        this.scene = scene;

        this.scene.add.sprite(this.x, this.y, 'pillarTop');
        this.setCollideWorldBounds(true);
        this.body.setSize(32, 65);
    }

}