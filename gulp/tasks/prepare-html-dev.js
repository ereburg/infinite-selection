import fs from 'fs'
import pkg from 'gulp'
import cheerio from 'gulp-cheerio'

const { src, dest } = pkg

export const prepareHtmlDev = () => {
  const templates = fs.readdirSync(`${$.conf.app}/${$.conf.pathHTML}/pages`)
  const html = []
  const pages = {}

  for (const template of templates) {
    if (template === 'index' || template === '.DS_Store') continue

    const pageName = template.substring(0, template.lastIndexOf('.'))
    const file = fs.readFileSync(`${$.conf.app}/${$.conf.pathHTML}/${$.conf.htmlPages}/${pageName}.hbs`).toString()

    if (pages[pageName] === undefined) pages[pageName] = {}

    file.indexOf('{{!') !== -1
      ? (pages[pageName].title = file.substring(3, file.indexOf('}}')))
      : (pages[pageName].title = pageName.split('-').join(' '))

    html.push(`<li><a href='${pageName}.html'>${pages[pageName].title}</a></li>`)
  }

  const templateFile = fs.readFileSync($.conf.pathTemplateDev).toString()

  fs.writeFileSync(
    `${$.conf.outputPath}/${$.conf.htmlPages}/index.html`,
    templateFile.replace('{{items}}', `${html.join('')}`).replace(/{{siteName}}/g, $.conf.siteName)
  )

  const startPath = `${$.conf.outputPath}/${$.conf.htmlPages}/**/*.html`
  const destPath = `${$.conf.outputPath}/${$.conf.htmlPages}/`

  return src(startPath)
    .pipe(
      cheerio({
        run: (jQuery) => {
          jQuery('script').each(() => {
            let src = jQuery(this).attr('src')

            if (src !== undefined && src.substr(0, 5) !== 'http:' && src.substr(0, 6) !== 'https:')
              src = `../${$.conf.pathJS}/${src}`

            jQuery(this).attr('src', src)
          })
          jQuery('a').each(function () {
            const href = jQuery(this).attr('href')

            if (
              !href ||
              href.substr(0, 1) === '#' ||
              href.substr(0, 4) === 'tel:' ||
              href.substr(0, 4) === 'ftp:' ||
              href.substr(0, 5) === 'file:' ||
              href.substr(0, 5) === 'http:' ||
              href.substr(0, 6) === 'https:' ||
              href.substr(0, 7) === 'mailto:'
            )
              return

            if (href.substr(0, 6) === `/${$.conf.htmlPages}/`) return

            let newHref = `/${$.conf.htmlPages}/${href[0] === '/' ? href.substr(1) : href}`

            if (newHref.substr(-5) !== '.html') {
              newHref = newHref + '.html'
            }

            jQuery(this).attr('href', newHref)
          })
        },
        parserOptions: { decodeEntities: false },
      })
    )
    .pipe(dest(destPath))
}
