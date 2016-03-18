var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

gulp.task('release:update', function (cb) {
    var version = argv.version || 'patch';

    exec('npm version ' + version, function (err) {
        cb(err);
    });
});

gulp.task('release:move-files', function () {
    return gulp.src(['./package.json', './README.md']).pipe(gulp.dest('./aliasify-mocks'));
});

gulp.task('release:publish', function (cb) {
    exec('npm publish ./aliasify-mocks', function (err) {
        cb(err);
    });
});

gulp.task('release:clean', function (cb) {
    del(['./aliasify-mocks/package.json', './aliasify-mocks/README.md']);

    cb();
});

gulp.task('release', function (cb) {
    runSequence('release:update', 'release:move-files', 'release:publish', 'release:clean', cb);
});