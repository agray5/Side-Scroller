import Person from "./prototype/person";

export default class NPC1 extends Person {
  constructor(scene, x, y){
    super(scene, 500, scene.groundLevel-30, "npc1");
    this.state = 'npc1-idle';
  }

  create(){
    super.create("npc1");

    this.setSize(this.width*2.5, this.height);
    this.scale = 0.25;
  }

}