// config.js
// Phaser o'yini konfiguratsiyasi

const WIDTH = 480;
const HEIGHT = 800;

const gameConfig = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: [PreloadScene, GameScene, UIScene]
};

window.game = new Phaser.Game(gameConfig);