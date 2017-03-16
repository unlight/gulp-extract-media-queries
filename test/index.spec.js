const plugin = require('..');
const assert = require('assert');
const file = require('gulp-file');
const through = require('through2');
const styleContentFixture1 = `
* { box-sizing: border-box; }
@media (min-width: 640px) {
	.container { margin: 0 auto; }
}`;

it('smoke test', () => {
    assert(plugin);
});

it('main case', (done) => {
	var stream = file('style.css', styleContentFixture1, { src: true });
	var fileMap = {};
	stream
		.pipe(plugin())
		.pipe(through.obj(function(file, enc, callback) {
			fileMap[file.path] = {path: file.path, contents: file.contents.toString()};
			callback(null, file)
		}));
	stream.on('end', function() {
		// main file
		var style = fileMap['style.css'];
		assert(style.path === 'style.css');
		assert(style.contents.indexOf(`*`) !== -1);
		assert(style.contents.indexOf(`box-sizing: border-box`) !== -1);
		assert(style.contents.indexOf(`.container`) === -1);
		// media file
		var media = fileMap['min-width-640px.css'];
		assert(media.path === 'min-width-640px.css');
		assert(media.contents.indexOf(`*`) === -1);
		assert(media.contents.indexOf(`.container`) !== -1);
		assert(media.contents.indexOf(`margin: 0 auto`) !== -1);
		
		done();
	});
});