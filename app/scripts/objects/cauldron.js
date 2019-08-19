export default class Cauldron extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {Phaser.Tilemaps.Tilemap} map
   * @memberof UIBox
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'alchemy', 'cauldron');
  }

  /** @param {Phaser.Scene} scene */
  create(scene){
    //let cauldron = scene.physics.add.sprite(700, scene.groundLevel, 'alchemy', 'cauldron');
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setDataEnabled();

    
  }

  toggle(){
    this.visible = !this.visible;
  }
}

