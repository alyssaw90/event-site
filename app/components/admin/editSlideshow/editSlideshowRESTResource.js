'use strict';

import * as customFunctions from '../../shared/methods/common-functions.js';

const editSlideshowRESTResource = (app) => {

	app.factory('editSlideshowRESTResource', ['$http', ($http) => {

		return (callback) => {
			return {
				getAllSlideshows: (slideshowName, callback) => {
					$http.get('/api/slideshow/' + slideshowName)
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},

				getAllSlides: (callback) => {
					$http.get('/api/allslides')
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},

				setNewSlideshowOrder: (slideData, callback) => {
					$http.post('/api/sethomepageslides', slideData)
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},

				addSlide: (newSlideData, callback) => {
					$http.post('/api/addslide', newSlideData)
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				},

				deleteSlide: (slideId, callback) => {
					$http.post('/api/deleteslide', slideId)
					.then(function successCallback(data){
						callback(null, data)
					}, function errorCallback(data){
						callback(data)
					})
				}

			}
				
		}

	}])
};

module.exports = editSlideshowRESTResource;