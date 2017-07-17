import Vector2 from './Vector2';

export default class Rectangle {

  public width: number;
  public height: number;

  constructor(public x: number, public y: number, public w: number, public h: number) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof y !== 'undefined' ? y : 0;
    this.width = typeof w !== 'undefined' ? w : 1;
    this.height = typeof h !== 'undefined' ? h : 1;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get center() {
    return this.position.addTo(this.size.divideBy(2));
  }

  get position() {
    return new Vector2(this.x, this.y);
  }

  get size() {
    return new Vector2(this.width, this.height);
  }

  contains(v): boolean {
    v = typeof v !== 'undefined' ? v : new Vector2();
    return (v.x >= this.left && v.x <= this.right &&
      v.y >= this.top && v.y <= this.bottom);
  };

  intersects(rect): boolean {
    return (this.left <= rect.right && this.right >= rect.left &&
      this.top <= rect.bottom && this.bottom >= rect.top);
  };

}
