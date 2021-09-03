import pkg from 'gulp'
import htmlmin from 'gulp-htmlmin'
import { server } from './server.js'

const { src, dest } = pkg

export const optHTML = () => {
  return src(`${$.conf.app}/${$.conf.pathHTML}/${$.conf.htmlPages}/*.html`)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest(`${$.conf.outputPath}/${$.conf.htmlPages}`))
    .pipe(server.stream())
}
