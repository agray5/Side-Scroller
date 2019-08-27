import DataManager from '../../libs/dataManager'
import DialogManager from '../../libs/dialogManager'
import SpeechBubble from '../speech'


export default class Person extends Phaser.Physics.Arcade.Sprite {
  
  create(name){
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
 

    //this.state = 'idle';
    this.setCollideWorldBounds(true);

    if(name) {
      this.talking = false;
      this.DialogManager = new DialogManager(name);
      //Speech
      this.speech = new SpeechBubble(scene, this.x, this.y+100, "").create().hide();
      //Talk when player overlaps
      scene.physics.add.overlap(this, scene.get("player"), this.onOverlap, false, this);
    }
  }

  update (scene) {
    this.anims.play(this.state, true);
    if(this.speech){
      if(this.speech.isShowing)
        this.speech.update(this.x, this.y-this.height/3);
    }
  }  

  onOverlap() {
    this.facePlayer();
    this.talk();
  }

  facePlayer () {
    const player = this.scene.get("player");

    if(this.x < player.x) {
      this.flipX  = false;
    }
    else if(this.x > player.x) {
      this.flipX = true;
    }
  }
  
  talk() {
    if(!this.talking) {
      const text = this.DialogManager.getText();
      console.log("Text", text, !!text)
        if(text) {
          console.log("Show text")
          this.talking = true;
          this.speech.set(text).show();

          this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
              this.speech.hide();
              this.talking = false;
            },
            callbackScope: this.speech,
          });
        }
    }
  }
}