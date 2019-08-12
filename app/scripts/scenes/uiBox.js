export default class UIBox extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene
   * @memberof UIBox
   */
  constructor(scene, ref, x, y, width, height, text = '') {
    super(scene, x, y);
    
    let rx = width/Math.sqrt(2) + width*0.4;
    let ry = height/Math.sqrt(2) + width*0.4;
    const cx = width/2;
    const cy = height/2;
    
    let scaleX;
    let scaleY;
    let invScaleX;
    let invScaleY;
    let grad;

    let texture = scene.textures.createCanvas(ref, width, height);

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
   scene.graphics.strokeRect(x-width/2, y-height/2, width, height);

   //texture.context.setTransform(1,0,0,1,0,0);

   //texture.context.fillStyle = grd;
   //texture.context.setTransform(1.5,0,0,1,0,0);
   //texture.context.fillRect(0, 0, width*1.5, height);

   //  Call this if running under WebGL, or you'll see nothing change
   texture.refresh();
   const image = scene.add.image(0, 0, ref);
   const textObj = scene.add.text(0, 0, text);
   textObj.setOrigin(0.5, 0.5);

   this.setText = textObj.setText.bind(textObj);
   this.add([image, textObj]);
  }

  toggle(){
    this.visible = !this.visible;
  }
}

