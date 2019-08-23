import DataManager from '../libs/dataManager'
import Resources from '../libs/resources';
import SpeechBubble from '../objects/speech'
/**
 * @param {Phaser.Scene} scene 
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "player");
    this.emitter;
    this.particles_rubies = this.scene.add.particles('ruby');
    this.particles_rubies.setDepth(-1);
  }

  create() {
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    //this.speech = new SpeechBubble(scene, this.x, this.y+100, "Hello I am player").create();

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
    this.setSize(this.width*0.3, this.height);
    this.scaleX = 0.3;
    this.scaleY = 0.3;
    this.setBounce(0.2); // our player will bounce from items
    this.state = 'idle';


    this.setCollideWorldBounds(true);

    // when the player overlaps with a tile with index 17, collectCoin will be called    
    scene.physics.add.overlap(this, scene.get("map").coinLayer); 
    scene.physics.add.overlap(this, scene.get("cauldron"), this.transferRubies.bind(this), false, scene);
  }

  transferRubies(from_, to){
    if(Resources.get('player_rubies')){
      const amount = Resources.transferAmt('player_rubies', 'cauldron_rubies');

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

  walk(velocity, flip) {
    this.body.setVelocityX(velocity); 

    if(velocity !== 0 && this.body.onFloor()) this.state = 'walk';
    else if(velocity === 0 && this.body.onFloor()) this.state = 'idle';

    if(flip !== undefined && flip !== null) this.flipX = flip;

    return this;
  }

  jump(velocity) {
    this.state = 'jump';
    this.body.setVelocityY(velocity);
  }

  update (scene) {
    this.anims.play(this.state, true);
    //this.speech.update(this.x, this.y-this.height/3);
  }

  collect(player, toCollect) {
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
