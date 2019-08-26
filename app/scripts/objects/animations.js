/**
 * 
 * @param {Phaser.Scene} scene 
 */
export default function Animations(scene) {
  scene.anims.create({
    key: 'cauldron',
    frames: [{key: 'alchemy', frame: 'cauldron'}],
  });


  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNames('player', { prefix: 'Walk', start: 1, end: 20 }),
    frameRate: 20,
    repeat: -1
  });

  // idle with only one frame, so repeat is not neaded
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNames('player-idle', { prefix: 'Idle', start: 1, end: 16 }),
    frameRate: 15,
    repeat: -1
  });

  scene.anims.create({
    key: 'npc1-idle',
    frames: scene.anims.generateFrameNames('npc1', { prefix: 'Idle__00', start: 0, end: 9 }),
    frameRate: 15,
    repeat: -1
  });

  scene.anims.create({
    key: 'jump',
    frames: scene.anims.generateFrameNames('player-jump', { prefix: 'Jump (', suffix: ')', start: 1, end: 30 }),
    frameRate: 20,
    repeat: -1
  });
}
