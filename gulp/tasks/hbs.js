import gulpCompileHandlebars from 'gulp-compile-handlebars'
import htmlMin from 'gulp-htmlmin'
import fs from 'fs'
import pkg from 'gulp'
import rename from 'gulp-rename'
import { server } from './server.js'

const { src, dest } = pkg

export const convertHBS = (buildProd = false) => {
  const randomIntNum = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1))
  const initParams = {
    cache: randomIntNum(1, 5000),
    dynamicEntry: $.conf.dynamicEntry && $.conf.isProd,
  }
  const options = {
    ignorePartials: true,
    batch: [`${$.conf.app}/${$.conf.pathHTML}/partials`],
    helpers: {
      times: function (n, block) {
        const result = []
        for (let i = 0; i < n; ++i) result.push(block.fn(i + 1))
        return result.join('')
      },
      when: function (v1, operator, v2, options) {
        switch (operator) {
          case '===':
            return v1 === v2 ? options.fn(this) : options.inverse(this)
          case '!==':
            return v1 !== v2 ? options.fn(this) : options.inverse(this)
          case '<':
            return v1 < v2 ? options.fn(this) : options.inverse(this)
          case '<=':
            return v1 <= v2 ? options.fn(this) : options.inverse(this)
          case '>':
            return v1 > v2 ? options.fn(this) : options.inverse(this)
          case '>=':
            return v1 >= v2 ? options.fn(this) : options.inverse(this)
          case '&&':
            return v1 && v2 ? options.fn(this) : options.inverse(this)
          case '||':
            return v1 || v2 ? options.fn(this) : options.inverse(this)
          default:
            return options.inverse(this)
        }
      },
      ifCond: function (v1, v2, options) {
        if (v1 === v2) return options.fn(this)
        return options.inverse(this)
      },
      concat: function (...args) {
        return `${args.slice(0, -1).join('')}`
      },
      ifUseWebp: function (block) {
        if ($.conf.useWEBP) return block.fn(this)
        else return block.inverse(this)
      },
    },
  }
  const base = JSON.parse(fs.readFileSync(`${$.conf.app}/${$.conf.pathDB}/db.json`).toString())
  const links = JSON.parse(fs.readFileSync(`${$.conf.app}/${$.conf.pathDB}/links.json`).toString())

  const db = { ...initParams, ...base, ...links }
  const startPath = [`${$.conf.app}/${$.conf.pathHTML}/pages/*.hbs`]
  const destPath = `${$.conf.outputPath}/${$.conf.htmlPages}`

  return src(startPath)
    .pipe(gulpCompileHandlebars(db, options))
    .pipe(
      rename((path) => {
        path.dirname = ''
        path.extname = '.html'
      })
    )
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      })
    )
    .pipe(dest(destPath))
    .pipe(server.stream())
}
