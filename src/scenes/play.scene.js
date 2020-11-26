class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        this.backgroundCreate();

        // add pillars
        const arr = [];
        for (let i = 1; i < 100; i++) {
            this.pillars = new PillarTop(this, game.config.width * i + Math.random() * 50);
            arr.push(this.pillars);
            this.pillars = new PillarBottom(this, game.config.width * i + Math.random() * 50);
            arr.push(this.pillars);

        }

        // display 1k, 2k, 3k, etc...
        for (let i = 0; i < 100; i++) {
            const pointsToDisplay = i + 'k';
            this.xPoints = this.add.text((i * 1000) + 100, 180, pointsToDisplay, { fontSize: '20px', fill: 'red' });
        }


        // ending walls after ~35-36k score
        const endWalls = [];
        endWalls.push(new PillarBottom(this, 35500, 35, true));
        endWalls.push(new PillarBottom(this, 35500, 105, true));
        endWalls.push(new PillarBottom(this, 35500, 170, true));
        this.gandalf = this.add.sprite(35570, 100, 'gandalf').setScale(0.3);
        this.uShall = this.add.text(35520, 125, 'YOU SHALL', { fontSize: '24px', fill: 'white' });
        this.notPass = this.add.text(35520, 165, 'NOT PASS!', { fontSize: '24px', fill: 'white' });


        this.player = new Player(this, 0, 0);

        this.input.on('pointerdown', (pointer) => {
            this.player.jump();
        });


        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, Infinity, game.config.height);
        this.physics.world.setBounds(0, 0, Infinity, game.config.height, true, true, true, false);
        this.cameras.main.roundPixels = true;
        this.myCam.startFollow(this.player);

        this.physics.add.collider(this.player, endWalls); // player cannot go through end pillars
        this.physics.add.overlap(this.player, arr, playerHit, null, this); // player will got dmg when overlap pillars
    }

    update() {
        if (this.player.stats.restartBtnClick === true) {
            this.scene.restart();
        }
        this.player.update();

        /* ---------------------- PARALLAX BACKGROUND ---------------------- */
        parallaxBackground(this, this.background, .1);
        parallaxBackground(this, this.columns, .3);
    }

    /**
     * @function backgroundCreate
     * 
     * Creating background variables
     * Setting pivots to the top-left corners
     * Fixing it to prevent from moving
     */
    backgroundCreate() {

        // Create an tiled sprite with the size of our game screen
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.columns = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'columns');

        this.background.setOrigin(0, 0).setScrollFactor(0);
        this.columns.setOrigin(0, 0).setScrollFactor(0);
    }
}


function playerHit(player, pillar) {
    this.myCam.shake(50, 0.02);
    player.playerHurt();
    
    player.setTint(0xff0000); // Not working uless WebGL

    this.tweens.add({
        targets: this.player,
        duration: 1500,
        repeat: 0,
        onComplete: () => {
        this.player.clearTint()
        }
    });
}
