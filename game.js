class mainScene {
  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds
    this.load.image("warrior", "assets/warrior.png");
    this.load.image("monster", "assets/monster.png");
  }
  create() {
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    this.warrior = this.physics.add.sprite(100, 100, "warrior");
    this.warrior.setScale(0.5);
    this.monster = this.physics.add.sprite(300, 300, "monster");
    this.monster.setScale(0.2);

    //add score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: " + this.score, {
      fontSize: "24px",
      fill: "#ffffffff",
    });

    this.arrow = this.input.keyboard.createCursorKeys();
  }
  hit() {
    //change the position of monster randomly
    this.monster.x = Phaser.Math.Between(100, 600);
    this.monster.y = Phaser.Math.Between(100, 600);

    //increment score
    this.score += 10;

    //display updated score
    this.scoreText.setText("Score: " + this.score);

    //make the warrior temporarily grow after a kill
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
    // This method is called 60 times per second after create()
    // It will handle all the game's logic, like movements
    //check for hits
    if (this.physics.overlap(this.monster, this.warrior)) {
      this.hit();
    }

    //handle horizontal movement
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
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: "#225103ff", // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: "arcade" }, // The physics engine to use
  parent: "game", // Create the game inside the <div id="game">
});
