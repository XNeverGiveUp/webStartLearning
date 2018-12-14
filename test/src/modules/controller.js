import view from "./view";
import model from "./model";
class Controller {
	constructor() {}
	init() {
		console.log("我是controller!");
		view.init();
		model.init();
	}
}

export default new Controller();
