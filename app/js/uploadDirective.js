(function() {

	'use strict'

	angular.module('app')
	.directive('uploadDirective', uploadDirective);

	function uploadDirective($compile, $http) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {

				scope.filename = 'Выберите файл';
				scope.many_files = false;
				scope.not_file = false;
				scope.wrong_file = false;

				var input = angular.element(element).find('input');
				var button = angular.element(element).find('button');
				var label = angular.element(element).find('label');

				var reader = new FileReader();

				angular.element(button).attr('disabled', true)

				input.bind('change', function(event) {

					var file = event.target.files;

					if (file.length != 1) {

						scope.many_files = true;
						scope.wrong_file = false;
						scope.parse_json = 'Выберите файл';
						scope.$digest();

					} else if(file[0].name.slice(-5) != '.json') {

						scope.not_file = true;
						scope.wrong_file = false;
						scope.filename = 'Выберите файл';
						scope.$digest();

					} else {

						angular.element(button).attr('class', 'btn')

						scope.many_files = false;
						scope.not_file = false;
						scope.wrong_file = false;
						scope.filename = file[0].name;
						scope.$digest();

						reader.readAsDataURL(event.target.files[0]);

						angular.element(button).attr('disabled', false)
					}

				});

				button.bind('click', function() {

					var container = document.getElementById('container');
					var str, num, json, p;
					var arr = [];

					str = reader.result;
					num = str.indexOf(',') + 1;
					json = atob(str.slice(num, str.length));
					try {
						scope.json = JSON.parse(json);
						container.innerHTML = '';
					} catch(e) {
						console.log(e);
						scope.wrong_file = true;
						scope.$digest();
					}
					var count = 0;
					function createTree(obj, parentElem) {

						if (typeof(obj) === 'object' && obj !==null && obj.constructor === Object) {

							if (angular.element(parentElem).hasClass('array') == true) {
								angular.element(parentElem).attr('class', 'objArr');
							}

							var ul = document.createElement('ul');

							if (count == 0) {
								angular.element(ul).attr('class', 'mainUl');
								count++;
							}

							for (var key in obj) {

								if (obj.hasOwnProperty(key)) {
									var li = document.createElement('li');
									ul.appendChild(li);

									if (typeof(obj[key]) !== 'object' || obj[key] === null) {

										var span = document.createElement('span');
										var text = document.createTextNode(key + ': ');

										angular.element(li).attr('class', 'string');
										span.appendChild(text);
										li.appendChild(span);

										var textValue = document.createTextNode(obj[key]);

										span.appendChild(textValue);
										li.appendChild(span); 

									} else {

										var span = document.createElement('span');
										var text = document.createTextNode(key);

										span.appendChild(text);
										li.appendChild(span);

										if (obj[key].constructor === Array) {
											angular.element(li).attr('class', 'array');
										} else {
											angular.element(li).attr('class', 'object');
										}

										createTree(obj[key], li);
									}
								}
							}
							parentElem.appendChild(ul);
						} else if (typeof(obj) === 'object' && obj !== null && obj.constructor === Array) {

							var ul = document.createElement('ul');

							if (count == 0) {
								angular.element(ul).attr('class', 'mainUl');
								count++;
							}

							for (var i = 0; i < obj.length; i++ ) {

								if(typeof(obj[i]) !== 'object' || obj[i] === null) {
									var li = document.createElement('li');
									ul.appendChild(li);

									var span = document.createElement('span');
									var text = document.createTextNode(obj[i]);
									span.appendChild(text);
									li.appendChild(span);

								} else {
									createTree(obj[i], parentElem);
								}

							}
							parentElem.appendChild(ul);
						}
					}

					createTree(scope.json, container);
					
					var drop = document.createElement('dragdrop-directive');
					var parse = document.createElement('parse-directive');

					parse.appendChild(drop);
					container.appendChild(parse);
					var compiled = $compile(container);
					compiled(scope);

					angular.element(button).attr('disabled', true);
					angular.element(button).attr('class', 'disabled');
					scope.filename = 'Выберите файл';
					scope.$digest();
				})
				
			}
		}
	}

})();