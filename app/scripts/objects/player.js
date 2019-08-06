/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Player(scene) {
  let player = scene.physics.add.sprite(0, 0, 'player');
  player.scene = scene;

  player.scaleX = 0.3;
  player.scaleY = 0.3;
  player.setBounce(0.2); // our player will bounce from items
  player.setCollideWorldBounds(true); // don't go out of the map

  player.state = 'idle';
  player.update = update.bind(player);
  player.updateText = updateText.bind(player);

  player.container = scene.add.container(200, 200);

  player.container.add(player);

  return player;
}

function update () {
  this.anims.play(this.state, true);
}

function updateText(text){
  var text = this.scene.add.text(0, -20, 'Testing');
  text.font = "Arial";
  text.setOrigin(0.5, 0.5);
  this.container.add(text)
}

