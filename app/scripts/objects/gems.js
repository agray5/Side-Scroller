/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Physics.Arcade.Sprite} player
 */
export default class Gems extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    super(scene.physics.world, scene);
  }


  /** @param {Phaser.Scene} scene  */
  create(scene){
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
    for(var i = 0; i < 30; i++) {
      var x = Phaser.Math.RND.between(0, scene.physics.world.bounds.width);
      var y = scene.groundLevel;
      // parameters are x, y, width, height
      const spawn = super.create(x, y, 'ruby') //.create(x, y, 20, 20);   
      spawn.scaleX = 0.5;
      spawn.scaleY = spawn.scaleX;
      spawn.name = 'Ruby';         
    }

    scene.physics.add.overlap(scene.get("player"), this, scene.get("player").collect, false, scene);
  }
}

