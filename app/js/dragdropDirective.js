(function() {

	'use strict'

	angular.module('app')
	.directive('dragdropDirective', dragdropDirective);

	function dragdropDirective($compile) {
		return {
			link: function(scope, element) {
				var span = document.querySelectorAll("#container span");

				angular.forEach(span, function(value) {

					angular.element(value).attr('draggable', 'true')

					value.addEventListener(
						'dragover',
						function(e) {
							e.dataTransfer.dropEffect = 'move';
							if(e.preventDefault) e.preventDefault();

							value.classList.add('over');

							return false;
						},
						false
						);

					// value.addEventListener(
					// 	'dragenter',
					// 	function(e) {
					// 		value.classList.add('over');
					// 		return false;
					// 	},
					// 	false
					// 	);

					value.addEventListener(
						'dragleave',
						function(e) {
							value.classList.remove('over')

							return false;
						},
						false
						);

					value.addEventListener(
						'dragstart',
						function(e) {
							e.dataTransfer.effectAllowed = 'move';
							e.dataTransfer.setData('Text', this);
							value.classList.add('drag');

							return false;
						},
						false
						);

					value.addEventListener(
						'dragend',
						function(e) {

							value.classList.remove('drag');
							return false;

						},
						false
						);

					value.addEventListener(
						'drop',
						function(e) {
							if(e.stopPropagation) e.stopPropagation();

							var drag = document.querySelector('.drag');
							var over = document.querySelector('.over');
							var dragInner = drag.innerHTML;
							drag.innerHTML = over.innerHTML;
							over.innerHTML = dragInner;
							value.classList.remove('over')

							return false;
						},
						false
						);
				})
			}
		}
	}

})();