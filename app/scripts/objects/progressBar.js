const width = 200;
const height = 20;
export default class ProgressBar extends Phaser.GameObjects.Graphics {
  /** @param {Phaser.Scene} scene */
  constructor(scene, x, y) {
    super(scene);
    this.x = x;
    this.y = y;
    this.progressBox = scene.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(x, y, width, height);
    this.value = 0;

    scene.add.existing(this);
  }

  set(val) {
    this.value = val;
  }

  update(scene, d, dt){
    console.log(this.value);
    this.clear();
    this.fillStyle(0xffffff, 1);
    this.fillRect(this.x+width*0.01, this.y+height*0.01, width*0.98 * this.value, height*0.9);
  }
}