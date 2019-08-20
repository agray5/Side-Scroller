import Resources from "../libs/resources";

export default class Cauldron extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {Phaser.Tilemaps.Tilemap} map
   * @memberof UIBox
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'alchemy', 'cauldron');

    this.jobs = [
      {
        from: "ruby",
        to: "ingot",
        time: 0,
        running: false
      }
    ]
    this.info = {
      ruby: {
        ingot: {
          ratio: 2,
          time: 2,
          from_res: "cauldron_rubies",
          to_res: "ingots"
        }
      }
    }
  }

  /** @param {Phaser.Scene} scene */
  create(scene){
    //let cauldron = scene.physics.add.sprite(700, scene.groundLevel, 'alchemy', 'cauldron');
    scene.physics.add.collider(scene.get("map").map.groundLayer, this);
    scene.physics.world.enable(this);
    scene.add.existing(this);
  }

  toggle(){
    this.visible = !this.visible;
  }

  get(job) {
    return this.info[job.from][job.to];
  }

  getProgress(input, output){
    const found = this.jobs.find(job => {
      return job.from === input && job.to === output;
    });

    if(found && found.time && !found.time.paused){
      return found.time.getProgress();
    }
    else return 0;
  }

  start(job) {
    const time = this.get(job).time * 1000;
    job.running = true;
    job.time = this.scene.time.delayedCall(time, this.stop.bind(this, job), [], this);
  }

  canStart(job) {
    const info = this.get(job);
    return Resources.get(info.from_res) >= info.ratio;
  }

  stop(job) {
    job.running = false;
    job.time.paused = true;
    Resources.increment(this.get(job).to_res);
  }

  update(t, dt) {
    this.jobs.forEach(job => {
      const info = this.get(job);
      //Should job be started?
      if(!job.running && this.canStart(job)) {
        //Transfer resources and start job
        Resources.decrement(info.from_res, info.ratio);
        this.start(job);
      }
    })
  }
}

