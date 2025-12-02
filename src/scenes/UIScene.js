class UIScene extends Phaser.Scene {
    constructor(){ super('UIScene'); }
  
    init(data){
      this.gameOver = data.gameOver || false;
      this.win = data.win || false;
      this.level = data.level || 1;
    }
  
    create(){
      // UI text style
      const style = { fontSize:'32px', color:'#fff', fontFamily:'Arial', stroke:'#000', strokeThickness:4 };
  
      // progress display
      this.progressText = this.add.text(20,20,'0%', style).setDepth(20);
  
      // coin display
      const coins = load('tr_coins',0);
      this.coinText = this.add.text(350,20, coins + '💰', style).setDepth(20);
  
      // if game over screen
      if(this.gameOver){
        this.centerText('GAME OVER');
        this.makeButton('Restart', 400, ()=>{
          this.scene.stop('GameScene');
          this.scene.start('GameScene', { level:this.level });
        });
        return;
      }
  
      // if win screen
      if(this.win){
        this.centerText('LEVEL COMPLETE!');
        this.makeButton('Restart', 380, ()=>{
          this.scene.stop('GameScene');
          this.scene.start('GameScene', { level:this.level });
        });
  
        this.makeButton('Next Level', 460, ()=>{
          const next = Math.min(200, this.level + 1);
          save('tr_start_level', next);
          this.scene.stop('GameScene');
          this.scene.start('GameScene', { level: next });
        });
        return;
      }
    }
  
    update(){
      if(!this.gameOver && !this.win){
        const p = window.currentProgress || 0;
        this.progressText.setText(p + '%');
        this.coinText.setText(load('tr_coins',0) + '💰');
      }
    }
  
    centerText(msg){
      this.add.text(80,300,msg,{ fontSize:'48px', color:'#fff', fontFamily:'Arial', stroke:'#000', strokeThickness:6 });
    }
  
    makeButton(label, y, onClick){
      const btn = this.add.text(120,y,label,{ fontSize:'40px', color:'#ffff00', fontFamily:'Arial', stroke:'#000', strokeThickness:5 })
        .setInteractive();
  
      btn.on('pointerdown', onClick);
    }
  }