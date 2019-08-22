
import Player from './player';


export default class Input {
/**
 * @param {Phaser.Scene} scene 
 */
  constructor (scene, player) {
    this.WASD = scene.input.keyboard.addKeys(
      {
        up:   Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D
      });
    this.input = scene.input.keyboard.createCursorKeys();
    this.scene = scene;
  }

  update (scene, /*t, dt*/) {
    /** @type{Player} */
    const player = scene.get("player");

    if (this.input.left.isDown || this.WASD.left.isDown) {
      player.walk(-200, true);
      /*
      player.body.setVelocityX(-200); // move left
      if(player.body.onFloor()) player.state = 'walk'; // play walk animation
      player.flipX = true; // flip the sprite to the left*/
    }
    else if (this.input.right.isDown || this.WASD.right.isDown) {
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
    if ((this.input.space.isDown || this.input.up.isDown || this.WASD.up.isDown) && player.body.onFloor()) {
      player.jump(-500);
      /*
      player.state = 'jump';
      player.body.setVelocityY(-500); // jump up*/
    }
  }

};