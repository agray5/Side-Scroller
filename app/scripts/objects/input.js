/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Physics.Arcade.Sprite} player
 */
export default function Input(scene, player) {
  let cursors = scene.input.keyboard.createCursorKeys();
  cursors.player = player;

  cursors.update = update.bind(cursors);
  return cursors;
}

const update = function(/*t, dt*/) {
  if (this.left.isDown) // if the left arrow key is down
  {
    this.player.body.setVelocityX(-200); // move left
    if(this.player.body.onFloor()) this.player.state = 'walk'; // play walk animation
    this.player.flipX= true; // flip the sprite to the left
  }
  else if (this.right.isDown) // if the right arrow key is down
  {
    this.player.body.setVelocityX(200); // move right
    if(this.player.body.onFloor()) this.player.state = 'walk'; // play walk animatio
    this.player.flipX = false; // use the original sprite looking to the right
  }
  else {
    this.player.body.setVelocityX(0);
    if(this.player.body.onFloor()) this.player.state = 'idle';
  }  
  if ((this.space.isDown || this.up.isDown) && this.player.body.onFloor())
  {
    this.player.state = 'jump';
    this.player.body.setVelocityY(-500); // jump up
  }
};