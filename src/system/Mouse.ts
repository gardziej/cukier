import ButtonState from './ButtonState';
import Vector2 from './Vector2';
import Canvas from './Canvas';

export default class Mouse {
  position: Vector2;
  wheel: number;
  left: ButtonState;
  middle: ButtonState;
  right: ButtonState;
  move: boolean;
  button = {
    left: {
      down: false,
      pressed: false
    },
    right: {
      down: false,
      pressed: false
    },
    middle: {
      down: false,
      pressed: false
    },
  };

  constructor(public canvas: Canvas) {
    this.canvas = canvas;
    this.position = Vector2.zero;
    this.wheel = 100;
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();
    document.onmousemove = this.handleMouseMove.bind(this);
    document.onmousedown = this.handleMouseDown.bind(this);
    document.onmouseup = this.handleMouseUp.bind(this);
    document.onwheel = this.handleMouseWheel.bind(this);
  }

  handleMouseMove(evt) {
    if (typeof this.canvas === 'undefined' || typeof this.canvas.offset === 'undefined') {
      return;
    }
    const canvasOffset = this.canvas.offset;
    const mx = (evt.pageX - canvasOffset.x);
    const my = (evt.pageY - canvasOffset.y);
    this.position = new Vector2(mx, my);
    if (this.button.left.down) {
      this.move = true;
    }
  }

  handleMouseWheel(evt): boolean {
    this.wheel += evt.deltaY;
    evt.preventDefault();
    return false;
  }

  handleMouseDown(evt) {
    this.handleMouseMove(evt);
    if (evt.which === 1) {
      if (!this.button.left.down) {
        this.button.left.pressed = true;
      }
      this.button.left.down = true;
    } else if (evt.which === 2) {
      if (!this.button.middle.down) {
        this.button.middle.pressed = true;
      }
      this.button.middle.down = true;
    } else if (evt.which === 3) {
      if (!this.button.right.down) {
        this.button.right.pressed = true;
      }
      this.button.right.down = true;
    }
  }

  handleMouseUp(evt) {
    this.handleMouseMove(evt);
    if (evt.which === 1) {
      this.button.left.down = false;
    }
    else if (evt.which === 2) {
      this.button.middle.down = false;
    }
    else if (evt.which === 3) {
      this.button.right.down = false;
    }
    this.move = false;
  }

  reset() {
    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
  }

  containsMouseDown(rect): boolean {
    return this.left.down && rect.contains(this.position);
  }

  containsMousePress(rect): boolean {
    return this.left.pressed && rect.contains(this.position);
  }

}
