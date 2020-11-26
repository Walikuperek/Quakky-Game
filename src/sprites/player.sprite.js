class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.stats = {
            flySpeed: 130,
            jumpSpeed: 230,
            HP: 100,
            score: 0,
            dead: false,
            restartBtnClick: false
        };

        this.scene = scene;

        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.setCollideWorldBounds(true);
        this.body.setSize(20, 20);
    }

    jump() {
        this.setVelocityY(-this.stats.jumpSpeed);
    }

    update() {

        if (this.stats.dead !== true) {

            if (this.y >= 220) {
                this.stats.dead = true;
                this.calcPlayersScore();
                this.showReplayButton();
            }

            this.showPlayerHP();
            // this.showPlayersScore(); // with score shown
            this.calcPlayersScore(); // if (above is commented): w/o score shown but still calculated 
            this.getKeyState(this.keySpace);
    
            if (this.keySpace.isPressed) {
                this.jump();
            } else {
                this.setVelocityX(this.stats.flySpeed);
                this.anims.play('fly', true);
            }
        } else {
            this.showReplayButton();
        }
    }

    playerHurt(dmg = 5) {
        this.stats.HP -= dmg;

        if (this.stats.HP <= 0) {
            this.stats.dead = true;
        }
    }

    showReplayButton() {
        this.setVelocityX(0);
        const SCORE_DESC = this.scene.add.text(150, 5, 'SCORE', { fontSize: '37px', fill: 'red' });
        SCORE_DESC.setScrollFactor(0);
        const SCORE = this.scene.add.text(180, 25, this.stats.score, { fontSize: '37px', fill: 'gold' });
        SCORE.setScrollFactor(0);
        

        const replaySprite = this.scene.add.sprite(192, 100, 'pillarTop').setInteractive().setScrollFactor(0);
        replaySprite.angle = 90;

        const REPLAY = this.scene.add.text(160, 93, 'REPLAY', { fontSize: '16px', fill: 'WHITE' });
        REPLAY.setScrollFactor(0);

        replaySprite.on('pointerover', (event) => {
            replaySprite.setTint(0xff0000);
        });

        replaySprite.on('pointerout', (event) => {
            replaySprite.clearTint();
        });

        replaySprite.on('pointerup', (event) => {
            this.resetPlayerPosition();
        });
    }


    resetPlayerPosition() {
        this.stats.restartBtnClick = true; // contact with play update()
    }

    showPlayerHP() {
        if (this === undefined) return;
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0x000000 }, fillStyle: { color: 0xff0000 } });
        this.graphics.setScrollFactor(0);

        const pointsOutline = [
            { x: 10, y: 10 },
            { x: 110, y: 20 }
        ];
        const pointsFill = [
            { x: 10, y: 10 },
            { x: this.stats.HP + 10, y: 20 }
        ];

        this.rect = Phaser.Geom.Rectangle.FromPoints(pointsOutline, this.rect);
        this.rectFill = Phaser.Geom.Rectangle.FromPoints(pointsFill, this.rectFill);

        this.graphics.strokeRectShape(this.rect);
        this.graphics.fillRectShape(this.rectFill);
        this.scene.time.delayedCall(10, () => { this.graphics.clear(); }, this, this.scene);
    }

    calcPlayersScore() {
        this.stats.flySpeed += 0.3;
        // this.stats.flySpeed = 1 + this.stats.score * (10 + this.stats.flySpeed)
        if (this.x >= 100) {
            return this.stats.score = Math.round(this.x - 100);
        } else {
            return this.stats.score = 0;
        }
    }

    showPlayersScore() {
        this.scoreDisplay.destroy();
        this.calcPlayersScore();

        this.scoreDisplay = this.scene.add.text(30, 25, this.stats.score, { fontSize: '14px', fill: 'white' });
        this.scoreDisplay.setScrollFactor(0);
        this.scoreTextDisplay = this.scene.add.text(10, 21, 'm', { fontSize: '20px', fill: 'gold' });
        this.scoreTextDisplay.setScrollFactor(0);
    }
    
    getKeyState(key) {
        key.isPressed = !key.previous_down && key.isDown;
        key.isReleased = key.previous_down && !key.isDown;
        key.previous_down = key.isDown;
    }
}

