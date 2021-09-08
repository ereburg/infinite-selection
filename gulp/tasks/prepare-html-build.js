import fs from 'fs'
import pkg from 'gulp'
import cheerio from 'gulp-cheerio'

const { src, dest } = pkg

export const prepareHtmlBuild = () => {
  // Исходные данные
  const metaImages = fs.readdirSync(`${$.conf.src}/${$.conf.pathAssets}/${$.conf.pathPreviews}`) // изображения
  const templates = fs.readdirSync(`${$.conf.app}/${$.conf.pathHTML}/${$.conf.htmlPages}`) // шаблоны страниц

  const html = [] // Массив генерируемых элементов
  const pages = {} // Объект, содержащий информацию о всех страницах

  // Наполняем объект Pages информацией из meta-изображений
  for (const meta of metaImages) {
    if (meta === '.gitkeep' || meta === '.DS_Store') continue

    // Получаем имя шаблона/страницы
    const pageName = meta.substring(meta.indexOf('_') + 1, meta.lastIndexOf('.'))

    // Создаем объект с названием страницы и присваиваем ему изображение
    pages[pageName] = {}
    pages[pageName].image = meta
  }

  // Наполняем объект Pages информацией из шаблонов
  for (const template of templates) {
    if (template === 'index' || template === '.DS_Store') continue

    // Получаем имя шаблона/страницы
    const pageName = template.substring(0, template.lastIndexOf('.'))
    // Получаем доступ к локальному файлу текущей страницы
    const file = fs.readFileSync(`${$.conf.app}/${$.conf.pathHTML}/${$.conf.htmlPages}/${pageName}.hbs`).toString()

    // Проверяем, существует ли данная страница
    if (pages[pageName] === undefined) pages[pageName] = {}
    // Получаем заголовок страницы
    if (file.indexOf('{{!') !== -1) {
      pages[pageName].title = file.substring(3, file.indexOf('}}'))
    }

    // Получаем данные готовой страницы
    const hbs = fs.readFileSync(`${$.conf.outputPath}/${$.conf.htmlPages}/${pageName}.html`).toString()

    // Если заголовка в странице нет, то заменяем его на полученный из шаблона
    if (hbs.indexOf(`<title></title>`) !== -1) {
      fs.writeFileSync(
        `${$.conf.outputPath}/${$.conf.htmlPages}/${pageName}.html`,
        hbs.replace(/<title>(.*)/, '<title>' + pages[pageName] + '</title>')
      )
    }

    const imgSrc = `./${$.conf.pathAssets}/${$.conf.pathPreviews}/${pages[pageName].image ?? '1000_default.svg'}`
    const linkClass = pages[pageName].image === undefined ? 't-main__link t-main__link--default' : 't-main__link'

    // Генерируем данные в наш массив со страницами
    html.push(`
        <li class='t-main__item'>
          <article class='t-main__article'>
            <h2 class='t-main__title'>${pages[pageName].title}</h2>
            <a
              class='${linkClass}'
              href='./${$.conf.htmlPages}/${pageName}.html'
              title='${pages[pageName].title}'
              aria-label='Link to ${pages[pageName].title} page.'
            >
              <img
                src='${imgSrc}'
                alt='Preview image for ${pages[pageName].title}.'
                loading='lazy'
              />
            </a>
          </article>
        </li>`)
  }

  // Сортируем полученный массив элементов в соответствии с порядком, заданным в мета-изображениях
  html.sort((a, b) => {
    const pathLength = $.conf.pathPreviews.length + 1
    let tempA = a.substring(a.lastIndexOf(`${$.conf.pathPreviews}/`) + pathLength, a.lastIndexOf('_'))
    let tempB = b.substring(b.lastIndexOf(`${$.conf.pathPreviews}/`) + pathLength, b.lastIndexOf('_'))

    tempA.charAt(0) === '0' ? (tempA = tempA.slice(1)) : tempA
    tempB.charAt(0) === '0' ? (tempB = tempB.slice(1)) : tempB

    return Number(tempA) - Number(tempB)
  })

  const sourceTemplate = fs.readFileSync($.conf.pathTemplateBuild).toString()
  // Получаем время сборки
  const date = new Date()
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timezone: 'Europe/Moscow',
    hour: 'numeric',
    minute: 'numeric',
  }

  // Подставляем полученные данные и генерируем билд
  fs.writeFileSync(
    `${$.conf.outputPath}/index.html`,
    sourceTemplate
      .replace('{{items}}', `${html.join('')}`)
      .replace(/{{siteName}}/g, $.conf.siteName)
      .replace('{{buildDate}}', new Intl.DateTimeFormat('ru', options).format(date))
  )

  const startPath = `${$.conf.outputPath}/${$.conf.htmlPages}/**/*.html`
  const destPath = `${$.conf.outputPath}/${$.conf.htmlPages}/`

  return src(startPath)
    .pipe(
      cheerio({
        run: (jQuery) => {
          jQuery('script').each(function () {
            let src = jQuery(this).attr('src')

            if (src !== undefined && src.substr(0, 5) !== 'http:' && src.substr(0, 6) !== 'https:')
              src = `../${$.conf.pathJS}/${src}`

            jQuery(this).attr('src', src)
          })
          jQuery('a').each(function () {
            let href = jQuery(this).attr('href')

            if (
              !href ||
              href.substr(0, 1) === '#' ||
              href.substr(0, 4) !== 'tel:' ||
              href.substr(0, 4) !== 'ftp:' ||
              href.substr(0, 5) !== 'file:' ||
              href.substr(0, 5) !== 'http:' ||
              href.substr(0, 6) !== 'https:' ||
              href.substr(0, 7) !== 'mailto:'
            )
              return

            if (href.substr(0, 6) === `/${$.conf.htmlPages}/`) {
              href = href.substr(6)
            }

            let newHref = '/' + (href[0] === '/' ? href.substr(1) : href)
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
