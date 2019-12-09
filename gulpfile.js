const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const uglify = require('gulp-uglify');
const pump = require('pump');
const del = require('del');
const surge = require('gulp-surge');

gulp.task('style', () => (
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream()))
);

gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('source/img/*.svg', gulp.series('sprite', 'html', 'reload'));
  gulp.watch('source/img/**/*.{png,jpg,svg}', gulp.series('images', 'reload'));
  gulp.watch('source/*html', gulp.series('html', 'reload'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'reload'));
});

gulp.task('reload', (done) => {
  server.reload();
  done();
});

gulp.task('images', () => (
  gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'))
));

gulp.task('sprite', () => (
  gulp.src('source/img/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
));

gulp.task('html', () => (
  gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'))
));

gulp.task('js', (cb) => (
  pump([
    gulp.src('source/js/**/*.js'),
    uglify(),
    gulp.dest('build/js')
  ], cb)
));

gulp.task('copy', () => (
  gulp.src([
    'source/fonts/**/*.{woff,woff2}'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
));

gulp.task('clean', () => (
  del('build')
));

gulp.task('deploy', () => (
  surge({
    project: 'build',
    domain: 'tema-luch.surge.sh'
  })
));

gulp.task('build', gulp.series('clean', 'sprite', gulp.parallel('copy', 'style', 'images', 'html', 'js')));

gulp.task('start', gulp.series('build', 'serve'));
