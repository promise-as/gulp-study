## `gulp4`

### 1. 下载`node`

### 2. 安装`cnpm`

### 3. `gulp`官网

### 4. 安装`gulp`

- 用`cnpm`安装全局`gulp`

### 5. `package.json`

- 在项目根目录下

- 如果手动新建这个文件，而且这个文件里面的文本时空的就会报出以下

  ```js
  // Unexpected end of JSON input
  // JSON输入意外结束
  ```

- 这个文件时在你输入`cnpm init`或者`cnpm init -y`之后自动生成的

### 6. 初始化项目

```js
// 询问步骤
cnpm init
// 默认
cnpm init -y
```

### 7.本地`gulp`

```js
cnpm install --save-dev gulp
// 版本是4
```

### 8. `html`

```js
const { src, dest } = require('gulp');
function html() {
  return src('src/*.html')
    .pipe(dest('dist/'));
}
exports.html = html;
```

### 9.`css`

```js
// cnpm install gulp-sass --save-dev
const sass = require('gulp-sass');
function css() {
  return src('src/sass/*.scss')
    .pipe(sass(
      {
        outputStyle: 'expanded',  // 编译成css的标准格式
        // outputStyle: 'compact',  // 编译成css的一行
      }
    ))
    .pipe(autoprefixer(["last 2 versions"]))
    .pipe(dest('dist/css'));
}
exports.css = css;

```

### 10. `js`

```js
// cnpm install gulp-babel@7 babel-core babel-preset-es2015 --save-dev
function js() {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(dest('dist/js'))
}
exports.js = js;
// gulp-babel要装7.0.1版本，新版本是8.0.0，而babel的官方也就是7
// 要安装 babel-preset-es2015
```

### 11.自动更新

```js
// cnpm install gulp-connect gulp-livereload open --save-dev
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const open = require('open');
exports.default = function() {
  livereload.listen();
  connect.server({
    root: 'dist',  // 访问的目录
    livereload: true,
    host: '192.168.30.76', // ip地址
    port: 5000,
  });
  watch(
    ['src/*.html', 'src/sass/*.scss', 'src/js/*.js'], 
    series(html, css, js)
    );
  open('192.168.30.76:5000');
};
// 如果报错，可能是 gulp-livereload 和 gulp版本是4.0.2
// 旧版gulp是安装 3.9.1
// 如果没有自动更新，可能是该任务没有写 .pipe(livereload());
// 如果样式或者js代码没有变化，可能是没有引入
```


