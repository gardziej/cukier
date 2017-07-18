import myHelper from '../system/myHelper';
import Contener from '../system/Contener';
import App from './App';
import Gravity from '../enums/Gravity';

export default class Sugar {
  app: App;
  gridSize: number;
  cols: number;
  rows: number;
  grid: number[];
  tiles: Contener;
  gridLength: number;
  count: number;
  open: boolean;
  drawerData: Uint8ClampedArray;
  imgData: any;
  gravity: Gravity;

  constructor(parent, open = true, gravity = Gravity.DOWN) {
    this.app = parent;
    this.gridSize = 2;
    this.gravity = gravity;
    this.cols = Math.ceil(this.app.canvas.width / this.gridSize);
    this.rows = Math.ceil(this.app.canvas.height / this.gridSize);
    this.grid = new Array(this.cols * this.rows);
    this.tiles = new Contener();
    this.gridLength = this.grid.length;
    this.count = 0;
    this.open = open;
    this.drawerData = this.app.drawer.data;
    this.imgData = null;
  }

  findPixels(ni: number) {
    const pix = [];
    const x = ni % this.cols;
    const y = Math.floor(ni / this.cols);
    const nx = x * this.gridSize;
    const ny = y * this.gridSize;
    const ncols = this.cols * this.gridSize;
    const nr = ny * ncols + nx;
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        pix.push((nr + i) + j * ncols);
      }
    }
    return pix;
  };

  setValue(i: number, val: number) {
    if (typeof val === 'undefined') {
      val = 1;
    }
    if (val === 0) {
      this.tiles.remove(i);
    }
    else { this.tiles.add(i);
    }
    this.grid[i] = val;
  };

  takeValue(i: number): number {
    return this.grid[i];
  };

  add(i: number) {
    this.setValue(i, 1);
    this.tiles.add(i);
    this.count++;
  };

  check(i: number): boolean {
    if (this.takeValue(i) > 0 || this.checkEnvironment(i)) {
      return true;
    }
    return false;
  };

  checkEnvironment(i: number): boolean {
    const pix = this.findPixels(i);
    for (let j = 0, len = pix.length; j < len; j++) {
      if (this.drawerData[pix[j] * 4 + 3] !== 0) {
        return true;
      }
    }
    return false;
  };

  move(i: number, x: number, y: number) {
    let newI;
    if (this.check(i)) {

      newI = i + y * this.cols + x;

      if (this.open && newI >= this.grid.length && this.gravity === Gravity.DOWN) {
        newI = i % this.cols;
      }

      if (this.open && newI <= 0 && this.gravity === Gravity.UP) {
        newI = i + this.cols * (this.rows - 1);
      }

      if (!this.check(newI)) {
        this.setValue(i, 0);
        this.setValue(newI, 2);
        if (y !== 0) {
          this.move(newI + 1, 2, 0);
          this.move(newI - 1, -2, 0);
        }
      }
    }
  };

  prepare() {
    this.imgData = this.app.sugar_canvas.ctx.createImageData(this.app.sugar_canvas.width, this.app.sugar_canvas.height);
    if (this.app.drawer.gotNewData) {
      this.drawerData = this.app.drawer.data;
      this.app.drawer.gotNewData = false;
    }
  };

  update(delta) {
    const direction = (this.gravity === Gravity.DOWN) ? 1 : -1;
    this.prepare();

    const p = 0;
    const q = 20;
    let randNumber;
    const randX = myHelper.getRandomInt(1, 2);
    const t = this.tiles;
    let index;
    for (let i = t.length; i >= 0; i--) {
      index = t.val(i);
      if (this.takeValue(index) === 2) {
        this.setValue(index, 1);
      }
      if (this.takeValue(index) === 1) {
        randNumber = myHelper.getRandomInt(p, q);
        if (randNumber === p) {
          this.move(index, -1 * randX, direction);
        }
        else if (randNumber === q) {
          this.move(index, randX, direction);
        }
        else {
          this.move(index, 0, direction);
        }
      }
    }
  };

  draw() {
    for (const i in this.grid) {
      if (this.takeValue(+i) > 0) {
        const pix = this.findPixels(+i);
        for (let j = 0, len = pix.length; j < len; j++) {
          this.imgData.data[pix[j] * 4 + 0] = 255;
          this.imgData.data[pix[j] * 4 + 1] = 255;
          this.imgData.data[pix[j] * 4 + 2] = 255;
          this.imgData.data[pix[j] * 4 + 3] = 255;
        }
      }
    }
    this.app.sugar_canvas.ctx.putImageData(this.imgData, 0, 0);
  };

};
