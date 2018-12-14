class Bus {
	constructor() {
		this.clientList = {};
	}
	$on(key, fn) {
		if (!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	}
	$emit() {
		let key = [].shift.call(arguments),
			fns = this.clientList[key];
		if (!fns || fns.length === 0) {
			console.log(`${key}消息，无订阅!`);
			return false;
		}
		for (let i = 0, fn; (fn = fns[i++]); ) {
			setTimeout(() => {
				fn.apply(this, arguments);
			});
		}
	}
	$off(key, fn) {
		let fns = this.clientList[key];
		if (!fns) {
			return false;
		}
		if (!fn) {
			fns && (fns.length = 0);
		} else {
			for (let l = fns.length - 1; l >= 0; l--) {
				fn === fns[l] && fns.splice(l, 1);
			}
		}
	}
}

export default new Bus();
