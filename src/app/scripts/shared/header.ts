export const Header = (): void => {
  const header = document.querySelector('.js-header')

  if (header) {
    // Если произошел скролл, то шапке добавляется класс
    window.addEventListener('scroll', () => {
      const y: number = window.scrollY

      y > 1 ? header.classList.add('scroll') : header.classList.remove('scroll')
    })

    // Оживляем кнопку мобильного меню
    const btnMobile = document.querySelector('.js-mobile-menu')
    btnMobile.addEventListener('click', (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.js-mobile-menu')) {
        header.classList.toggle('opened')
      }
    })

    // Header search
    const btnOpenSearch = document.querySelector('.js-header-search__open')
    const headerSearch = document.querySelector('.js-header-search')
    const headerInputSearch = document.querySelector('.js-header-search__input')
    const btnCloseSearch = document.querySelector('.js-header-search__close')
    const headerSearchResult = document.querySelector('.js-header-search__results')
    btnOpenSearch.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('.js-header-search__open')) {
        headerSearch.classList.add('open')
      }
    })
    btnCloseSearch.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('.js-header-search__close')) {
        headerSearch.classList.remove('open')
      }
    })
    headerInputSearch.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('.js-header-search__input')) {
        headerSearchResult.classList.add('visible')
      }
    })
  }
}
