/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Score(scene, value = 0) {
  let text = scene.add.text(20, 570, '0', {
    fontSize: '20px',
    fill: '#ffffff'
  });
  text.setScrollFactor(0);

  text._value = value;

  Object.defineProperty(text, 'value', {
    get: function() { return this._value; },
    set: function(setter) {
      this._value = setter;
      this.setText(setter); // set the text to show the current score
    }
  });
  return text;
}