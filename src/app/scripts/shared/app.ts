export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    // Add class to header on scroll
    const header = document.querySelector('.js-header')

    window.addEventListener('scroll', () => {
      const y: number = window.scrollY

      y > 1 ? header.classList.add('scroll') : header.classList.remove('scroll')
    })

    // Search

    // Фильтрация по ключевым словам в поиске
    const inputSearch: HTMLInputElement = document.querySelector('.search-input')
    const wrapper = document.querySelector('.sneakers-browse-container')
    const browseItem = document.querySelectorAll('.browse-item')

    function Check() {
      let counter = 0
      const p = document.createElement('p')
      p.classList.add('added')
      p.textContent = `We tried hard and couldn't find anything...  But you can hire Eugene, if you like his work :)`

      browseItem.forEach((e) => {
        if (e.hasAttribute('hidden')) {
          counter++
        }
      })

      const newEl = document.querySelector('.added')

      if (counter < browseItem.length && wrapper.contains(newEl)) {
        newEl.remove()
      } else if (counter >= browseItem.length && !wrapper.contains(newEl)) {
        wrapper.append(p)
      }
    }

    inputSearch &&
      inputSearch.addEventListener('keyup', () => {
        const filter = inputSearch.value.trim().toUpperCase()

        for (let i = 0; i < browseItem.length; i++) {
          const browseItemTitle: HTMLElement = browseItem[i].querySelector('.releases-title')
          const browseItemTitleText = browseItemTitle.textContent || browseItemTitle.innerText
          const checkBrowseItem = browseItemTitleText.trim().toUpperCase().indexOf(filter) > -1

          if (checkBrowseItem) {
            browseItem[i].removeAttribute('hidden')
            Check()
          } else {
            browseItem[i].setAttribute('hidden', '')
            Check()
          }
        }
      })
  })
}
