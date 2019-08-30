import Resources from '../libs/resources';
import SpeechBubble from '../objects/speech'
import Person from './prototype/person';
/**
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export default class Player extends Person {
  constructor (scene) {
    super(scene, 0, 0, "player");
    this.emitter;
    this.particles_rubies = this.scene.add.particles('ruby');
    this.particles_rubies.setDepth(1);

    this.speed = 200;
    this.moveTo = null;
    this.state = 'idle';
    this.setDepth(3);
  }

  create() {
    super.create();

    const scene = this.scene;

    this.sound_footsteps = scene.sound.add("footsteps", {volume: 0.6});
    this.sound_splash = scene.sound.add("splash");

    this.setSize(this.width*0.3, this.height);
    this.scaleX = 0.3;
    this.scaleY = 0.3;
    this.setBounce(0.2); // our player will bounce from items

    // when the player overlaps with a tile with index 17, collectCoin will be called    
    scene.physics.add.overlap(this, scene.get("map").coinLayer); 
    scene.physics.add.overlap(this, scene.get("cauldron"), this.transferRubies.bind(this), false, scene);
  }

  transferRubies(from_, to){
    if(Resources.get('player_rubies')){
      const amount = Resources.transferAmt('player_rubies', 'cauldron_rubies');

      this.sound_splash.play();
      setTimeout(() => this.scene.sound.play("bubble"), this.sound_splash.duration + 500);

      if(this.emitter) this.emitter.stop();      
      if(!this.emitter) this.emitter = this.particles_rubies.createEmitter(
        {
          x: to.x,
          y: to.y-to.height,
          speed: 20,
          alpha: { start: 1, end: 0 },
          scale: { start: 0.2, end: 0.5 },
          accelerationY: 100,
          angle: { min: -85, max: -95 },
          rotate: { min: -180, max: 180 },
          lifespan: { min: 1000, max: 1100 },
          //tint: 0x990000,
          frequency: 110,
          quantity:1,
          maxParticles: amount
      });
      else {
        this.emitter.maxParticles = amount;
        this.emitter.start();
      }
      setTimeout(() => this.emitter.stop(), 1000);
    }

    /*const take_rubies = from_.getData('rubies');
    from_.setData('rubies', 0);

    const has_rubies = to.getData('rubies');
    const give_rubies = (has_rubies?has_rubies:0) + (take_rubies?take_rubies:0);
    to.setData('rubies', give_rubies);*/
  }

  /** @param {"left"|"right"|"stop"} dir */
  walk(dir) {
    let velocity = 0;
    let flip;

    if(!this.sound_footsteps.isPlaying && dir !== "stop" && this.body.onFloor()) 
      this.sound_footsteps.play();
    else if(dir === "stop")
      this.sound_footsteps.stop();

    switch(dir){
      case "right": 
        velocity = this.speed;
        flip = false;
        
        break;
      case "left":
        velocity = -1*this.speed;
        flip = true;
        break;
    }

    //console.log("Dir", dir)

    this.body.setVelocityX(velocity); 

    if(velocity !== 0 && this.body.onFloor()) this.state = 'walk';
    else if(velocity === 0 && this.body.onFloor()) this.state = 'idle';

    if(flip !== undefined && flip !== null) this.flipX = flip;

    return this;
  }

  jump(velocity = -500) {
    if(this.body.onFloor()){
      this.state = 'jump';
      this.body.setVelocityY(velocity);

      //sound
      this.scene.sound.play('jump'+Phaser.Math.Between(1, 4), {volume: 0.6})
    }
  }

  collect(player, toCollect) {
    player.scene.sound.play("collect")
    Resources.increment('player_rubies');
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
