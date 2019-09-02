import Button from './button'

const TextPositions = {
  "Top": "top",
  "Center": "center"
}

export default class SpeechBubble extends Phaser.GameObjects.Graphics { 
  constructor (scene, x, y, quote, width = 150, height = 120) {
    super(scene, { x, y });
    this.isShowing = true;

    this.bubbleWidth = width;
    this.bubbleHeight = height;
    this.bubblePadding =  0;
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
    this.textPosition = TextPositions.Center;
  }

  set(text) { 
    if(text.prompt) {
      this.button = new Button(this.scene, this.x+this.bubbleWidth/2, this.y-this.bubbleHeight*1.5)
      this.button.create(text.prompt, text.config);
      this.textPosition = TextPositions.Top;
    }
    else this.textPosition = TextPositions.Center;

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

    const textX = x + (this.bubbleWidth / 2) - (this.b.width / 2);
    let textY = y;
    if(this.textPosition === TextPositions.Center) 
      textY += (this.bubbleHeight / 2) - (this.b.height / 2)
    
    this.content.setPosition(textX, textY);
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