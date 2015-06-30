/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins
To learn more visit: https://github.com/gulpjs/gulp/blob/master/docs/README.md
*/
'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var _ = require('lodash');
var del = require('del');
var project = require('./project.json');
var packages = require('./package.json');
var app = './app';
var releaseDir = project.webroot + '/app';

// The default task (called when you run `gulp` from CLI)
gulp.task('default', ['clean', 'copy-deps', 'copy-templates', 'scripts']);

gulp.task('watch', ['default'], function () {
  var watcher = gulp.watch(app + '/**/*', ['scripts', 'copy-templates']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('copy-deps', function () {
  var modulesToCopy = _.map(packages.dependencies, function (val, key) {
    return './node_modules/' + key + '/**/*';
  });

  gulp.src(modulesToCopy, { base: 'node_modules' })
    .pipe(gulp.dest(releaseDir + '/lib/'));
});

gulp.task('copy-templates', function () {
  gulp.src(app + '/**/*.html')
    .pipe(gulp.dest(releaseDir));
});

gulp.task("scripts", function () {
  var tsProj = ts.createProject(app + '/tsconfig.json', {
    typescript: require('typescript')
  });

  var tsResult = gulp.src(app + '/**/*.ts')
    .pipe(ts(tsProj));

  return tsResult.js.pipe(gulp.dest(releaseDir));
});

gulp.task("clean", function () {
  del([releaseDir]);
});