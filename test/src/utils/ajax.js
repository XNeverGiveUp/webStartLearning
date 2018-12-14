
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	options.async = options.async || true;

	let params = getParams(options.data);
	let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if (options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, options.async);
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, options.async);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}
	return new Promise((resolve, reject) => {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				let status = xhr.status;
				if (status >= 200 && status < 300) {
					resolve({
						data: xhr.responseText,
						code: status
					});
				} else {
					reject({
						data: "请求出错",
						code: status
					});
				}
			}
		};
	});
}

function getParams(data) {
	let arr = [];
	for (let param in data) {
		arr.push(encodeURIComponent(param) + "=" + encodeURIComponent(data[param]));
	}
	arr.push(("randomNumber=" + Math.random()).replace("."));
	return arr.join("&");
}

export default ajax
