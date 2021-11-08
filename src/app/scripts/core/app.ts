import { Header } from '@app/shared/header'
import { Search } from '@app/widgets/search'

export const app = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    Header()
    Search()
  })
}
