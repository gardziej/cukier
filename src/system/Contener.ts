export default class Contener {
  tiles = [];

  get length() {
    return this.tiles.length;
  }

  get count() {
    return this.tiles.length;
  }

  val(k) {
    return this.tiles[k];
  };

  add(i) {
    if (!this.exists(i)) {
       this.tiles.push(i);
    }
  }

  exists(i): boolean {
    if (this.tiles.indexOf(i) !== -1) {
      return true;
    }
    return false;
  }

  remove(i) {
    const index = this.tiles.indexOf(i);
    if (index > -1) {
      this.tiles.splice(index, 1);
    }
  }
}
