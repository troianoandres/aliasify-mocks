var gulp = require('gulp');
var exec = require('gulp-exec');
var rimraf = require('gulp-rimraf');

gulp.task('release', function () {
    gulp.src(['./package.json', './README.md'])
        .pipe(gulp.dest('./aliasify-mocks'))
        .pipe(exec('cd aliasify-mocks'))
        .pipe(exec('npm publish'))
        .pipe(rimraf())
});