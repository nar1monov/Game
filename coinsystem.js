
// GameScene.js ichida EnemySpawner va CoinSystem integratsiyasi

class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }
  
    init(data){
      this.level = data.level || 1;
      this.levelData = window.levels[this.level];
    }
  
    create(){
      // background road
      this.road = this.add.tileSprite(240,400,480,800,'road');
  
      // player
      this.player = new Player(this);
  
      // enemy spawner
      this.enemySpawner = new EnemySpawner(this);
  
      // coin system
      this.coinSystem = new CoinSystem(this);
  
      // keys
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // progress
      this.distance = 0;
      this.targetDist = this.levelData.distance;
  
      // collider
      this.physics.add.collider(this.player.sprite, this.enemySpawner.enemies, ()=>{
        this.gameOver();
      });
  
      this.coinSystem.collect(this.player);
  
      // UI scene
      this.scene.launch('UIScene', { level: this.level });
    }
  
    update(time, delta){
      const dt = delta/1000;
  
      // scroll road
      this.road.tilePositionY -= this.levelData.speed * dt;
  
      // player movement
      this.player.update(this.cursors);
  
      // update enemies
      this.enemySpawner.update(dt, this.levelData);
  
      // update coins
      this.coinSystem.update(dt, this.levelData.speed);
  
      // progress
      this.distance += this.levelData.speed * dt;
      let percent = Math.floor((this.distance / this.targetDist) * 100);
      if(percent>100) percent=100;
      window.currentProgress = percent;
  
      if(percent>=100){ this.completeLevel(); }
    }
  
    gameOver(){
      this.scene.stop('UIScene');
      this.scene.start('UIScene', { gameOver:true, level:this.level });
    }
  
    completeLevel(){
      let coins = window.load('tr_coins',0);
      coins += this.levelData.reward;
      window.save('tr_coins', coins);
  
      this.scene.stop('UIScene');
      this.scene.start('UIScene', { win:true, level:this.level });
    }
  }