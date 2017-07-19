import ButtonState from './ButtonState';

export default class Keyboard {
  private keyStates: ButtonState[] = [];

  constructor() {
    for (let i = 0; i < 256; ++i) {
      this.keyStates.push(new ButtonState());
    }
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  }

  handleKeyDown(evt) {
    const code = evt.keyCode;
    if (code < 100) {
      evt.preventDefault();
    }
    if (code < 0 || code > 255) {
      return;
    }
    if (!this.keyStates[code].down) {
      this.keyStates[code].pressed = true;
    }
    this.keyStates[code].down = true;
  }

  handleKeyUp(evt) {
    const code = evt.keyCode;
    if (code < 0 || code > 255) {
      return;
    }
    this.keyStates[code].down = false;
  }

  reset() {
    for (let i = 0; i < 256; ++i) {
      this.keyStates[i].pressed = false;
    }
  }

  getA() {
    for (let i = 0; i < 256; ++i) {
      if (this.keyStates[i].pressed && this.isAllowed(i)) {
        return i;
      }
    }
  }

  isAllowed(code): boolean {
    if ((code >= 37 && code <= 40) || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code === 32)) {
      return true;
    }
    return false;
  }

  pressed(key): boolean {
    return this.keyStates[key].pressed;
  }

  down(key): boolean {
    return this.keyStates[key].down;
  }

}
