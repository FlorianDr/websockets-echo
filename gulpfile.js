'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  babel = require('gulp-babel');

gulp.task('transpile', function () {
  return gulp.src('src/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  nodemon({
    script: 'dist/server.js'
    , ext: 'js'
    , ignore : ['dist/', 'gulpfile.js']
    , tasks : ['transpile']
    , env: { 'NODE_ENV': 'development' }
  })
})
