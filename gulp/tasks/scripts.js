import pkg from 'gulp'
import { server } from './server.js'
import gulpEsbuild, { createGulpEsbuild } from 'gulp-esbuild'
import plumber from 'gulp-plumber'

const { src, dest } = pkg

export const scripts = () => {
  const esbuild = $.conf.isProd ? gulpEsbuild : createGulpEsbuild({ incremental: true })
  const startPath = [`${$.conf.app}/${$.conf.pathJS}/*.{js,ts}`]
  const endPath = `${$.conf.outputPath}/${$.conf.pathJS}`

  return src(startPath)
    .pipe(plumber())
    .pipe(
      esbuild({
        // outfile: 'theme.min.js',
        outdir: '.',
        bundle: true,
        minify: $.conf.isProd,
        sourcemap: !$.conf.isProd,
        loader: {
          '.ts': 'ts',
        },
        // format: "esm",
        platform: 'browser',
        target: ['es6'],
        entryNames: '[name].min',
      })
    )
    .pipe(dest(endPath))
    .pipe(server.stream())
}
