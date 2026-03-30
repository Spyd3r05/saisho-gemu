class mainScene {
  preload() {
    this.load.image("warrior", "assets/warrior.png");
    this.load.image("monster", "assets/monster.png");
    this.load.image("background", "assets/background.jpg");
  }

  create() {
    this.add.image(400, 220, "background").setScale(1.2);

    this.warrior = this.physics.add.sprite(100, 100, "warrior");
    this.warrior.setScale(0.5);
    this.warrior.setCollideWorldBounds(true);

    this.monster = this.physics.add.sprite(300, 300, "monster");
    this.monster.setScale(0.2);

    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: " + this.score, {
      fontSize: "24px",
      fill: "#ffffffff",
    });

    this.arrow = this.input.keyboard.createCursorKeys();
    this.monster.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100),
    );
    this.monster.setCollideWorldBounds(true);
    this.monster.setBounce(1);
  }

  hit() {
    // Get the monster's half‑width and half‑height (based on its scaled size)
    const halfWidth = this.monster.displayWidth / 2;
    const halfHeight = this.monster.displayHeight / 2;

    // Define the safe range: from half‑size to (world width - half‑size)
    const minX = halfWidth;
    const maxX = this.physics.world.bounds.width - halfWidth;
    const minY = halfHeight;
    const maxY = this.physics.world.bounds.height - halfHeight;

    // Place the monster randomly but fully inside the world
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
    if (this.physics.overlap(this.monster, this.warrior)) {
      this.hit();
    }

    if (this.arrow.right.isDown) {
      this.warrior.x += 2;
    }
    if (this.arrow.left.isDown) {
      this.warrior.x -= 2;
    }
    if (this.arrow.up.isDown) {
      this.warrior.y -= 2;
    }
    if (this.arrow.down.isDown) {
      this.warrior.y += 2;
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
