import DataManager from '../libs/dataManager'
/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "player");
  }

  create() {
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
    this.setSize(this.width*0.3, this.height);
    this.scaleX = 0.3;
    this.scaleY = 0.3;
    this.setBounce(0.2); // our player will bounce from items
    this.state = 'idle';

    // when the player overlaps with a tile with index 17, collectCoin will be called    
    scene.physics.add.overlap(this, scene.get("map").coinLayer); 
    scene.physics.add.overlap(this, scene.get("cauldron"), this.transferRubies.bind(this), false, scene);
  }

  transferRubies(from_, to){
    this.DataManager.transferAmt(from_, to, 'rubies');
    /*const take_rubies = from_.getData('rubies');
    from_.setData('rubies', 0);

    const has_rubies = to.getData('rubies');
    const give_rubies = (has_rubies?has_rubies:0) + (take_rubies?take_rubies:0);
    to.setData('rubies', give_rubies);*/
  }

  update (scene) {
    this.anims.play(this.state, true);
  }

  collect(player, toCollect) {
    player.DataManager.increment('rubies');
    toCollect.destroy();
  }


}



/*
function updateText(text){
  text = this.scene.add.text(0, -20, 'Testing');
  text.font = 'Arial';
  text.setOrigin(0.5, 0.5);
  this.container.add(text);
}
*/
