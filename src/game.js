const config = {
    type: Phaser.WEBGL,
    parent: 'game-app',
    // width: 384,
    // height: 200,
    width: 356,
    height: 200,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    antialias: false,
    clearBeforeRender: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // debug: true,
            // debugShowBody: true,
            // debugShowStaticBody: true,
            // debugShowVelocity: true,
            // debugVelocityColor: 0xffff00,
            // debugBodyColor: 0x0000ff,
            // debugStaticBodyColor: 0xffffff
        }
    },
    scene: [
        PreloadScene,
        PlayScene
    ],
}

const game = new Phaser.Game(config);
