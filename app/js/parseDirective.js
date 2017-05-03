(function() {

	'use strict'

	angular.module('app')
	.directive('parseDirective', parseDirective);

	function parseDirective() {
		return {
			link: function(scope, element, attrs) {
				// var container = document.getElementById("container");
				var li = document.querySelectorAll("ul.mainUl>li");
				var obj = {};
				for (var i = 0; i < li.length; i++) {
					createJSON(obj, li[i]);
					console.log(obj);
				}

				function createJSON(obj, parentElem) {


					for (var i = 0; i < parentElem.childNodes.length; i++) {

						if (angular.element(parentElem).hasClass('object') == true) {
							var span = parentElem.childNodes[0].childNodes;
							var key = span[0].textContent;

							obj[key] = {};

							for (var j = 1; j < parentElem.childNodes.length; j++) {
								createJSON(obj[key], parentElem.childNodes[j]);
							}


						} else if (angular.element(parentElem).hasClass('array') == true) {
							var span = parentElem.childNodes[0].childNodes;
							var key = span[0].textContent;

							obj[key] = [];

							for (var j = 1; j < parentElem.childNodes.length; j++) {
								createJSON(obj[key], parentElem.childNodes[j]);
							}

						} else if (angular.element(parentElem).hasClass('objArr') == true) {
							var span = parentElem.childNodes[0].childNodes;
							var key = span[0].textContent;

							obj[key] = [{}];

							for (var j = 1; j < parentElem.childNodes.length; j++) {

								createJSON(obj[key], parentElem.childNodes[j]);
							}

						} else {
							if (parentElem.tagName == 'UL') {
								for (var s = 0; s < parentElem.childNodes.length; s++) {
									createJSON(obj, parentElem.childNodes[s]);
									}
								} else if (parentElem.tagName == 'LI') {
									for (var s = 0; s < parentElem.childNodes.length; s++) {
										createJSON(obj, parentElem.childNodes[s]);
									}
								} else if (parentElem.tagName == 'SPAN') {
									if (parentElem.childNodes.length == 1) {
										var span = parentElem.textContent;
										console.log(span);
									}
								} else {

								}
							}



					}
							// if (parentElem.childNodes[i].tagName === 'SPAN') {
							// 	// console.log(parentElem);
							// 	var span = parentElem.childNodes[0].childNodes;
							// 	if (span.length == 2) {
							// 		var text1 = span[0].textContent;
							// 		var value = span[1].textContent;
							// 		var key = text1.slice(0, text1.length - 2);

							// 		obj[key] = value;
							// 		// console.log(obj);
							// 	} else {
							// 		var text1 = span[0].textContent;
							// 		var key = text1.slice(0, text1.length);
							// 		obj[key] = {};
							// 		// console.log(obj);
							// 	}
							// }


						}

				// var objMain = {};
				// var objMid = {};
				// var str = '{}';
				// var count = 0;
				// angular.forEach(li, function(value) {
					
				// 	var span = angular.element(value).find('span');

				// 	for (var i = 0; i < span.length; i++) {


				// 		if (span[i].className === 'string') {

				// 			var key = span[i].innerText;
				// 			var keyNum = key.indexOf(':');
				// 			var key2 = key.slice(0, keyNum);

				// 			var znNum = key.indexOf(' ') + 1;
				// 			var zn = key.slice(znNum, key.length);

				// 			var num = str.lastIndexOf('}') ;


				// 			// str = str.slice(0, num) + '"' + key2 + '"' + ':'+ '"' + zn + '"' + str.slice(num, str.length);
				// 			str = str.slice(0, num) + '"' + key2 + '"' + ':'+ '"' + zn + '"' + ',' + str.slice(num, str.length);
				// 			var s = '{"text":"spain","spa":"fasd","fasd":"fasd",}';
				// 			var d = JSON.parse(s);
				// 			console.log(d);
				// 		}

				// 		if (span[i].className === 'objArr') {

				// 		}

				// 		if (span[i].className === 'object') {

				// 		}
				// 		console.log(span[i]);
				// 	}

				// })
				

				// for (var i = 0; i < li.length; i++) {

				// 	createJSON(objMain, objMid, li[i]);

				// }

				// function createJSON(obj1, obj2, li) {

				// }

				// function createJSON(obj1, obj2, li) {
				// 	var child = li.childNodes;

				// 	for (var i = 0; i < child.length; i++) {

				// 		if (child[i].tagName === 'SPAN' && child[i].className === 'string') {

				// 			var key = child[i].innerText;
				// 			var keyNum = key.indexOf(':');
				// 			var key2 = key.slice(0, keyNum);

				// 			var znNum = key.indexOf(' ');
				// 			var zn = key.slice(znNum, key.length);

				// 			objMid[key2] = zn;
				// 			objUnion(objMain, objMid)
				// 			console.log(objMain);
				// 		}

				// 		if (child[i].tagName === 'SPAN' && child[i].className === 'object') {

				// 		}

				// 		if (child[i].tagName === 'SPAN' && child[i].className === 'objArr') {

				// 		}

				// 		if (child[i].tagName === 'UL') {

				// 		}

				// 		objUnion(objMain, objMid);

				// 	}
				// }


				function objUnion(obj1, obj2) {
					for (var key in obj2) {
						objMain[key] = obj2[key];
					}
				}



			}
		}
	}
})();