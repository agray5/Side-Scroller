import Person from "./prototype/person";

export default class NPC1 extends Person {
  constructor(scene, x, y){
    super(scene, 0, 0, "npc1");
    this.state = 'npc1-idle';
  }

  create(){
    super.create();

    this.setSize(this.width, this.height);
    this.scale = 0.25;
  }

}