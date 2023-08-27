/*check browser- support webp or not*/

export function isWebp() {
	//check support
	function testWebp(callback) {
		let webp = new Image();
		webp.onload = webp.onerror = function () {
			callback(webp.height == 2);
		};
		webp.src =
			"data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	//add class _webp or _no-webp in HTML
	testWebp(function (support) {
		let classname = support === true ? "webp" : "no-webp";
		document.documentElement.classList.add(classname);
	});
}
