'use strict';

$(document).ready(function () {
	$.get('/findsurvey', function (data) {
		console.log(data);
		var eventId = window.location.pathname.slice(8);
		var surveyHtml = ''
		for (var i = 0, j = data.length; i < j; i++) {
			if (data[i].eventId == eventId) {
				if (data[i].options == null) {

				surveyHtml += '<label for="answer">' + data[i].question + '</label><input id="answer" name="answer" type="text submit" /><input type="hidden" name="surveyQuestionId" value="' + data[i].id + '"><input type="hidden" name="question" value="' + data[i].question + '">';
				}
				if (data[i].options != null) {
				console.log(optionsArr)
				surveyHtml += '<fieldset><legend>' + data[i].question + '</legend>';
					var optionsArr = data[i].options.split(',');
					for (var i = 0, j = optionsArr.length; i < j; i++) {
						surveyHtml += '<input type="checkbox" id="answer" /> <label for="answer" class="inline">' +	optionsArr[i] + '</label><br />';
					}
					surveyHtml += '<input type="hidden" name="surveyQuestionId" value="' + data[i].id + '"><input type="hidden" name="question" value="' + data[i].question + '"></fieldset>'
				}
			}
		}
		$('#mainSurvey').append(surveyHtml);
	})
})


/*<fieldset>
	<legend>Checkboxes</legend>
	<input type="checkbox" id="check1" /> <label for="check1" class="inline">Checkbox Field</label><br />
	<input type="checkbox" id="check2" /> <label for="check2" class="inline">Checkbox Field</label><br />
	<input type="checkbox" id="check3" /> <label for="check3" class="inline">Checkbox Field</label>
	</fieldset>*/