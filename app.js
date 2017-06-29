const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderButton(buttonWrap, buttonType, buttonText) {
    const button = document.createElement('input')
    button.type = 'button'
    button.className += "button "
    button.className += buttonType
    button.value = buttonText
    buttonWrap.appendChild(button)
  },

  renderListItem(flick) {
    const item = document.createElement('div')
    item.className += "input-group"

    const flickItem = document.createElement('li')
    flickItem.textContent = flick.name
    flickItem.className += "input-group-label"
    item.appendChild(flickItem)

    const buttonWrap = document.createElement('div')
    buttonWrap.className += "input-group-button"
    item.appendChild(buttonWrap)

    this.renderButton(buttonWrap, "", "UP")
    this.renderButton(buttonWrap, "", "DOWN")
    this.renderButton(buttonWrap, "warning", "FAVORITE")
    this.renderButton(buttonWrap, "alert", "DELETE")

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