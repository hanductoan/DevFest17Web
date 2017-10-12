// npm install --global gulp
// npm install

// npm i --save-dev gulp
// npm i --save-dev gulp-sass

// npm install --save-dev gulp-cssnano 
// npm install --save-dev gulp-rename
// npm install --save-dev gulp-watch
// npm install --save-dev gulp-uglify
// npm install --save-dev browser-sync 
// npm install --save-dev gulp-plumber 
// npm install --save-dev gulp-html-minifier
// npm install --save-dev gulp-concat


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    htmlmin = require('gulp-html-minifier'),
    concat = require('gulp-concat');

var handleErrors;

// SCSS to CSS
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename(function (path) {
            // path.dirname += "/css";
            // path.basename += "-goodbye";
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());

});

// concat scss
gulp.task('scssconcat', function () {
    return gulp.src('scss/elements/*.scss')
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('./scss/'));
});

// JS uglify
gulp.task('js', function () {
    return gulp.src('temp-js/*.js')
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(uglify())
        .pipe(rename(function (path) {
            // path.dirname += "/js";
            // path.basename += "-goodbye";
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());

});

// HTML minify
gulp.task('htmlminify', function () {
    gulp.src('temp-index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./'));
});

gulp.task('serve', ['sass', 'js', 'htmlminify', 'scssconcat'], function () {
    browserSync.init({
        server: './',
    });
    gulp.watch(['scss/elements/*.scss'], ['scssconcat']);
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['temp-js/*.js'], ['js']);
    gulp.watch(['temp-index.html'], ['htmlminify']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);