export default class ProgressBar extends Phaser.GameObjects.Graphics {
  /** @param {Phaser.Scene} scene */
  constructor(scene, x, y, width = 200, height = 10) {
    super(scene);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
    const height = this.height;
    const width = this.width;
    
    this.clear();
    this.fillStyle(0xffffff, 1);
    this.fillRect(width*0.01, height*0.1, width*0.98 * this.value, height*0.8);
  }
}