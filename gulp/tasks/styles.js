import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import purgecss from 'gulp-purgecss'
import autoprefixer from 'gulp-autoprefixer'
import csso from 'gulp-csso'
import { server } from './server.js';
import pkg from 'gulp'

const {src, dest} = pkg

export const styles = () => {
  return src(`${$.conf.app}/${$.conf.pathStyles}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(purgecss({
      content: [`${$.conf.app}/${$.conf.htmlPages}/**/*.html`],
      whitelistPatterns: [/scroll/, /hide/, /active/, /hidden/, /added/]
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${$.conf.outputPath}/${$.conf.pathStyles}`))
    .pipe(server.stream());
}
