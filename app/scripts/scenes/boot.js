export default class BootScene extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'boot' });
    }

    preload ()
    {
      console.log("BOOT")
        // load all files necessary for the loading screen
        this.load.image('splash-screen', 'splash-screen.png');
        this.load.image('progress-bar', 'progress-bar.png');

        
    }

    create ()
    {
      this.add.image(0, 0, "splash-screen").setOrigin(0, 0)
      //this.scene.start('preload');
    }
}