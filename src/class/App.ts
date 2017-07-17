import Canvas from '../system/Canvas';
import Mouse from '../system/Mouse';
import Keyboard from '../system/Keyboard';
import Vector2 from '../system/Vector2';

import TitlePageState from './states/TitlePageState';
import Drawer from './Drawer';
import AppStateManager from '../system/AppStateManager';
import Sugar from './Sugar';
import Faucet from './Faucet';

export default class App {
  spritesStillLoading = 0;
  totalSprites = 0;
  canvas: Canvas;
  sugar_canvas: Canvas;
  mouse: Mouse;
  keyboard: Keyboard;
  drawer: Drawer;
  sugar: Sugar;
  faucet: Faucet;
  appStateManager: AppStateManager;

  constructor() {
    this.canvas = new Canvas('canvas', 'gameArea');
    this.sugar_canvas = new Canvas('sugar_canvas', 'gameArea');
    this.mouse = new Mouse(this.canvas);
    this.keyboard = new Keyboard();
    this.initialize();
  }

  initialize() {
    this.appStateManager = new AppStateManager();
    this.appStateManager.add('game_title_page', new TitlePageState(this), true);
    this.appStateManager.switchTo('game_title_page').reset();
    this.mainLoop();
  };

  reset() {
    this.appStateManager.reset();
  };

  handleInput() {

  };

  mainLoop() {
    const delta = 1 / 60;
    this.appStateManager.handleInput(delta);
    this.appStateManager.update(delta);
    this.appStateManager.draw();
    this.keyboard.reset();
    requestAnimationFrame(() => this.mainLoop());
  };


}
