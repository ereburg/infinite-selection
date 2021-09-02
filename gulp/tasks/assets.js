import { server } from './server.js';
import pkg from 'gulp'

const {src, dest} = pkg

export const assets = () => {
  return src([`${$.conf.src}/${$.conf.pathAssets}/**/*`])
    .pipe(dest(`${$.conf.outputPath}/${$.conf.pathAssets}`))
    .pipe(server.stream())
}
