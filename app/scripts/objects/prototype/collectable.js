import Resources from "../../libs/resources";

export default class Collectable extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, resourceName, texture, frame){
    super(scene, x, y, texture, frame);
    this.resource = resourceName;
  }

  create(config){
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    
    if(config.scaleX || config.scaleY){
      this.setSize(this.width*(this.scaleX || 1), this.height*(this.scaleY || 1));
    }

    Object.keys(config).forEach(key => {
      this[key] = config[key];
    })
  

    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    console.log("Map", this.scene.get("map").map.groundLayer)
    this.scene.physics.add.collider(this, this.scene.get("map").map.groundLayer);
    this.scene.physics.add.overlap(this, this.scene.get("player"), this.collect, false, this);
  }

  collect(){
    Resources.increment(this.resource);
    this.destroy();
  }
}