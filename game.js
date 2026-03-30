class mainScene {
  preload() {
    this.load.image("warrior", "assets/warrior.png");
    this.load.image("monster", "assets/monster.png");
    this.load.image("background", "assets/background.jpg");
  }

  create() {
    this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.game.config.width, this.game.config.height);

    this.physics.world.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
    );

    this.warrior = this.physics.add.sprite(100, 100, "warrior");
    this.warrior.setScale(0.5);
    this.warrior.setCollideWorldBounds(true);

    this.monster = this.physics.add.sprite(300, 300, "monster");
    this.monster.setScale(0.2);
    this.monster.setCollideWorldBounds(true);
    this.monster.setBounce(1);
    this.monster.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100),
    );

    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: " + this.score, {
      fontSize: "24px",
      fill: "#ffffffff",
    });

    this.arrow = this.input.keyboard.createCursorKeys();

    // Timer variables
    this.timeLeft = 30;
    this.timerText = this.add.text(600, 16, "Time: " + this.timeLeft, {
      fontSize: "24px",
      fill: "#ffffffff",
    });

    this.timeEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.gameActive = true;
  }

  updateTimer() {
    if (this.gameActive) {
      this.timeLeft--;
      this.timerText.setText("Time: " + this.timeLeft);
      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.gameActive = false;
    // Stop all movement
    this.monster.body.setVelocity(0);
    this.warrior.body.setVelocity(0);
    // Make them immovable so they can't be pushed
    this.monster.body.setImmovable(true);
    this.warrior.body.setImmovable(true);

    this.add
      .text(300, 200, "GAME OVER", {
        fontSize: "48px",
        fill: "#ff0000",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(300, 260, "Final Score: " + this.score, {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
  }

  hit() {
    const halfWidth = this.monster.displayWidth / 2;
    const halfHeight = this.monster.displayHeight / 2;

    const minX = halfWidth;
    const maxX = this.physics.world.bounds.width - halfWidth;
    const minY = halfHeight;
    const maxY = this.physics.world.bounds.height - halfHeight;

    this.monster.x = Phaser.Math.Between(minX, maxX);
    this.monster.y = Phaser.Math.Between(minY, maxY);

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    this.tweens.add({
      targets: this.warrior,
      scaleX: 0.6,
      scaleY: 0.6,
      duration: 100,
      yoyo: true,
      repeat: 1,
    });
  }

  update() {
    if (!this.gameActive) return;

    if (this.physics.overlap(this.monster, this.warrior)) {
      this.hit();
    }

    let vx = 0,
      vy = 0;

    if (this.arrow.right.isDown) vx = 200;
    if (this.arrow.left.isDown) vx = -200;
    if (this.arrow.up.isDown) vy = -200;
    if (this.arrow.down.isDown) vy = 200;

    this.warrior.setVelocity(vx, vy);

    // Randomly change monster direction
    if (Phaser.Math.Between(0, 120) === 0) {
      this.monster.setVelocity(
        Phaser.Math.Between(-100, 100),
        Phaser.Math.Between(-100, 100),
      );
    }
  }
}

new Phaser.Game({
  width: 800,
  height: 600,
  scene: mainScene,
  physics: { default: "arcade" },
  parent: "game",
});
