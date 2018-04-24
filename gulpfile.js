'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSyncLib = require('browser-sync');
var pjson = require('./package.json');
var minimist = require('minimist');
var glob = require('glob');

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
var plugins = gulpLoadPlugins();

var config = pjson.config;
config.defaultNotification = function(err) {
  return {
    subtitle: err.plugin,
    message: err.message,
    sound: 'Funk',
    onLast: true,
  };
};
var args = minimist(process.argv.slice(2));
var dirs = config.directories;
var taskTarget = args.production ? dirs.destination : dirs.temporary;
var isProduction = args.production ? true : false;


// Create a new browserSync instance
var browserSync = browserSyncLib.create();


// All Angular files
var appScripts = ['./src/_scripts/app/*.js', './src/_scripts/app/**/*.js'];

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/**/*.js').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require(file)(gulp, plugins, args, config, taskTarget, browserSync);
});


// Concatenate angular task
gulp.task('concat', function() {
  if(isProduction){
	  return gulp.src(appScripts)
		.pipe(concat('app.min.js').on('error', gutil.log))
	  	.pipe(uglify('app.min.js').on('error', gutil.log))
		.pipe(gulp.dest(taskTarget+'/scripts/'));  
  }
  else{
	  return gulp.src(appScripts)
		.pipe(concat('app.min.js').on('error', gutil.log))
		.pipe(gulp.dest(taskTarget+'/scripts/'));	  
  }

});

// Copy icomoon
gulp.task('icomoon', function() {
  return gulp.src('./assets/icomoon/fonts/*')
    .pipe(gulp.dest(taskTarget+'/fonts/icomoon/'));
});

// Copy thirdparty js
gulp.task('thirdpartyjs', function() {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(taskTarget+'/scripts/lib/'));
  gulp.src('./node_modules/angular/angular.min.js')
    .pipe(gulp.dest(taskTarget+'/scripts/'));
  gulp.src('./node_modules/angular-route/angular-route.min.js')
    .pipe(gulp.dest(taskTarget+'/scripts/'));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
  'icomoon',
  'copy',
  'imagemin',
  'jade',
  'sass',
  'browserify'
]);

// Server tasks with watch
gulp.task('serve', [
  'icomoon',
  'thirdpartyjs',
  'concat',
  'imagemin',
  'copy',
  'jade',
  'sass',
  'browserify',
  'browserSync',
  'watch'
]);

// Testing
gulp.task('test', ['eslint']);
