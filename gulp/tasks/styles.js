import pkg from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import sass from 'sass'
import Fibers from 'fibers'
import tilde from 'node-sass-tilde-importer'
import cleanCSS from 'gulp-clean-css'
import autoprefixer from 'autoprefixer'
import gulpPostcss from 'gulp-postcss'
import cssnano from 'cssnano'
import { server } from './server.js'

const SCSS = gulpSass(sass)
const { src, dest } = pkg

export const styles = () => {
  const sheets = [`${$.conf.app}/${$.conf.pathStyles}/*.scss`]
  const destPath = `${$.conf.outputPath}/${$.conf.pathStyles}`
  const PostCSSPlugins = [autoprefixer({ cascade: false }), cssnano()]

  switch ($.conf.isProd) {
    case true:
      return src(sheets)
        .pipe(
          SCSS.sync({
            importer: tilde,
            includePaths: ['./node_modules'],
            fiber: Fibers,
          }).on('error', SCSS.logError)
        )
        .pipe(gulpPostcss(PostCSSPlugins))
        .pipe(
          cleanCSS({
            level: {
              1: {
                all: true,
                normalizeUrls: false,
              },
              2: {
                restructureRules: true,
              },
            },
            debug: true,
            compatibility: '*',
          })
        )
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest(destPath))
    case false:
      return src(sheets)
        .pipe(sourcemaps.init())
        .pipe(
          SCSS.sync({
            importer: tilde,
            includePaths: ['./node_modules'],
            fiber: Fibers,
          }).on('error', SCSS.logError)
        )
        .pipe(gulpPostcss(PostCSSPlugins))
        .pipe(
          cleanCSS({
            debug: true,
            compatibility: '*',
          })
        )
        .pipe(sourcemaps.write())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest(destPath))
        .pipe(server.stream())
  }
}
