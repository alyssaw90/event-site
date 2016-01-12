'use strict';
/*global $ */
/*global document */
/*global window */
/*jshint multistr: true */ 

$(document).ready(function () {

	var $footer = $('footer');
	var footerMenuHTML = '<div class="newsletterSubscSection col_12">\
				<p>Learn, Share, Build</p>\
			</div>\
			<nav class="siteFooter">\
				<p><img class="ms-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAVCAYAAACwnEswAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzUwNDAyMkVCNjNGMTFFNUIyODA5OEJGNTg3QzhFQjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzUwNDAyMkZCNjNGMTFFNUIyODA5OEJGNTg3QzhFQjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTA0MDIyQ0I2M0YxMUU1QjI4MDk4QkY1ODdDOEVCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTA0MDIyREI2M0YxMUU1QjI4MDk4QkY1ODdDOEVCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk/GmnkAAAZXSURBVHja7Fl7UFRV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" /></p>\
				<p><a href="/about">About Us</a> | <a href="/contactus">Contact Us</a> | <a href="/faq">FAQ</a> | <a href="http://www.microsoft.com/en-us/privacystatement/default.aspx">Privacy Statement</a> | <a href="https://msdn.microsoft.com/en-us/cc300389.aspx">Terms of Service</a></p>\
				<p>\
					<a href="http://www.meetup.com/Shanghai-Interop-Dev-Days-2015/"><img class="socialIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAMAAACVZWnNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0VGNkVFMTU2NjE1MTFFNTlDMUY5QjU0QjhDMzRGMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0VGNkVFMTY2NjE1MTFFNTlDMUY5QjU0QjhDMzRGMjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDRUY2RUUxMzY2MTUxMUU1OUMxRjlCNTRCOEMzNEYyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRUY2RUUxNDY2MTUxMUU1OUMxRjlCNTRCOEMzNEYyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqEHWt4AAAKdUExURUNDQ/v7+/z8/AICAvr6+gQEBPn5+cPDwwMDAwUFBV9fXwEAAPj4+AYGBsDAwAcHB/f39/b29gkJCQgICEVFRUFBQfX19UJCQtjY2OPj4+Xl5WpqakBAQERERNPT00ZGRl1dXT8/P/T09Dw8PNfX1xoaGv/+/15eXktLS8bGxuDg4Kenp4SEhHNzc5mZmXBwcOrq6hMTE4GBgc3NzfPz8+3t7VJSUikpKSYmJhsbGywsLBYWFhISEvLy8g4ODgwMDAoKCgMAAMHBwfHx8cjIyL6+vi4uLjs7O9TU1MfHxwgEBY+Pj8XFxcrKyujo6MvLy4WFhRcXF2tra8TCw4KCgq+vr6Ojo6GhoZycnB8fH4ODg0dHR35+fj4+PicnJwYEBcnJyW5ubmhoaAsLCw0NDVBQUAUDBE5OTtbW1tXV1XJycnFxcUpKSsTExLGxsRwcHDk5OSgoKEhISOzs7L+/vxQUFJ+fnyMjI7Ozs+bm5gMBAqmpqZOTk/78/a2trdHR0X9/f7i4uCEhISoqKuTk5AQAAVRUVHl5eS0tLYmJiVtbW+Hh4Tg4OFFRUefn59ra2r29vVhYWG9vbxEREc/Pz2lpaVpaWnR0dJiYmKqqqmxsbK6urrq4uWBgYBAQENnZ2SAgIGxqaxkZGXV1daCgoOnp6e7u7lNTUzQ0NJaWliUlJX19fU1NTWVlZQIAAT09PR0dHaSkpDIyMo2NjWdnZ8zMzOvr6xIOD2JiYjc3N/Dw8ElJSW1tbaKiory8vJ2dndzc3IqKipWVlTAwMJqamuLi4v/9/mZmZre3twwKCy8vLyQkJN/f3xgYGGBeX1xcXHh4eIiIiHx8fEhGR7u7uw8PD6WlpdDQ0DMzM/39/f7+/gEBAf///wAAAP///5DVZZcAAADfdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wA8JjrVAAAEeUlEQVR42pRWhZLjSAztNo29jpNJhpmZmXd4mZmZmXcP95iZmZmZmZnJtpRvObWdubqaTOYuqkrF1epnPan1WmbRaHSmq6KLSdo8ArLoNxiiZz1Z8OXDbxIY0SB40pGH5w1HGcqIsp48eJdpmky20EjD5M00d5kMRWjvl5zJlC2TibFq0FOyloYu8+ucdMoegvn/6rQhQlO9XUWVGRHiL1OXxAyn2uXGF0UsMOO5gqyifJbBEtj6Y/lZJelFcf5jRdV9rHMAJJ4KCc0BBcB2eLwnvI/lx/ZM2BRwBaT4VQ1gBstwNAmms6bubWAr8eu2XcWywAbhtBOYdgWGah0ITF6nmG+xjZQVny7yTqyAqZIBuIZlgCR5aCIvrfj4RokK5CVJ3vJziFWV+5ICmhdBEYs2rXHHdkTOBeJZFIV8r6L1LQQAOh6tr1EkqHNbXhvQGtzDkElecSRUJci9ehUHyfHA6R6Ju1acAq48RVfKIuDZj1C7F0IKKRUL4RfsEyCCBgS/4EyMVKy2wQMTbQ0+78fIAsimvrHqILMvQg15yK5IwxYs54+FcC+RpUwC4PABC7//EXfwgAfeKAI36zruVJ6mwLgv827E53vUYKqlF2M/QCEaf8IbrQs5vB7UoAHVvTeEcE+MNhWCXytbKn63BCt6QrPhZmtpzqV4073YfVbvspV3BmetyQbE8/g63N38l34a2hBTYmDRIjkyNXpesVHVhAbcg/guWp804XuL5E5td7V7WsX31+JF2hnENb9jY+adGAn7OZeJE7jMUEl5EWPGVyg/sU0edG9tWUnXhOUWZ54kzWUsW3WJvg4+03s/RGMULLxe8sElNjF4PA0PW6Sx+x3EMz+5JVJAgaN4y5L6MQfCPS7t7FKXwZdD80/hEa0E+48rPjgLHBuUo/KTz7pyiCn5uP92fEWksmn7SqGlMFyH9NeJG8KRmXYeburCtXOorWLnrNEppiOOlqFbDT/rs+p34GKoXViIehu0VdfAHXqzo6zWPy1yc7boVJuyB0W3eOAXvSZpLdsA2VVby0vDqM55GfEZayj7tt7u2UNLF0vF+h6A9rcR52s5R7C3jsTNIRCjbVP3CM1x0dJa4x8cOs7f31h+XIPaQ1uI1oUNHSKz3FHqsK14pdCBHYtcQPXSFEf0ny8valxo93tR6INavzSmE9B4nprHJYVUkeqDuSd0KSA2kWwdTzS0XSI/V4TIgGveXUL0WvEA0OUxEZmBZPvXTBjsgFiTiIfmS9QjMnEXEQn7oHzSF5df7fUB4c+MF/skE68phdyHHljgq7+y8oIf2AFR9jCFj1miC0XhojbQTsV1hL4qv6h8mF0VHP9trOaDE8GYpSSwmpHxkbHg+Ee5cy8+mHJi7sjy5ff9ysTAopP/Z94kmhyyGGqWP0HQlXHzZvNcJoYkyv9nSOq0KYSqqopvCZrPX5vis0LHf80iN4GpOqpiI1GSXcPAF0yTvkkGcfuUI3SS+YkZIqwuhqbpgaNRYiHL/wmWrYmh6b3HJODfAgwAO6PdooqghQUAAAAASUVORK5CYII="/></a>\
					<a href="https://github.com/OfficeDev"><img class="socialIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjg2QzlFNThBQTc2MTFFNTkyNjBBMDUxOTZCQ0Y1MzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjg2QzlFNTlBQTc2MTFFNTkyNjBBMDUxOTZCQ0Y1MzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODZDOUU1NkFBNzYxMUU1OTI2MEEwNTE5NkJDRjUzNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGODZDOUU1N0FBNzYxMUU1OTI2MEEwNTE5NkJDRjUzNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnAXuTEAAAHFUExURfv7+/r6+vj4+ERCQ/T09P7+/jAuL/Ly8jk3OC8tLpOSkqSjpCYkJf39/UE/QPb29hoYGYyLjCspKtDQ0CgmJ2hnZ6Ggofz8/J+en9bW1oqJifX19Xh3eMjIyGloaNva2jQyM+rq6oKBglNSUi4sLWppaSEfIBwbGxgWFyMhIpqZmtXV1TMxMiYlJr28vE5NTh8dHmBeX4uKiy0rLNPT0/Hx8ayrrJ2cnZ6dndzc3Ly7u1xbXFRSU6Oio/Pz8zs5OsHAweHh4ejo6Pf39nNycklHSCAeH3h3dzAvMEZFRouLi29ub6qqquPj42VkZVFQUB4cHcrKyuDg4FNRUoF/gPX29ZiXmJeXlz48PENCQjg2NykoKG9tbjIwMWJhYVBOT0ZERd/f35ORkmFfYImIiVZUVYSDg8vKymRjZEJAQczMzefn55WVlauqq15dXff3+GNiY6moqMXExYOCg5mYmaCgoMvKy317fBkXGGtqaisqKyEgIIaEhfT19UhGR7Gwsff390ZFRbSys5iWl9vb22dlZuvr6yIhIoiHh5KSkpSTk7++vnt6evv6+5ubm9va27m5ub69vUVDRPv6+v///xcVFv///1rUyzkAAACXdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDxn5gTAAACMUlEQVR42nyV5WPyMBDGr6WlA8aACUPn7u7u7tvr7u7u7p7w975p0pS2pDwf4HLPjxIuuQMyVkkj/tseb3u713P564hks8ASx1MF2KKCVFwIDq/iHK0O54JDzVig5iEHKFdgF1XIVjBZi11Vm8yCcifOo07ZBDdwXm1wcJwuW6SVIjtQtCK10GCcgTthfbHVh9B+YLKpbSwRiyXG2pomA/sI9W3pXniHgvX0U7shhJDaPxNSJABJCc30qyQR2qVmvQ62su8ZBSTQj1HmthJwjoWl70Xgr1LmzmVAKTa2XiICSwyzWIEOIzyEhLpv2B3QwwLftBic9jG/B7pZ8AW56Owx6neDUeSoG/jgKSs+1DFwyg2cukD9Oihk4Dc38M8p6hdyMOAGBnwGuMTAQTdwkNV5CZYZeHFWzM3eY2ezDGUMXFgXg+sLzC+DA6P038VgyrAPYBvnO+uH3N2GIG/6ht/lTiz4toEPgyBkIuQ9duMoeT1+1c5demJ2RYTcx+oujO9cU2/qV/7vh58Kg7TrJ688Nrmuar0V9EeeQy/e0JSHP+60tc0itGe0KhI+R2foZtMcvGvhqjTWrml9EUf/Ph9++crcYHlvFkzzAeDXK+r8xSdMzp+dPXtkmbCD4OXcnnWa1ZDEkfP+d48+5oA19vkYbaTZ8C0H2Bh1DtLKTT3fa54O0Hu4WSmY4WsejD8lOfj6GSnqmnjYawPzizIH5cX5Ac3lX4FoQuWgOmF3/gswAKedMe1L4EfkAAAAAElFTkSuQmCC" /></a>\
					<a href="https://twitter.com/OSpecifications"><img class="socialIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAMAAACPWYlDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRDMkUzNzc3NjYxODExRTVCMDI4RThFMjg5MDA3OEQxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRDMkUzNzc2NjYxODExRTVCMDI4RThFMjg5MDA3OEQxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIElsbHVzdHJhdG9yIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5M0ZDRTE1NzMyMTY4MTE4MDgzOEQyRjUwNzM5NkFFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5M0ZDRTE1NzMyMTY4MTE4MDgzOEQyRjUwNzM5NkFFIi8+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+UHJpbnQ8L3JkZjpsaT4gPC9yZGY6QWx0PiA8L2RjOnRpdGxlPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv54AQ0AAAHjUExURQMDAwQEBAMCAgIBAQcHBwUFBQYGBgICAgQDAwUEBBsbGwMEBFFOTvv7+3p3d8rIyNLQ0Dc2NlhWVUA+Publ5U9NTT08OwcIB66rqwYFBVRRUVZTU9DOzpqXl0JBQAwNDUA/PkVDQygoKCUlJR0cHJ6bm1tZWJqXloyJiY2KikJAQNfW1YSBgV1aWUpISCsqKkNBQRQTEwoLC0hGRczKymJfXvj3983Ly8rJyaqnp6ilpdjW1iEgIIuIiMbEw1NQUFVSUktJSaekpJ+dnaajoxgXF357eu3s7AcGBt7c3HBubpWSkhgYF4WCgggICHh1dQkICBcXFzg3NjAuLikoKD07OikpKOvp6BgYGBQUFDMxMR8fHjAvLx8fH3d0dERCQaOhoKOgoDs5OHZzc0pHR7WzsvHw8CIiIhMTEzMyMmFeXm9sbPj5+d3b28LAwPf29icnJxoaGvTz81dUVHVyckJAPzo4OMnHxnd0c9za2jk3Nre0tDw6Ojs5ObazszQzM7Ctrejn55+bm8C+vklHRmxpaPHw7726uqGenkpIR4aEhHFubhcXFicmJkNBQD48PNDNzYF+flJQT1dUU3NwcLu4uPDu7mBdXFZUUzMxMLKvrzc1NQEAAA4ODgAAAAEBAf///3u9UpkAAAIxSURBVHjanJXVeuMwEEYFpjRY2HK7XWZmhi4zMzMzMzMzTMZ61FXiOFVk+rJzF+WceCRH/5AGt1hHuQ2k6NZVxTiBpBFkIQ0RMASnCOa9j0cmmYCG68pPJdMTCGGuofESeHfgvJCVPyNZ+aSuHegLNn7dD7UGwY5nwq/CrtS6X+MKtCoAFTc31RoUvoiB6p67U4jtiKYv3BeinYCl8ieFVn3W2IfoCcg2yoXpg0H+QqWQjdf4XGNLu+kLzpvS0uo7HCjxBBim8TN/iNsWVFpCfs1b7RkuT72sQEbvSOQpdFQ33VxZPPHtVOlN2S5fo/N/nPKpeALSbn/93Khpy1MO8JG6MMQ7xcqLgyblq+z33IfLP3VhMih/jTYwn4iEalUEtJ8fW9Ufz2eHqgJbL44vjRcWElRagt6khsRhpgpIPiUJK7gqED4jSTgI6gUiyJbF8wUDa26cBfRQrHCUaVd0A/I9j15EC6eB6He6dcvfl5H8aAf11IDFcR1dAqoL6IyI5t9yO5BLJtj5KH7eVEgHg8yAtqcRwj4lH5TkM8CcMFtcuRjgJzIMj0oDIbV7ToDvZJgOFxC4lQvwg4LZSkgpcjnj7z9ngzzW8GUBsffq7yW3xlwIbvfVXobEDQo37oaeTksGgJDgfCAUWHPPSh1/0GTxgSis3bSMdjala8GsKvx47dltTO6WRU4ggshT1vytrzszmUXXGzczGWfphJFlu+UB5RWy/5lx4UK9Y/efAAMAN5MnkIa9QVcAAAAASUVORK5CYII="/></a>\
					<a href="https://www.facebook.com/MicrosoftInteropEvents/"><img class="socialIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAxCAMAAACvdQotAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBGREU3MTE5REQ2MTFFNTgwRDVGMTlFMzlCNTM2NUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBGREU3MTI5REQ2MTFFNTgwRDVGMTlFMzlCNTM2NUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEZERTcwRjlERDYxMUU1ODBENUYxOUUzOUI1MzY1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEZERTcxMDlERDYxMUU1ODBENUYxOUUzOUI1MzY1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgYyEHgAAAE4UExURREREX9/fzY2NmFhYXV1dfT09P39/RUVFQoKCoGBgQEBAVlZWcDAwNTU1Pb29oCAgPPz8/7+/vz8/FtbW/n5+Q4ODoaGhgcHB+fn5/v7+yMjIzMzM3p6enJycnZ2dhAQEIODg7+/vzs7OwMDA2hoaGJiYnx8fLe3t1VVVaKioiYmJmlpaY+Pj3R0dMPDw/X19ZmZmXh4eCkpKYWFhevr62dnZxkZGVpaWt7e3qqqqioqKubm5ru7u3t7e/Hx8UBAQDo6Op6enjAwMPLy8hYWFkhISLGxsUNDQ9PT07i4uAgICJSUlMHBwdXV1QUFBUpKShgYGPr6+i4uLu3t7fDw8IuLi3d3dzQ0NKWlpV5eXm5ubkVFRVJSUoqKil1dXbq6ugsLC8vLy8XFxbS0tJycnP///wAAAP///7FibkUAAABodFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AH+z9SwAAAWtJREFUeNrs1lV3gzAYBmAmpYUiXWH1ri5zd3d3d4X9/3+wcBLa9DDCx6520feGk+/kOSEhQLhvnLl5tYOdrynSlcOXwkOa88hEXqaIUjFB0aI20VMmMKkIIWkRSsxbTPpNH7mziL7hhywoiHgMMlOczaqqWn0i7XdEMiyw+hk1cEZJJYbINEP0GY0ck5KAyIu7OG0KQya1LCJd7mTlF9LNJGVKGBEQeW30P6rVxkQAKSUIWBywmhAStMe4p6vjLLLVg0WSo6t55lx4TK5aH5ULiS8LgvBMRtFjqCGUPVaMMxxJepDegIPI/4LknHPZ9CChfUmSPsiKRUdQQ1oH7TG+dUMCSI6QwAmYBG0SapM2+TMZ9k9uENF8ETGDyKDo8bVUWka5RmTJjZzZ7/AbXd1DRLlwIQdhnHqJKq6dWz/xHfhv3zQL+KiwDRcVcrrgi1BRb56UJkH3Fq/Sh6vLIe2xk5nd8GEC9/0RYAADT1SenmBXwQAAAABJRU5ErkJggg==" /></a>\
					<a href="http://blogs.msdn.com/b/officeinteroperability/default.aspx?wa=wsignin1.0"><img class="socialIcon" src="data:image;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkMyMjNDMTg2NjE4MTFFNUIwMTA4MkMyMTM4NDU4RDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkMyMjNDMTk2NjE4MTFFNUIwMTA4MkMyMTM4NDU4RDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQzIyM0MxNjY2MTgxMUU1QjAxMDgyQzIxMzg0NThENSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQzIyM0MxNzY2MTgxMUU1QjAxMDgyQzIxMzg0NThENSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp+EqecAAAHaUExURXBwcAcHB8fHx+bm5iYmJsTExMvLy/7+/gMDAxISEggICEdHRygoKJ2dnT8/P3l0f+Ti5gYHBf39/iwsLKypr+zo8DIzMvT08/n4+zExMVhYWBkZGScnJnV1dSUkJoaBjAwMDIiEjailq1ZWVubk6AQCBlhXVxQUFHl1fsvJzcrIzMvKy/f0+Xp3fPr5+2ZmZt3d3UpKSmVkZk9LVU1NTfHx8YqKivr6+uHg4uDg4PLy8vX39FNOWWhmadPT06Oio5aWlunp6VtZXBQUE7W1te7u7xoXHnFvct7d33x4ftPQ1tzc3HJxdMLBw7q1v3Z1dyknKgoKCgQCBwICAgIDAQ4ODnNzchEREQABAPz8/AUFBSEhIQAAAUZGRjIyMuHf44WAi7i4uC8mOYF+hJmToVlZWdTU1JycnGVlZXx8fFNTU9XV1Wxsa7OytAcHCM7M0M7L03R0dEhHSC8uL/Xz90BAQHRtewYGBgsLC+zr7Xp0gKOjo5iYmKWlpSIiInp0gcnIyunn6gkJCZ2dnvv7+35+fhwdHBAREJKSkgQBBn97hS0tLSMjI1RUVFpZWjU1NUxHU9bW1mlpabOzswEBAWZlZhIRFYyJkAIDAoF8h9XX1P///wAAAP///8dONDsAAACedFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8APofj+AAAAa5JREFUeNq0lIdT1EAUhxNyB3ccSJfeld6UIiDSq4hK700R6SBdQXqRJogiQh7/q7tvc+ESc7kwI28mM9/+8mWTfZl53I3B4sgFLouJAEZMzpAHTUZFuD+x3A1rwcuVGC1KlRepL/qIco1nJuqI66JDFUQ5F2MdRbHqo1Px4adBhTp54rw9JpNp1Nwpqx/0+3j6TTbjXTT82N1uhmmJLTzPS1Hj+TPJtGmILwRBKH3SysJeDyY2aIhXeKf+aw6uHuwwc1vnzzxdpksb2zMj/B/xi3zYH1bc0x8XZVtq8fC21+4xNJidx8WEWrwQhFy7OdxOkzjkWrX4h+fXvOU9K0jyFtH3SKvhoauS+aoDoLkEsU77z+z2493PB4QDNim+3leJe5zZvAJQw7ZMp1Ex4pxKTKFhpQXYh+Z3k+g94jul+D0E02yAZIQxkv1GClSKA+yVqQBFaRTOSBaB0bVSTGJiFsFHFKaXAPghShtKsY2JbwD8nlMI9iThIqUZpWj9ScPCKYCul/gIFS8pBPUoT/2LI4VzoprSiIVQH6WEu8+ex/99mhkezcaHvbH6K8AA4IuGfuroG58AAAAASUVORK5CYII="></a>\
					<a href="https://channel9.msdn.com/Events/Open-Specifications-Plugfests"><img class="socialIcon" src="data:image;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkJDREZENDQ2NkQxMTFFNThGRUVFMEY4RDExMkU1OUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkJDREZENDU2NkQxMTFFNThGRUVFMEY4RDExMkU1OUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQkNERkQ0MjY2RDExMUU1OEZFRUUwRjhEMTEyRTU5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQkNERkQ0MzY2RDExMUU1OEZFRUUwRjhEMTEyRTU5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvoeOtgAAAg7SURBVHjarJlbaFRX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"></a>\
					<a href="mailto:mailto:plugfests@microsoft.com"><img class="socialIcon" src="data:image;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAoCAMAAABkbjJAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDQyMEJDQTI2NjE5MTFFNTg4MEQ5QzRDMERGMEU2NEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQyMEJDQTM2NjE5MTFFNTg4MEQ5QzRDMERGMEU2NEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENDIwQkNBMDY2MTkxMUU1ODgwRDlDNEMwREYwRTY0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENDIwQkNBMTY2MTkxMUU1ODgwRDlDNEMwREYwRTY0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmm86eUAAADJUExURUpKSgEBAT4+Pvb29oiIiJ2dnQIBAyIiIgcGBxUVFREPET8/PyIhIxAQENTU1NXV1ScnJ9fX15OTk1ZWVpGRkeDg4KqpqkJBQqmpqWhoaOjn6fj4+OHh4rW1tZSUlI6OjsjIyOfn6C0tLoWFhTQ0NAsLC7Oytb28vU1NTQkJCaWlpaqrqWRjZQoKCt3d3aenp+zs7P7+/sHBwUxKTdzc3cDAwMvLy7OytFtbW35+fnd3dxYWFg8PD0xLTUxMTvDw8P///wAAAP///2C42KgAAABDdFJOU////////////////////////////////////////////////////////////////////////////////////////wBBYgTvAAABO0lEQVR42uSV13KDQAxFAYN777333muKzP9/VICLHeKAQXnyTPS0XN2zDIukFVR+CKp65YXO+K9cSOC+5uWZAhMpaMyByRw0hhYsZEE6Q2MGMiYwVPSMFOnGUKrkiSil6JshOiVdieQJVo2ZYLVsuyDtJYwT/Z8qZWPd+hCfEOJ7y3CVFdRBNIcdBkFHJDiAJRe91c5lCmV7dkDOWximF0u9HfsQ5a4N0ZWR7B8falSB7os8fpUY8SGl/K7r7NzIrHajH8hotzL0edauF0Jx7LcPW5DwHmI8ZN8/sQzyVfkuyVVImZhjzw3zsKQl41FK4zE/fNqnDbioFngL1Mx1w623OwnzAD/N40p03OdBr0nWaPa8zJDZpnInKpuZx7kj1dcGsa5LnFkl6PFvZu8rM9y70f/HO5gfXwIMAN708dmhZPsCAAAAAElFTkSuQmCC000000"></i></a>\
				</p>\
				<p><img class="ms-logo-mobile" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAVCAYAAACwnEswAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzUwNDAyMkVCNjNGMTFFNUIyODA5OEJGNTg3QzhFQjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzUwNDAyMkZCNjNGMTFFNUIyODA5OEJGNTg3QzhFQjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTA0MDIyQ0I2M0YxMUU1QjI4MDk4QkY1ODdDOEVCMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTA0MDIyREI2M0YxMUU1QjI4MDk4QkY1ODdDOEVCMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk/GmnkAAAZXSURBVHja7Fl7UFRV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" /></p>\
			</nav>';

	var footerMenu = $.parseHTML(footerMenuHTML);
	$footer.append(footerMenu);
});