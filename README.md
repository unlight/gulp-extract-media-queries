gulp-extract-media-queries
--------------------------
Plugin extracts css rules inside of media queries and saves it to separated files.

EXAMPLE
-------
```js
gulp.task("design.build", function() {
	return gulp.src("src/design/style.css")
		.pipe(g.extractMediaQueries())
		.pipe(gulp.dest("build"));
});
```
Task `design.build` for `style.css` for below `style.css` file:
``` css
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

Produces 2 files `style.css` and `min-width-640px.css` with following content:
| style.css | min-width-640px.css
| ----------|--------------------
|* {                                 |@media (min-width: 640px) {
|    -webkit-box-sizing: border-box; |    .container {
|    -moz-box-sizing: border-box;    |        max-width: 640px;
|    box-sizing: border-box;         |    }
|}                                   |}
