import Vector2 from './Vector2';

export default class Canvas {

	div: HTMLElement;
  canvasOffset: Vector2;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(private id:string, private divId: string) {
    this.id = id;
    this.div = document.getElementById(divId);
    this.resize();
  }

  get offset() {
    return this.canvasOffset;
  }

  get cursor() {
    return this.canvas.style.cursor;
  }

  setCursor(type) {
    if (this.canvas.style.cursor !== type) {
      this.canvas.style.cursor = type;
    }
  }

  resize() {
    this.canvasOffset = Vector2.zero;

    if (typeof this.canvas === "undefined") {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext("2d");
      this.canvas.setAttribute('id', this.id);
      this.div.appendChild(this.canvas);
    }

    this.canvas.width = +this.div.getAttribute('width');
    this.canvas.height = +this.div.getAttribute('height');

    this.canvasOffset.x = this.div.offsetLeft;
    this.canvasOffset.y = this.div.offsetTop;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.style.cursor = "default";
  };

  setSize(x, y) {
    this.width = this.canvas.width = x;
    this.height = this.canvas.height = y;
  };

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  getImageData(a, b, c, d) {
    return this.ctx.getImageData(a, b, c, d);
  };

}
