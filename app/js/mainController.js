(function() {
	'use strict'

	angular
	.module('app')
	.controller('mainCtrl', mainController);

	function mainController($scope, $http, $compile) {

		var vm = this;

		$http.get('/js/subscribe.json').then(successCallback, errorCallback);

		function successCallback(data) {
			vm.json = data.data;
		}

		function errorCallback(data, status) {
			vm.error = data;
		}

		var arr = [];
		var p;

		$scope.get = function() {

			function createTree(container, obj) {
				for (var key in obj) {

					var li = createLi();
					var ul = createUl();
					angular.element(ul).attr('class', 'data1')
					li.innerHTML = key;
					ul.appendChild(li);
					p = ul;
					createTreeDom(obj[key]);
					container.appendChild(p);
					p = '';
					arr.length = 0;

				}

				var drop = document.createElement('dragdrop-directive');

				drop.appendChild(container);
				document.body.appendChild(drop);
				var compiled = $compile(drop);
				compiled($scope);
			}

			function createTreeDom(obj) {

				if (isObjectOrArray(obj) === 'string') {

					var ul = createUl();
					var li = createLi();
					li.innerHTML = obj;
					ul.appendChild(li);
					arr.push(ul);
					for (var i = arr.length -1; i > 0; i--) {
						arr[i-1].appendChild(arr[i]);
					}
					p.appendChild(arr[0]);
					arr.length = 0;
				};

				if (isObjectOrArray(obj) === 'object') {
					for (var key in obj) {

						if (arr.length == 1) {
							var ul = createUl();
							var li = createLi();
							li.innerHTML = key;
							ul.appendChild(li);
							arr.push(ul);

						} else if (arr.length == 0) {
							var ul = createUl();
							var li = createLi();
							li.innerHTML = key;
							ul.appendChild(li);
							arr.push(ul);
						}

						createTreeDom(obj[key]);
					}
				}
				if (isObjectOrArray(obj) === 'array') {
					for (var key in obj) {
						if (isNaN(key)) {

							if (arr.length == 1) {
								var ul = createUl();
								var li = createLi();
								li.innerHTML = key;
								ul.appendChild(li);
								arr.push(ul);

							} else if (arr.length == 0) {
								var ul = createUl();
								var li = createLi();
								li.innerHTML = key;
								ul.appendChild(li);
								arr.push(ul);
							}

						}
						createTreeDom(obj[key]);
					}
				}
			}

			function isObjectOrArray(obj) {
				if (obj.constructor === Object) {
					return 'object';
				}
				if (obj.constructor === Array) {
					return 'array';
				}
				if (obj.constructor === String) {
					return 'string';
				}
			}


			function createLi() {
				var li = document.createElement('li');
				return li;
			}

			function createUl() {
				var ul = document.createElement('ul');
				return ul;
			}

			var container = document.getElementById('container');
			createTree(container, vm.json);

		}

	};

})();