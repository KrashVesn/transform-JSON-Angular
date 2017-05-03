(function() {

	'use strict'

	angular.module('app')
	.directive('saveDirective', saveDirective);

	function saveDirective($compile) {
		return {
			restrict: 'AE',
			link: function(scope, element, attrs) {

				scope.no_file = false;

				scope.save_file = function() {

					if (scope.json != undefined) {

						saveFile(scope.ctrl.json, scope.save_filename);
						scope.save_filename = '';

					} else {
						scope.no_file = true;
						return;
					}

				}

				function saveFile(data, filename) {

					if(!data) {
						console.error('No data');
						return;
					}

					if(!filename) {
						filename = 'download.json';
					} else if(filename.slice(-5) != '.json') {
						filename += '.json';
					}

					if(typeof data === 'object') {
						data = JSON.stringify(data, undefined, 2);
					}

					var blob = new Blob([data], {type: 'text/json'});

			//for IE

			if (window.navigator && window.navigator.msSaveOrOpenBlob) {

				window.navigator.msSaveOrOpenBlob(blob, filename);

			} else {

				var e = document.createEvent('MouseEvents');
				var a = document.createElement('a');

				a.download = filename;
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/json', a.download, a.href].join('');
				e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(e);
			}
		}

	}
}
}

})();