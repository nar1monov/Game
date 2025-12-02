export default class Player {
    constructor(scene) {
      this.scene = scene;
      this.sprite = scene.physics.add.sprite(240, 650, 'player');
      this.sprite.setCollideWorldBounds(true);
      this.speed = 300;
    }
  
    update(cursors) {
      this.sprite.setVelocityX(0);
  
      if (cursors.left.isDown) {
        this.sprite.setVelocityX(-this.speed);
      } else if (cursors.right.isDown) {
        this.sprite.setVelocityX(this.speed);
      }
    }
  }
  