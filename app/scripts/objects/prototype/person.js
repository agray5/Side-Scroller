import DataManager from '../../libs/dataManager'
import DialogManager from '../../libs/dialogManager'
import SpeechBubble from '../speech'
import { checkOverlap } from '../../utils/collision'


export default class Person extends Phaser.Physics.Arcade.Sprite {
  
  create(name){
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
 

    //this.state = 'idle';
    this.setCollideWorldBounds(true);

    this.flags = {};
    this.allowPlayText = true;

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
      const player = this.scene.get("player");
      if(this.speech.isShowing)
        this.speech.update(this.x, this.y-this.height/3);

        console.log("Overlapping", checkOverlap(this, player))
        if(this.flags.overlap === true && !checkOverlap(this, player)) {
          this.flags.overlap = false;
      }
    }
  }  

  onOverlap() {
    this.talk();
    this.facePlayer();

    if(!this.flags.overlap) this.flags.overlap = true;
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
    if(!this.talking && this.allowPlayText) {
      const text = this.DialogManager.getText();
        if(text) {
          this.talking = true;
          this.speech.set(text).show();

          //Extra pause when starting next text prompt state
          if(this.DialogManager.done){
            this.allowPlayText = false;
            this.scene.time.addEvent({
              delay: 5000,
              callback: () => {
                this.allowPlayText = true;
              },
              callbackScope: this.speech,
            });
          }

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