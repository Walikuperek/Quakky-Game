class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() {
        this.load.image('background', 'assets/environment/background.png');
        this.load.image('columns', 'assets/environment/columns.png');

        this.load.image('fly01', 'assets/flyingBat/fly01.png');
        this.load.image('fly02', 'assets/flyingBat/fly02.png');
        this.load.image('fly03', 'assets/flyingBat/fly03.png');
        this.load.image('fly04', 'assets/flyingBat/fly04.png');
        this.load.image('fly05', 'assets/flyingBat/fly05.png');
        this.load.image('fly06', 'assets/flyingBat/fly06.png');
        this.load.image('fly07', 'assets/flyingBat/fly07.png');

        this.load.spritesheet('flyDeath', 'assets/flyingBat/destr_effect_sheet.png', { frameWidth: 80, frameWidth: 80 });

        this.load.image('pillarTop', 'assets/pillars/pillar_top.png');
        this.load.image('pillarBottom', 'assets/pillars/pillar_bottom.png');

        this.load.image('gandalf', 'assets/gandalfPng.png');
    }

    create() {
        this.scene.start('PlayScene');

        this.anims.create({
            key: 'fly',
            frames: [
            { key: 'fly01', frame: null },
            { key: 'fly02', frame: null },
            { key: 'fly03', frame: null },
            { key: 'fly04', frame: null },
            { key: 'fly05', frame: null },
            { key: 'fly06', frame: null },
            { key: 'fly07', frame: null },
            ],
            frameRate: 14,
            repeat: -1
        });

        this.anims.create({ key: 'death', frames: this.anims.generateFrameNumbers('flyDeath', { start: 0, end: 4 }), frameRate: 10, repeat: 0 });
    }
}

/**
 * @function parallaxBackground
 * @param { this } background 
 * @param { move Speed Rate } tilePositionXChange
 * 
 * Update background move when camera moves
 */
function parallaxBackground(scene, background, tilePositionXChange = 1) {
    background.tilePositionX = scene.myCam.scrollX * tilePositionXChange;
}