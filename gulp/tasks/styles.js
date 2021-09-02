import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import purgecss from 'gulp-purgecss'
import autoprefixer from 'gulp-autoprefixer'
import csso from 'gulp-csso'
import { server } from './server.js';
import pkg from 'gulp'
import gulpSass from 'gulp-sass'
import sass from 'sass'
import Fibers from 'fibers'
import tilde from 'node-sass-tilde-importer'

const SCSS = gulpSass(sass)
const {src, dest} = pkg

export const styles = () => {
  return src(`${$.conf.app}/${$.conf.pathStyles}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(SCSS.sync({
        importer: tilde,
        includePaths: ['./node_modules'],
        fiber: Fibers,
      }).on('error', SCSS.logError))
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
