// gulpfile
// Config for 'gulp' task runner - gulpjs.com





// Load plugins
// Here we list all the plugins we'll be using, alphabetically please :)
// All plugins should be installed via npm on user's system
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');





// Scripts task
// Combine all js files to a single file, output as minified & non-minified
gulp.task('scripts', function() {
    return gulp.src([
        '_scripts/vendor/*.js',
        '_scripts/utils.js',
        '_scripts/lux.js',
        '_scripts/app.js'
    ])
    .pipe(concat('willwallace.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', function (err) { // this entire handler doesn't appear to work
        console.log(err.message)
        this.emit('end')
    })
    .pipe(gulp.dest('js'))
});





// Default task
// What happens when user runs 'gulp'
gulp.task('default', function() {
    gulp.start('scripts');
});





// Watch task
// What happens when user runs 'gulp watch'
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('_scripts/**/*.js', ['scripts']);
});