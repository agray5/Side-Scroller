//Sprite https://www.gameart2d.com/cute-girl-free-sprites.html
//https://opengameart.org/content/alchemy-tools-1
//<a href="https://pngtree.com/">Graphics from pngtree.com</a>
//Code Inferno Games (codeinferno.com)

//import Logo from '@/objects/logo';
import Map from '@/objects/map';
import Input from '@/objects/input';
import Player from '../objects/player';
import Score from '../objects/score';
import Animations from '../objects/animations';
import Cameras from '../objects/cameras';
import Gems from '../objects/gems';

let map;
let player;
let input;
let gems;
//var groundLayer, coinLayer;
let score;
//var text;
 

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    this.groundLevel = 450;
    
    map = new Map(this);
    player = new Player(this, map);
    input = new Input(this, player);
    score = new Score(this);
    gems = new Gems(this, map, player);
    Cameras(this, map, player);
    Animations(this);

    player.updateText('Hello');
  

    map.coinLayer.setTileIndexCallback(17, collectCoin, this); // the coin id is 17
    // when the player overlaps with a tile with index 17, collectCoin will be called    
    this.physics.add.overlap(player, map.coinLayer); 
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(t, dt) {
    input.update(t, dt);
    player.update(t, dt);
  }
}

function collectCoin(sprite, tile) {
  map.coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
  score.value ++; // increment the score
  return false;
}