// gulpfile
// for all the gulps

require('es6-promise').polyfill();

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cleancss = require('gulp-clean-css'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify');

// styles task
// > gulp styles
gulp.task('styles', function() {
	gulp.src('sass/willwallace.scss')
	.pipe(sass({
		style: 'expanded',
		'sourcemap=none': true
	}))
	.on('error', function (err) {
		console.log(err.message)
		this.emit('end')
	})
	.pipe(autoprefixer({
		browsers: ['> 5%', 'last 2 versions']
	}))
	.pipe(gulp.dest('public/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(cleancss())
	.pipe(gulp.dest('public/css'))
	.pipe(notify({message: 'Styles task complete'}))
	.pipe(livereload());
});

// scripts task
// > gulp scripts
gulp.task('scripts', function() {
	return gulp.src([
		'js/vendor/**/*.js',
		'js/src/**/*.js'
	])
	.pipe(concat('willwallace.js'))
	.pipe(gulp.dest('public/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify().on('error', function(err) {
		console.log(err.message)
		this.emit('end')
	}))
	.pipe(gulp.dest('public/js'))
	.pipe(notify({message: 'Scripts task complete'}))
	.pipe(livereload());
});

// default task
// > gulp
gulp.task('default', function() {
	gulp.start('styles', 'scripts');
});

// Watch task
// > gulp watch
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/src/**/*.js', ['scripts']);
})
