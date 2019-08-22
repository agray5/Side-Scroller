
import Player from './player';

export default class Input {
/**
 * @param {Phaser.Scene} scene 
 */
  constructor (scene, player) {
    this.input = scene.input.keyboard.createCursorKeys();
    this.scene = scene;
  }

  update (scene, /*t, dt*/) {
    /** @type{Player} */
    const player = scene.get("player");

    if (this.input.left.isDown) {
      player.walk(-200, true);
      /*
      player.body.setVelocityX(-200); // move left
      if(player.body.onFloor()) player.state = 'walk'; // play walk animation
      player.flipX = true; // flip the sprite to the left*/
    }
    else if (this.input.right.isDown) {
      player.walk(200, false);
      /*
      player.body.setVelocityX(200); // move right
      if(player.body.onFloor()) player.state = 'walk'; // play walk animatio
      player.flipX = false; // use the original sprite looking to the right
      */
    }
    else {
      player.walk(0);
      /*
      player.body.setVelocityX(0);
      if(player.body.onFloor()) player.state = 'idle';*/
    }  
    if ((this.input.space.isDown || this.input.up.isDown) && player.body.onFloor()) {
      player.jump(-500);
      /*
      player.state = 'jump';
      player.body.setVelocityY(-500); // jump up*/
    }
  }

};