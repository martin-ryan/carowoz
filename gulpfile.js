"use strict";

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
		sass = require('gulp-sass'),
		uglify = require('gulp-uglify'),
		browserify = require('browserify'),
		autoprefixer = require('autoprefixer'),
		postcss = require('gulp-postcss'),
		debug = require('gulp-debug'),
		cssnano = require('cssnano'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		gutil = require('gulp-util'),
		babelify = require('babelify'),
		sourcemaps = require('gulp-sourcemaps')
;


// Config
var CSS = {
	src: "main.scss",
	out: "main.css",
	dir: "content/themes/caroline/assets/css/"
};

var JS = {
	src: "app.js",
	out: "bundle.js",
	dir: "content/themes/caroline/assets/js/"
};

// Lint Task
gulp.task('lint', function() {
    return gulp
				.src(JS.dir + JS.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function() {
	var processors = [
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		cssnano()
	];

	return gulp
		.src(CSS.dir + CSS.src)
    .pipe(sass())
		.pipe(postcss(processors))
    .pipe(gulp.dest(CSS.dir));
});

gulp.task('js', function() {
	var b = browserify({
			entries: JS.dir + JS.src,
			debug: true,
			transform: [babelify]
	});

	return b.bundle()
	.pipe(source(JS.out))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
			// Add transformation tasks to the pipeline here.
			.pipe(uglify())
			.on('error', gutil.log)
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(JS.dir));
});

// gulp.task('slidebars', function() {
// 	return gulp.src(JS.dir + "slidebars.js");
// 	.pipe()
// });

// Watch Files For Changes
gulp.task('watch', function() {
  // gulp.watch(JS.dir + JS.src, ['js']);
	gulp.watch(JS.dir + '/**/!(bundle.js)', ['js']);
  gulp.watch(CSS.dir + CSS.src, ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'js', 'watch']);