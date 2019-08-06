/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Map(scene) {

  let map = scene.make.tilemap({key: 'map'});

  //Background
  let natureTiles = map.addTilesetImage('nature');
  map.createStaticLayer('Background2', natureTiles, 0, 0);
  map.createStaticLayer('Background', natureTiles, 0, 0);

  // tiles for the ground layer
  let groundTiles = map.addTilesetImage('tiles');
  // create the ground layer
  map.groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
  // the player will collide with this layer
  map.groundLayer.setCollisionByExclusion([-1]);

  let cauldron = scene.physics.add.sprite(400, 100, 'alchemy', 'cauldron');
  scene.physics.add.collider(map.groundLayer, cauldron);


  // coin image used as tileset
  let coinTiles = map.addTilesetImage('coin');
  // add coins as tiles
  map.coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

  // set the boundaries of our game world
  scene.physics.world.bounds.width = map.groundLayer.width;
  scene.physics.world.bounds.height = map.groundLayer.height;

  return map;
}
