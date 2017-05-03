(function() {
	'use strict'

	angular
	.module('app')
	.directive('addDirective', addDirective)

	function addDirective($compile) {
		return {
			link: function(scope, element, attrs) {
				var tr,td,td2,td3,inp,inp2,inp3,btn;
				scope.add = function(event) {

					tr = document.createElement('tr');

					td = document.createElement('td');
					td2 = document.createElement('td');
					td3 = document.createElement('td');

					inp = document.createElement('input');
					inp2 = document.createElement('input');
					inp3 = document.createElement('input');

					btn = document.createElement('button');

					var tbody = event.target.parentNode.parentNode.parentNode;
					// var tbody = angular.element(document.querySelector('tbody'))

					inp.classList.add('inp')
					inp2.classList.add('inp')
					inp3.classList.add('inp')
					btn.append('Сохранить')

					tr.appendChild(td);
					td.appendChild(inp);

					tr.appendChild(td2);
					td2.appendChild(inp2);
					tr.appendChild(td3);
					td3.appendChild(inp3);
					td3.appendChild(btn);

					angular.element(inp).attr('ng-model', 'column1')
					angular.element(inp2).attr('ng-model', 'column2')
					angular.element(inp3).attr('ng-model', 'column3')
					angular.element(btn).attr('ng-click', 'saveTr()')
					angular.element(tbody).append(tr)

					var compiled = $compile(tr);
					compiled(scope);

					scope.ctrl.active = true;
				}

				scope.saveTr = function() {
					if (scope.column1.length > 0 || scope.column2.length > 0 || scope.column3.length > 0) {

						angular.element(inp).remove()
						angular.element(inp2).remove()
						angular.element(inp3).remove()
						angular.element(btn).remove()

						angular.element(td).append(scope.column1)
						angular.element(td2).append(scope.column2)
						angular.element(td3).append(scope.column3)

						// angular.element(td).attr('draggable', 'true')
						// angular.element(td2).attr('draggable', 'true')

						// td.classList.add('drag')
						// t2.classList.add('drag')

						angular.element(tr).attr('draggable', 'true');
						angular.element(tr).attr('drop-directive', '');

						var compiled = $compile(tr);
						compiled(scope);

						scope.column1 = '';
						scope.column2 = '';
						scope.column3 = '';
						scope.ctrl.active = false;
					}
				}

			}
		}
	}


}) ();