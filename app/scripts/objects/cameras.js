/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Cameras(scene) {
  this.scene = scene
}

Cameras.prototype.create = (scene) => {
  // set bounds so the camera won't go outside the game world
  scene.cameras.main.setBounds(0, 0, scene.get("map").map.widthInPixels, scene.get("map").map.heightInPixels);
  // make the camera follow the player
  scene.cameras.main.startFollow(scene.get("player"));
  
  // set background color, so the sky is not black    
  scene.cameras.main.setBackgroundColor('#ccccff'); 

  scene.cameras.main.roundPixels = true;

}
