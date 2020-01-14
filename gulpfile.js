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
const del = require('del');
/*const uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

gulp.task('js', () => {

  let options = {

  }

  return gulp.src('./source/js/index.js')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Webpack',
        message: err.message
      }))
    }))
    .pipe(webpackStream({
      output: {
        filename: 'index.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      externals: {
        jquery: 'jQuery'
      }
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/js/'));
});*/


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
  gulp.watch('source/*.html', gulp.series('html', 'reload'));
  gulp.watch('source/js/**/*.js', gulp.series('copy', 'reload'));
  gulp.watch('source/*.php', gulp.series('copy', 'reload'));
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

gulp.task('copy', () => (
  gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/js/**/*.js',
    'source/*.php'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
));

gulp.task('clean', () => (
  del('build')
));

gulp.task('build', gulp.series('clean', 'sprite', gulp.parallel('copy', 'style', 'images', 'html')));

gulp.task('start', gulp.series('build', 'serve'));
