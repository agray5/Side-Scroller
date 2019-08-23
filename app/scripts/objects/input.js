
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

  create(scene) {
    scene.input.on('pointerdown', function(pointer){
      let touchX = pointer.worldX;
      scene.get("player").moveTo = touchX;
   });
  
  }



  update (scene, /*t, dt*/) {
    /** @type{Player} */
    const player = scene.get("player");

    if (this.input.left.isDown || this.WASD.left.isDown) {
      player.moveTo = null;
      player.walk("left");
    }
    else if (this.input.right.isDown || this.WASD.right.isDown) {
      player.moveTo = null;
      player.walk("right");
    }
    else {
      console.log("X", player.x, player.moveTo-10, player.moveTo && player.x < player.moveTo-10 )
      if(player.moveTo && player.x > player.moveTo+10)
        player.walk("left");
      else if(player.moveTo && player.x < player.moveTo-10)
        player.walk("right");
      else
        player.walk("stop");
    }  
    if ((this.input.space.isDown || this.input.up.isDown || this.WASD.up.isDown) && player.body.onFloor()) {
      player.jump(-500);
      /*
      player.state = 'jump';
      player.body.setVelocityY(-500); // jump up*/
    }
  }

};