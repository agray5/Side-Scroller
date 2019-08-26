import DataManager from '../../libs/dataManager'
import SpeechBubble from '../speech'

export default class Person extends Phaser.Physics.Arcade.Sprite {
  
  create(){
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);

    //this.state = 'idle';
    this.setCollideWorldBounds(true);


    //Speech
    this.speech = new SpeechBubble(scene, this.x, this.y+100, "").create().hide();
    
  }

  update (scene) {
    this.anims.play(this.state, true);
    if(this.speech.isShowing)
      this.speech.update(this.x, this.y-this.height/3);
  }
  
  say(text){
    this.speech.set(text).show();

    this.scene.time.addEvent({
      delay: 3000,
      callback: this.speech.hide,
      callbackScope: this.speech,
    });

  }
}