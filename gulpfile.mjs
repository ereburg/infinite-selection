import {
  assets,
  clean,
  convertHBS,
  initServer,
  initWatcher,
  prepareHtmlBuild,
  prepareHtmlDev,
  scripts,
  styles,
} from './gulp/tasks/index.js'
import conf from './gulp/config/config.js'
import { setMode } from './gulp/config/mode.js'
import pkg from 'gulp'

const { parallel, series } = pkg

global.$ = { conf }

const serve = parallel(initServer, initWatcher)
const transpile = parallel(assets, convertHBS, styles, scripts)

export const dev = series(setMode(), clean, transpile, prepareHtmlDev, serve)
export const build = series(setMode(true), clean, transpile, prepareHtmlBuild)
