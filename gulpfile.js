const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const gulpCached = require('gulp-cached');
const autoprefixer = require("gulp-autoprefixer");
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const open = require('open');

function html() {
  return src('src/*.html')
    .pipe(dest('dist/'))
    .pipe(livereload());
}

function css() {
  return src('src/sass/*.scss')
    .pipe(gulpCached('src/sass/'))
    .pipe(sass(
      {
        outputStyle: 'expanded',  // 编译成css的标准格式
        // outputStyle: 'compact',  // 编译成css的一行
      }
    ))
    .pipe(autoprefixer(["last 4 versions"]))
    .pipe(dest('dist/css'))
    .pipe(livereload());
}

function js() {
  return src('src/js/*.js')
    .pipe(dest('dist/js'))
    .pipe(livereload());
}

exports.default = function() {
  livereload.listen();
  connect.server({
    root: 'dist',  // 访问的目录
    livereload: true,
    host: '192.168.30.76', // ip地址
    port: 5000,
  });
  watch(['src/*.html', 'src/sass/*.scss', 'src/js/*.js'], parallel(html, css, js));

  open('192.168.30.76:5000');
};
