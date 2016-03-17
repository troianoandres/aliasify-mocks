var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('release:update', function (cb) {
    exec('npm version patch', function (err) {
        cb(err);
    });
});

gulp.task('release:move-files', function () {
    return gulp.src(['./package.json', './README.md', './.npmignore']).pipe(gulp.dest('./aliasify-mocks'));
});

gulp.task('release:publish', function (cb) {
    exec('npm publish ./aliasify-mocks', function (err) {
        cb(err);
    });
});

gulp.task('release:clean', function (cb) {
    del(['./aliasify-mocks/package.json', './aliasify-mocks/README.md', './aliasify-mocks/.npmignore']);

    cb();
});

gulp.task('release', function (cb) {
    runSequence('release:update', 'release:move-files', 'release:publish', 'release:clean', cb);
});