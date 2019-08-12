/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Physics.Arcade.Sprite} player
 */
export default function Gems(scene, map, player) {
  const spawns = scene.physics.add.group({ classType: Phaser.GameObjects.Zone });
  scene.physics.add.collider(map.groundLayer, spawns);

  for(var i = 0; i < 30; i++) {
    var x = Phaser.Math.RND.between(0, scene.physics.world.bounds.width);
    var y = scene.groundLevel;
    // parameters are x, y, width, height
    const spawn = spawns.create(x, y, 20, 20);   
    spawn.name = 'Ruby';         
  }      
  scene.physics.add.overlap(player, spawns, player.collect, false, scene);
 
  return spawns;
}

