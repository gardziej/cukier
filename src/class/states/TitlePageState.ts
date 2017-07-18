import App from '../App';
import Vector2 from '../../system/Vector2';
import Drawer from '../Drawer';
import Sugar from '../Sugar';
import Faucet from '../Faucet';
import Gravity from '../../enums/Gravity';

export default class TitlePageState {
    app: App;

    constructor (parent) {
      this.app = parent;
    }

    initialize () {
    }

    handleInput (delta) {
    }

    update (delta) {
      this.app.drawer.update(delta);
      this.app.faucet.update(delta);
      this.app.sugar.update(delta);
    }

    draw () {
      this.app.drawer.draw();
      this.app.sugar.draw();
    }

    reset () {
      this.app.canvas.ctx.beginPath();
      this.app.canvas.ctx.arc(420, 350, 20, 0, 2 * Math.PI, false);
      this.app.canvas.ctx.fillStyle = 'green';
      this.app.canvas.ctx.fill();

      this.app.drawer = new Drawer(this.app);
      this.app.sugar = new Sugar(this.app, true, Gravity.DOWN);

      this.app.faucet = new Faucet(new Vector2(400, 10), this.app, 10 * 1000);
    }

}
