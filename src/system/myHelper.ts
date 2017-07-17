let myHelper = {

  getRandomBin(): number {
    if (Math.random() > .5) return 1;
    return -1;
  },

  getRandomInt(min, max): number {
    if (typeof min === 'undefined') min = 0;
    if (typeof max === 'undefined') max = 100;
    let wynik = Math.floor(Math.random() * (max - min + 1)) + min;
    return wynik;
  },

  shuffleArray(o): number {
    for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },

  pickRandomProperty(obj): number {
    let result;
    let count = 0;
    for (let prop in obj)
      if (Math.random() < 1 / ++count)
        result = prop;
    return result;
  },

  distanceBetweenPoints(p1, p2): number {
    let dist, dx, dy;
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
    dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  },

  deg2rad(degrees): number {
    return degrees * Math.PI / 180;
  },

  rad2deg(radians): number {
    return radians * 180 / Math.PI;
  }

}

export default myHelper;
