var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var less = require('gulp-less');
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    cssnano = require('gulp-cssnano'),
    del = require('del');


gulp.task('default', ['clean'], function() {
  gulp.start('styles');
});

gulp.task('styles', function(done) {
  gulp.src('./app/src/assets/styles/index.less')
    .pipe(less())
    .pipe(gulp.dest('./app/dist/assets/styles/'))
    .pipe(cssnano())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/dist/assets/styles/'))
    .pipe(notify({ message: 'Less Styles Task Complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['./app/dist/assets/styles/*']);
});
