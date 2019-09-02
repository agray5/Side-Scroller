export default class Button extends Phaser.GameObjects.Container{

  /** @param {object} config
   * @param {(pointer:Phaser.Input.Pointer) => void} config.onHover
   * @param {(pointer:Phaser.Input.Pointer) => void} config.onClickStart
   * @param {(pointer:Phaser.Input.Pointer) => void} config.onClickEnd */
  create(text, config = {}, background = "button") {
    let p = this.scene.input.activePointer
    this.background = this.scene.add.image(0, 0, background)
    this.text = this.scene.add.text(0, 0, text)

    this.text.setOrigin(0.5, 0.5);
    this.add([this.background, this.text])
        .setSize(this.background.width, this.background.height)
        .setInteractive({ useHandCursor: true }/*new Phaser.Geom.Rectangle(0, 0, this.background.width, this.background.height), Phaser.Geom.Rectangle.Overlaps*/);
  
    console.log("BUTTON", config)
    if(config.onHover) this.on("pointerover", config.onHover.bind(this));
    if(config.onClickStart) this.on("pointerdown", config.onClickStart.bind(this));
    if(config.onClickEnd) this.on("pointerup", config.onClickEnd.bind(this))
    if(config.callback) this.on("pointerdown", config.callback)

    this.scene.add.existing(this);

    return this;
  }
}

