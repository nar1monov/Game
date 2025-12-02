class PreloadScene extends Phaser.Scene {
    constructor() { super('PreloadScene'); }
  
    preload() {
      // Load basic rectangle textures for placeholder graphics
      this.createRect('player', 50, 100, 0x00ffcc);
      this.createRect('enemy', 50, 100, 0xff4444);
      this.createRect('road', 480, 800, 0x333333);
    }
  
    createRect(key, w, h, color) {
      const g = this.add.graphics();
      g.fillStyle(color, 1);
      g.fillRect(0, 0, w, h);
      g.generateTexture(key, w, h);
      g.destroy();
    }
  
    create() {
      this.scene.start('GameScene', { level: window.START_LEVEL });
    }
  }
  