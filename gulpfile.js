var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('release:update', function (cb) {
    exec('npm version patch', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('release:move-files', function () {
    return gulp.src(['./package.json', './README.md']).pipe(gulp.dest('./aliasify-mocks'));
});

gulp.task('release:publish', function (cb) {
    exec('npm publish ./aliasify-mocks', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
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