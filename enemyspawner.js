// EnemySpawner.js
// Yo'ldagi dushman mashinalarni yaratish

export default class EnemySpawner {
    constructor(scene) {
      this.scene = scene;
      this.enemies = scene.physics.add.group();
      this.spawnTimer = 0;
    }
  
    update(dt, levelData) {
      this.spawnTimer += dt;
      if(this.spawnTimer > levelData.spawnRate){
        this.spawnEnemy(levelData);
        this.spawnTimer = 0;
      }
  
      this.enemies.children.iterate(enemy => {
        if(enemy){
          enemy.y += levelData.enemySpeed * dt;
          if(enemy.y > 900) enemy.destroy();
        }
      });
    }
  
    spawnEnemy(levelData){
      const laneX = [140, 240, 340];
      const x = Phaser.Utils.Array.GetRandom(laneX);
      const enemy = this.enemies.create(x, -100, 'enemy');
      enemy.setImmovable(true);
    }
  }