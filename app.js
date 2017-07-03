const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = listItem.classList.toggle('fav')
  },

  removeFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  },

  moveFlickUp(flick, ev) {
    const listItem = ev.target.closest('.flick')
    this.list.insertBefore(listItem, listItem.previousElementSibling)

    const i = this.flicks.indexOf(flick)
    this.flicks[i] = [this.flicks[i-1], this.flicks[i-1] = this.flicks[i]][0]
  },

  moveFlickDown(flick, ev) {
    const listItem = ev.target.closest('.flick')
    this.list.insertBefore(listItem.nextElementSibling, listItem)

    const i = this.flicks.indexOf(flick)
    this.flicks[i] = [this.flicks[i+1], this.flicks[i+1] = this.flicks[i]][0]
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener(
        'click',
        this.removeFlick.bind(this,flick)
      )

    item
      .querySelector('button.fav')
      .addEventListener(
        'click',
        this.favFlick.bind(this, flick)
      )
    
    item
      .querySelector('button.up')
      .addEventListener(
        'click',
        this.moveFlickUp.bind(this, flick)
      )
    
    item
      .querySelector('button.down')
      .addEventListener(
        'click',
        this.moveFlickDown.bind(this, flick)
      )

    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
      fav: false,
    }

    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    this.flicks.unshift(flick)

    this.max ++
    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template'
})