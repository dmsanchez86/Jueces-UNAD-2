var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin');
    
gulp.task('css', () => {
  gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(plumber())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', () => {
  gulp.src('./src/js/**/**/*.js')
    .pipe(plumber())
    .pipe(uglify({
      mangle: false // permite que las variables no se minifiquen o si no causa error con angular
    }).on('error', (e) => {
      console.log(e);
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('lib', () => {
  gulp.src('./src/lib/**/*.js')
    .pipe(plumber())
    .pipe(uglify().on('error', (e) => {
      console.log(e);
    }))
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('imagemin', () => {
  gulp.src('./src/images/**/**/*.{jpg,jpeg,png,gif}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('default', ['js', 'css', 'lib', 'imagemin']);