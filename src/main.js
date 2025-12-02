const WIDTH = 480;
const HEIGHT = 800;

const config = {
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

window.game = new Phaser.Game(config);

// Simple global storage helpers
window.save = (k,v)=>localStorage.setItem(k, JSON.stringify(v));
window.load = (k,def)=>{ try{const s=localStorage.getItem(k); return s?JSON.parse(s):def;}catch(e){return def} };

// start at level 1 by default
window.START_LEVEL = load('tr_start_level',1) || 1;

// ensure default coin storage
if(load('tr_coins',null)===null) save('tr_coins',0);

console.log('Traffic Racer ready');
