import App from './App';
import Vector2 from '../system/Vector2';

export default class Drawer {

	app: App;
	data: Uint8ClampedArray;
	last_mouse: Vector2;
	mouse: Vector2;
	gotNewData: boolean;

	constructor (parent) {
		this.app = parent;
		this.data = this.app.canvas.getImageData(0, 0, this.app.canvas.width, this.app.canvas.height).data;
		this.last_mouse = Vector2.zero;
		this.mouse = Vector2.zero;
		this.gotNewData = false;
		}

	update (delta) {
		if (this.app.mouse.button.left.down)
			{
				this.last_mouse.x = this.mouse.x;
				this.last_mouse.y = this.mouse.y;

				this.mouse.x = this.app.mouse.position.x;
				this.mouse.y = this.app.mouse.position.y;

				this.gotNewData = true;
			}
			else
			{
				this.last_mouse.x = this.mouse.x = this.app.mouse.position.x;
				this.last_mouse.y = this.mouse.y = this.app.mouse.position.y;
			}
	};

	draw () {
		if (!this.last_mouse.equals(this.mouse)) {
			this.app.canvas.ctx.lineWidth = 4;
			this.app.canvas.ctx.lineJoin = 'round';
			this.app.canvas.ctx.lineCap = 'round';
			this.app.canvas.ctx.strokeStyle = 'blue';
			this.app.canvas.ctx.beginPath();
			this.app.canvas.ctx.moveTo(this.last_mouse.x, this.last_mouse.y);
			this.app.canvas.ctx.lineTo(this.mouse.x, this.mouse.y);
			this.app.canvas.ctx.closePath();
			this.app.canvas.ctx.stroke();
			this.data = this.app.canvas.getImageData(0, 0, this.app.canvas.width, this.app.canvas.height).data;
			}
	};

};
