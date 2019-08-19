/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default class Score extends Phaser.GameObjects.Text { 

  constructor (scene, value = 0) {
    super(scene, 20, 570, value.toString(), {
      fontSize: '20px',
      fill: '#ffffff'
    });
  }

  get value() {
    return this._value;
  }
  
  set value(val) {
    this._value = val;
    this.setText(val);
  }

  create(scene) {
    this.setScrollFactor(0);

  }
}