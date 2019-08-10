import { func } from "prop-types";

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export default function Player(scene, map) {
  let player = scene.physics.add.sprite(0, 0, 'player');
  player.scene = scene;

  scene.physics.add.collider(map.groundLayer, player);

  player.scaleX = 0.3;
  player.scaleY = 0.3;
  player.setBounce(0.2); // our player will bounce from items
  player.setCollideWorldBounds(true); // don't go out of the map

  player.state = 'idle';
  player.update = update.bind(player);
  player.updateText = updateText.bind(player);
  player.collect = collect.bind(player);

  player.container = scene.add.container(200, 200);

  player.container.add(player);

  return player;
}

function update () {
  this.anims.play(this.state, true);
}

function collect() {
  console.log("Collected");
}

function updateText(text){
  var text = this.scene.add.text(0, -20, 'Testing');
  text.font = "Arial";
  text.setOrigin(0.5, 0.5);
  this.container.add(text)
}

