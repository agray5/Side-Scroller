/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export default function Player(scene, map) {
  let player = scene.physics.add.sprite(0, 0, 'player');
  player.setSize(player.width*0.3, player.height);

  player.setDataEnabled();
                            
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
  player.on('collectRuby', collectRuby.bind(player));

  return player;
}



function update () {
  this.anims.play(this.state, true);
}

/**
 * @this {Phaser.Physics.Arcade.Sprite}
 */
function collectRuby(){
  const rubies = this.getData('rubies');
  this.setData('rubies', rubies?rubies+1:1);
}

/**
 * @this {Phaser.Physics.Arcade.Sprite}
 * @param {Phaser.Physics.Arcade.Sprite} player 
 * @param {Phaser.GameObjects.GameObject } toCollect 
 */
function collect(player, toCollect) {
  player.emit('collect'+toCollect.name);
  toCollect.destroy();
}

function updateText(text){
  text = this.scene.add.text(0, -20, 'Testing');
  text.font = 'Arial';
  text.setOrigin(0.5, 0.5);
  this.container.add(text);
}

