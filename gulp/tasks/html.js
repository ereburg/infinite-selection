import pkg from 'gulp'
import htmlmin from 'gulp-htmlmin'
import { server } from './server.js'

const {src, dest} = pkg

export const optHTML = () => {
  return src(`${$.conf.app}/${$.conf.htmlPages}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(`${$.conf.outputPath}/${$.conf.htmlPages}`))
    .pipe(server.stream())
}
