import DataManager from '../../libs/dataManager'
import DialogManager from '../../libs/dialogManager'
import SpeechBubble from '../speech'
import { checkOverlap } from '../../utils/collision'
import {dialogSpeed} from '../../config'


export default class Person extends Phaser.Physics.Arcade.Sprite {
  
  create(config = {}, isPlayer = false){
    const scene = this.scene 
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.DataManager = new DataManager(this);
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
 

    //this.state = 'idle';
    this.setCollideWorldBounds(true);

    this.flags = {};
    this.config = config;
    this.allowPlayText = true;

    if(!isPlayer) {
      this.talking = false;
      this.DialogManager = new DialogManager(config.namespace);
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
      const text = this.DialogManager.getText(this);
        if(text) {
          this.talking = true;
          this.speech.set(text).show();

          //Extra pause when starting next text prompt state
          if(this.DialogManager.done){
            this.allowPlayText = false;
            this.scene.time.addEvent({
              delay: dialogSpeed + 2000,
              callback: () => {
                this.allowPlayText = true;
              },
              callbackScope: this.speech,
            });
          }

          this.scene.time.addEvent({
            delay: dialogSpeed,
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