import gulp from 'gulp'
import tinyPNG from 'gulp-tinypng-web'
import toWEBP from 'gulp-webp'
import rename from 'gulp-rename'
import svgStore from 'gulp-svgstore'

const tiny = () => {
  return gulp
    .src('./app/images/*.{png,jpg,jpeg}')
    .pipe(tinyPNG({ verbose: true }))
    .pipe(gulp.dest('./build/images/'))
}
const webp = () => {
  return gulp.src('./build/images/**/*.{png,jpg,jpeg}')
    .pipe(toWEBP({quality: 80}))
    .pipe(gulp.dest('./build/images/'));
}
const sprite = () => {
  return gulp.src('./app/images/sprite/sp-*.svg')
    .pipe(svgStore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/images/'));
}
const svgMove = () => {
  return gulp.src('./app/images/**/*.svg')
    .pipe(gulp.dest('./build/images/'));
}

export const images = () => gulp.series(tiny, webp, sprite, svgMove)
