/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Cameras(scene, map, player) {
  // set bounds so the camera won't go outside the game world
  scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  // make the camera follow the player
  scene.cameras.main.startFollow(player);
  
  // set background color, so the sky is not black    
  scene.cameras.main.setBackgroundColor('#ccccff'); 

  return scene;
}
