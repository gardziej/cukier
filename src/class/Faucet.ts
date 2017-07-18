import Vector2 from '../system/Vector2';
import myHelper from '../system/myHelper';
import App from './App';

export default class Faucet {
  app: App;
  position: Vector2;
  vol: number;
  frequency: number;
  frequencyCounter: number;
  width: number;

  constructor(position, parent, vol = 5000) {
    this.app = parent;
    this.position = new Vector2(Math.ceil(position.x / this.app.sugar.gridSize), Math.ceil(position.y / this.app.sugar.gridSize));
    this.vol = vol;
    this.frequency = 0.01;
    this.frequencyCounter = 0;
    this.width = 1;
  }

  positionToPoint(position): number {
    return position.y * this.app.sugar.cols + position.x;
  };

  update(delta) {
    const halfWidth = Math.ceil(this.width / 2);
    if (this.vol > 0) {
      this.frequencyCounter += delta;
    }
    if (this.vol > 0 && this.frequencyCounter > this.frequency) {
      const newPos = {
        x: this.position.x + myHelper.getRandomInt(-1 * halfWidth, halfWidth),
        y: this.position.y
      };
      this.app.sugar.add(this.positionToPoint(newPos));
      this.frequencyCounter = 0;
      this.vol--;
    }
  };

};
