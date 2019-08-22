//import Logo from '@/objects/logo';
import { width as windowWidth, height as windowHeight } from '@/config'
import UIBox from '@/objects/uiBox';
import ProgressBar from '../objects/progressBar';
import Resources from '../libs/resources';
 

export default class UI extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'UI'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create( data ) {
    this.data = data;
    this.graphics = this.add.graphics();

    const rubies = new UIBox(this, 'rubyBar', windowWidth-100, 30, 200, 50, "Rubies:  0");
    this.add.existing(rubies);

    const potion_reds = new UIBox(this, 'potion_redBar', windowWidth-300, 30, 200, 50, "Potion:  0");
    this.add.existing(potion_reds);

    this.progressBar = new ProgressBar(this, windowWidth-400, 40);
    this.progressBar.value = 0;
    /*
    var timer = this.time.addEvent({
      delay: 100,                // ms
      callback: () => {this.progressBar.value= (this.progressBar.value+0.1)%1},
      //args: [],
      callbackScope: this,
      repeat: -1
  });*/

    Resources.on('set', (key) => {
      if(key === 'player_rubies')
        rubies.setText("Rubies: "+Resources.get('player_rubies'))
      else if(key === 'potion_reds')
        potion_reds.setText("Potion: "+Resources.get('potion_reds'))
    })
  }
/*
  box(ref, x, y, width, height, text = ''){
    let rx = width/Math.sqrt(2) + width*0.4;
    let ry = height/Math.sqrt(2) + width*0.4;
    const cx = width/2;
    const cy = height/2;
    
    let scaleX;
    let scaleY;
    let invScaleX;
    let invScaleY;
    let grad;

    let texture = this.textures.createCanvas(ref, width, height);

    rx = (rx == 0) ? 0.25 : rx;
    ry = (ry == 0) ? 0.25 : ry;
    
    if (rx >= ry) {
      scaleX = 1;
      invScaleX = 1;
      scaleY = ry/rx;
      invScaleY = rx/ry;
      grad = texture.context.createRadialGradient(cx, cy*invScaleY, rx/4, cx, cy*invScaleY, rx);
    }
    else {
      scaleY = 1;
      invScaleY = 1;
      scaleX = rx/ry;
      invScaleX = ry/rx;
      grad = texture.context.createRadialGradient(cx*invScaleX, cy, 0, cx*invScaleX, cy, ry);
    }


   //  We can access the underlying Canvas context like this:
   //const grd = texture.context.createRadialGradient(width/2, height/2, width/8, width/2, height/2, width-width*0.1) //createLinearGradient(0, 0, width, height);
   texture.context.fillStyle = grad;
   grad.addColorStop(0,"#AA6130");
   grad.addColorStop(1,"#100500");

   texture.context.setTransform(scaleX,0,0,scaleY,0,0);
   texture.context.fillRect(0,0,width*invScaleX,height*invScaleY);
   this.graphics.strokeRect(x-width/2, y-height/2, width, height);

   //texture.context.setTransform(1,0,0,1,0,0);

   //texture.context.fillStyle = grd;
   //texture.context.setTransform(1.5,0,0,1,0,0);
   //texture.context.fillRect(0, 0, width*1.5, height);

   //  Call this if running under WebGL, or you'll see nothing change
   texture.refresh();
   const image = this.add.image(0, 0, ref);
   const textObj = this.add.text(0, 0, text);
   textObj.setOrigin(0.5, 0.5);

   const container = this.add.container(x, y);
   container.setText = textObj.setText.bind(textObj);
   container.add([image, textObj]);

   return container
  }
*/
  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/*t, dt*/) {
    this.progressBar.set(this.data.cauldron.getProgress("ruby", "potion_red"))
    this.progressBar.update(this)
  }
}
