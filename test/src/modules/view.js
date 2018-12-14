class View {
	constructor() {}
	init() {
		$http({
			url: "src/templates/index.html",
			type: "get",
			dataType: "html",
			data: {}
		}).then(res => {
            document.getElementById('App').innerHTML = res.data;
        });
		console.log("我是view");
	}
}

export default new View();
