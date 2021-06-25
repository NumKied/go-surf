const { src, dest, parallel, series, watch } = require('gulp'),
  browserSync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default,
  del = require('del'),
  imageMin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel');

const project_folder = 'dist',
  source_folder = 'src',
  isOnline = true;

const paths = {
  build: {
    html: `${project_folder}/`,
    css: `${project_folder}/css/`,
    js: `${project_folder}/js/`,
    img: `${project_folder}/img/`,
    fonts: `${project_folder}/fonts/`,
    libs: `${project_folder}/libs/`
  },
  src: {
    html: [`${source_folder}/*.html`, `!${source_folder}/_*.html`],
    css: `${source_folder}/scss/app.scss`,
    js: `${source_folder}/js/main.js`,
    img: `${source_folder}/img/**/*`,
    fonts: `${source_folder}/fonts/**/*.ttf`,
    libs: `${source_folder}/libs/**/*`
  },
  watch: {
    html: `${source_folder}/**/*.html`,
    css: `${source_folder}/scss/**/*.scss`,
    js: `${source_folder}/js/**/*.js`,
    img: `${source_folder}/img/**/*`,
    fonts: `${source_folder}/fonts/**/*.ttf`,
    libs: `${source_folder}/libs/**/*`
  },
  clean: `${project_folder}/`
}

function sync() {
  browserSync.init({
    server: { baseDir: `./${project_folder}/` },
    notify: false,
    online: isOnline
  })
}

function html() {
  return src(paths.src.html)
    .pipe(fileInclude())
    .pipe(dest(paths.build.html))
    .pipe(browserSync.stream())
}

function css() {
  return src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'expanded' }))
    // .pipe(groupMedia())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 5 versions'] }))
    .pipe(dest(paths.build.css))
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.build.css))
    .pipe(browserSync.stream())
}

function js() {
  return src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(fileInclude({ prefix: '~' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest(paths.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.build.js))
    .pipe(browserSync.stream())
}

function images() {
  return src(paths.src.img)
    .pipe(webp({
      quality: 70
    }))
    .pipe(dest(paths.build.img))
    .pipe(src(paths.src.img))
    .pipe(imageMin([
      imageMin.gifsicle({ interlaced: true }),
      imageMin.mozjpeg({ quality: 75, progressive: true }),
      imageMin.optipng({ optimizationLevel: 5 }),
      imageMin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest(paths.build.img))
    .pipe(browserSync.stream())
}

function libs() {
  return src(paths.src.libs)
    .pipe(dest(paths.build.libs))
    .pipe(browserSync.stream())
}

function fonts() {
  return src(paths.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(paths.build.fonts))
    .pipe(src(paths.src.fonts))
    .pipe(ttf2woff2())
    .pipe(dest(paths.build.fonts))
    .pipe(src(paths.src.fonts))
    .pipe(dest(paths.build.fonts))
}

function clean() {
  return del(paths.clean);
}

function toTtf() {
  return src(`${source_folder}/fonts/**/*.otf`)
    .pipe(fonter({ formats: ['ttf'] }))
    .pipe(dest(`${source_folder}/fonts/`))
}

function watching() {
  watch([paths.watch.html], html);
  watch([paths.watch.css], css);
  watch([paths.watch.js], js);
  watch([paths.watch.img], images);
  watch([paths.watch.libs], libs);
}

const build = series(clean, parallel(js, css, html, images, fonts, libs))
const mainTask = parallel(build, watching, sync);

exports.toTtf = toTtf;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.libs = libs;
exports.build = build;
exports.mainTask = mainTask;
exports.default = mainTask;