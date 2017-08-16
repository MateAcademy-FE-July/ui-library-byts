'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');
 
var output = './dev/';

gulp.task('html', function () {
    return gulp.src('./dev/templates/*.html')
        .pipe(rigger())
        .pipe(gulp.dest(output));
});

gulp.task('sass', function () {
  return gulp.src('./dev/assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/assets/css'));
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: output
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});
 
gulp.task('default', ['html','sass', 'browser-sync'], function () {
  gulp.watch('./dev/assets/sass/**/*.scss', ['sass', 'bs-reload']);
  gulp.watch('./dev/templates/**/*.html', ['html']);
});