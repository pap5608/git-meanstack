var gulp=require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var fs = require('fs')

fs.readdirSync(__dirname + '/gulp').forEach(function(task) {
	require('./gulp/' +task)
});

gulp.task('js', function() {
	gulp.src(['ng/module.js','ng/**/*.js'])
	.pipe(sourcemaps.init())
	.pipe(concat('app.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('asset'))
})

gulp.task('dev', ['watch:css', 'watch:js','dev:server'])
gulp.task('watch:js',['js'], function() {
	gulp.watch('ng/**/*.js',['js'])
})

gulp.task('watch:css',['css'], function() {
	gulp.watch('css/**/*.styl',['css'])
})