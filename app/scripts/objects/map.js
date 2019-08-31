
export default class Map {
  /** @param {Phaser.Scene} scene */
  constructor(scene) {
    this.map = scene.make.tilemap({key: 'map'});
    this.scene = scene;
  }

  create(scene){
    const map = this.map;
    
    //scene.add.image(0, 0, 'background').setOrigin(0, 0)

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

    const imageWidth = 1800;
    const imageHeight = 800;
    this.background = this.scene.add.tileSprite(0, 0, map.groundLayer.width, imageHeight, 'background').setOrigin(0, 0)
    this.background.setDepth(-1);


    // coin image used as tileset
    let coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    const coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);
    map.coinLayer = coinLayer;

    // set the boundaries of our game world
    scene.physics.world.bounds.width = map.groundLayer.width;
    scene.physics.world.bounds.height = map.groundLayer.height;

    coinLayer.setTileIndexCallback(17, this.collectCoin, this); // the coin id is 17
  }

  collectCoin(sprite, tile) {
    this.map.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    this.scene.get("score").value ++; // increment the score
    return false;
  }

  update(){
    this.background.tilePositionX += 0.1;
  }
}

