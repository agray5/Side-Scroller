import Button from './button'

export default class SpeechBubble extends Phaser.GameObjects.Graphics { 
  constructor (scene, x, y, quote, width = 150, height = 120) {
    super(scene, { x, y });
    this.isShowing = true;

    this.bubbleWidth = width;
    this.bubbleHeight = height;
    this.bubblePadding = 10;
    this.arrowHeight = this.bubbleHeight / 4;


    this.content = this.scene.add.text(0, 0, quote, { 
      fontFamily: 'Arial', 
      fontSize: 20, 
      color: '#000000', 
      align: 'center', 
      wordWrap: { width: this.bubbleWidth - (this.bubblePadding * 2) },  
      boundsAlignH: "center", // bounds center align horizontally
      boundsAlignV: "middle" });
    this.b = this.content.getBounds();
  }

  set(text) { 
    if(text.prompt) {
      this.button = new Button(this.scene, this.x+this.bubbleWidth/2, this.y-this.bubbleHeight)
      this.button.create("Hello", {
        onClickStart: function(p, g, e) {
          this.background.setTint(new Phaser.Display.Color().random(50).color);
        }
      });
    }
    const setText = text.text || text;
    this.content.setText(setText);
    this.b = this.content.getBounds();
    return this;
  }

  setGAlpha(amt) {
    this.setAlpha(amt);
    this.content.setAlpha(amt);
    if(this.button)this.button.setAlpha(amt)
  }

  hide() {
    this.setGAlpha(0);
    this.isShowing = false;
    return this;
  }

  show() {
    this.setGAlpha(1);
    this.isShowing = true;
    return this;
  }

  toggle() {
    const alpha = this.alpha;
    this.isShowing = alpha===1?0:1;
    this.setAlpha(alpha===1?0:1);
  }

  draw(x, y) {
    this.clear();

   //  Bubble shadow
   this.fillStyle(0x222222, 0.5);
   this.fillRoundedRect(0+6, -y+6/*-this.bubbleHeight*/, this.bubbleWidth, this.bubbleHeight, 16);

    //  Bubble color
    this.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.strokeRoundedRect(/*x, y-this.bubbleHeight*/0, -y, this.bubbleWidth, this.bubbleHeight, 16);
    this.fillRoundedRect(/*x*/0, -y/*-this.bubbleHeight*/, this.bubbleWidth, this.bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(/*x +*/ this.bubbleWidth / 7);
    var point1Y = -y + this.bubbleHeight /*-this.bubbleHeight*/;
    var point2X = Math.floor(/*x*/ + (this.bubbleWidth / 7) * 2);
    var point2Y = -y + this.bubbleHeight /*-this.bubbleHeight*/;
    var point3X = Math.floor(/*x*/ + this.bubbleWidth / 7);
    var point3Y = Math.floor(-y + this.bubbleHeight/*-this.bubbleHeight*/ + this.arrowHeight);

    //  Bubble arrow shadow
    this.lineStyle(4, 0x222222, 0.5);
    this.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.lineStyle(2, 0x565656, 1);
    this.lineBetween(point2X, point2Y, point3X, point3Y);
    this.lineBetween(point1X, point1Y, point3X, point3Y);

    this.content.setPosition(x + (this.bubbleWidth / 2) - (this.b.width / 2), y + (this.bubbleHeight / 2) - (this.b.height / 2));
    this.content.setDepth(2);
  }


  update(x, y){
    this.draw(x, y);
  }

  create(){
    this.scene.add.existing(this);
    return this
  }
}