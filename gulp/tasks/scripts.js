import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import terser from 'gulp-terser'
import pkg from 'gulp'
import { server } from './server.js';

const {src, dest} = pkg

export const scripts = () => {
  return src([`${$.conf.app}/${$.conf.pathJS}/*.js`])
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(terser())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${$.conf.outputPath}/${$.conf.pathJS}`))
    .pipe(server.stream())
}
