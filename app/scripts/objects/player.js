/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Player(scene) {
  let player = scene.physics.add.sprite(200, 200, 'player');
  player.scaleX = 0.3;
  player.scaleY = 0.3;
  player.setBounce(0.2); // our player will bounce from items
  player.setCollideWorldBounds(true); // don't go out of the map

  player.state = 'idle';
  player.update = update.bind(player);
  return player;
}

function update () {
  this.anims.play(this.state, true);
}

