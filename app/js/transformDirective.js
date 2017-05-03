(function() {
	'use strict'

	angular
	.module('app')
	.directive('transformDirective', transformDirective);

	function transformDirective($compile) {
		return {
			link: function(scope, element, attrs) {
				element.on('click', function() {
					if (element.hasClass('select')) {
						element.removeClass('select')
					} else {
						element.addClass('select');
					}


					if(document.querySelector('.delete')) {

						var compiled1 = $compile(document.querySelector('.option'));
						compiled1(scope);

					} else {

						var div = document.querySelector('.option');
						var button = document.createElement('button');
						button.append('Удалить');
						button.classList.add('delete')
						angular.element(button).attr('ng-click', 'delete()')
						div.appendChild(button);
						var compiled2 = $compile(div);
						compiled2(scope);
					}

				})
				scope.delete = function() {
					if (element.hasClass('select')) {
						element.remove();
					}
				}
			}
		}
	}

})();