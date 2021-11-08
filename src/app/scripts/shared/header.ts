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
  }
}
