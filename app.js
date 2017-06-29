const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderButtons(item) {
    const buttons = document.createElement('div')
    buttons.className += "small button-group"
    item.appendChild(buttons)

    const upButton = document.createElement('button')
    upButton.className += "button"
    upButton.textContent = 'UP'
    buttons.appendChild(upButton)

    const downButton = document.createElement('button')
    downButton.className += "button"
    downButton.textContent = 'DOWN'
    buttons.appendChild(downButton)

    const favButton = document.createElement('button')
    favButton.className += "warning button"
    favButton.textContent = 'FAVORITE'
    buttons.appendChild(favButton)

    const delButton = document.createElement('button')
    delButton.className += "alert button"
    delButton.textContent = 'DELETE'
    buttons.appendChild(delButton)

    return buttons
  },

  renderListItem(flick) {
    const item = document.createElement('div')

    const flickItem = document.createElement('li')
    flickItem.textContent = flick.name
    item.appendChild(flickItem)

    this.renderButtons(item)

    return item
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)

    this.flicks.push(flick.name)

    this.max ++
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
})