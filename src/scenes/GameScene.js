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
      this.player = new Player(this, 240, 650);
  
      // enemy group
      this.enemies = this.physics.add.group();
      this.spawnTimer = 0;
  
      // movement keys
      this.cursors = this.input.keyboard.createCursorKeys();
      this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  
      // progress
      this.distance = 0;
      this.targetDist = this.levelData.distance;
  
      // collider
      this.physics.add.collider(this.player.sprite, this.enemies, ()=>{
        this.gameOver();
      });
  
      // connect UI
      this.scene.launch('UIScene', { level: this.level });
    }
  
    update(time,delta){
      const dt = delta/1000;
  
      // road scroll
      this.road.tilePositionY -= this.levelData.speed * 50 * dt;
  
      // player movement
      this.player.update(dt, this.cursors, this.A, this.D);
  
      // spawn enemies
      this.spawnTimer += dt;
      if(this.spawnTimer > this.levelData.spawnRate){
        this.spawnEnemy();
        this.spawnTimer = 0;
      }
  
      // move enemies
      this.enemies.children.iterate(e=>{
        if(e){ e.y += this.levelData.enemySpeed * dt; }
        if(e && e.y > 900){ e.destroy(); }
      });
  
      // progress
      this.distance += this.levelData.speed * dt;
      let percent = Math.floor((this.distance / this.targetDist)*100);
      if(percent>100) percent=100;
      window.currentProgress = percent;
  
      if(percent>=100){ this.completeLevel(); }
    }
  
    spawnEnemy(){
      const laneX = [140, 240, 340];
      const x = Phaser.Utils.Array.GetRandom(laneX);
      const e = this.enemies.create(x, -100, 'enemy');
      e.setImmovable(true);
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