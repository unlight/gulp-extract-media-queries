var through = require('through2');
var rework = require('rework');
var split = require('rework-split-media');
var reworkMoveMedia = require('rework-move-media');
var stringify = require('css-stringify');
var cleanUpString = require('clean-up-string');
var dirname = require('path').dirname;
var pathjoin = require('path').join;

module.exports = function() {
	return through.obj(function(file, enc, callback) {
		var stream = this;
		var reworkData = rework(file.contents.toString())
			.use(reworkMoveMedia());
		var stylesheets = split(reworkData);
		var stylesheetKeys = Object.keys(stylesheets);
		stylesheetKeys.forEach(function(key) {
			var poop = file.clone({
				contents: false
			});
			var name = cleanUpString(key);
			var contents = stringify(stylesheets[key]);
			poop.contents = new Buffer(contents);
			if (name) {
				var filepath = pathjoin(dirname(file.path), name + '.css');
				poop.path = filepath;
			} else {
				poop.path = file.path;
			}
			stream.push(poop);
		});
		callback();
	});
};