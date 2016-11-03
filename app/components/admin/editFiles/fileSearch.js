'use strict';

const fileSearch = (app) => {
	app.filter('fileSearch', () => {
		return (files, search) => {
			const filtered = [];
			if (!search) {
				return files;
			}
			angular.forEach(files, (file) => {
				let fileName = file.fileName.toLowerCase();
				let query = search.toLowerCase();
				if (fileName.indexOf(query) > -1) {
					filtered.push(file);
				}
			});
			return filtered;
		}
	});
}

module.exports = fileSearch;