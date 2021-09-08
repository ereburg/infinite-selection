import { server } from './server.js'
import pkg from 'gulp'

const { src, dest } = pkg

export const assets = () => {
  switch ($.conf.isProd) {
    case true:
      return src([`${$.conf.src}/${$.conf.pathAssets}/**/*`]).pipe(dest(`${$.conf.outputPath}/${$.conf.pathAssets}`))
    case false:
      return src([
        `${$.conf.src}/${$.conf.pathAssets}/**/*`,
        `!${$.conf.src}/${$.conf.pathAssets}/previews`,
        `!${$.conf.src}/${$.conf.pathAssets}/previews/**/*`,
      ])
        .pipe(dest(`${$.conf.outputPath}/${$.conf.pathAssets}`))
        .pipe(server.stream())
  }
}
