const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.handleSubmit.bind(this))
  
    this.load()
  },

  save() {
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
  },

  load() {
    const flicksJSON = localStorage.getItem('flicks')
    const flicksArray = JSON.parse(flicksJSON)

    if (flicksArray) {
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
  },

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    this.list.insertBefore(listItem, this.list.firstElementChild)

    this.flicks.unshift(flick)

    this.fadeButtons()

    if (flick.id > this.max) {
      this.max = flick.id
    }
    this.save()
  },

  blurOnEnter(item,ev){
    if (ev.key === 'Enter') {
      item.querySelector('.flick-name').blur()
    }
  },

  editFlick(flick,item,ev) {
    console.log(ev.target)
    console.log(item.querySelector('.flick-name'))
    ev.target.contentEditable = true
    ev.target.focus()

    ev.target
      .addEventListener(
        'keypress',
        this.blurOnEnter.bind(this, item)
      )

    ev.target
      .addEventListener(
        'blur',
        function(){
          ev.target.contentEditable = false
          flick.name = ev.target.textContent
        }
      )

    this.save()
  },

  favFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    flick.fav = listItem.classList.toggle('fav')

    this.save()
  },

  removeFlick(flick, ev) {
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)

    if (this.flicks.length>0) {
      this.fadeButtons()
    }

    this.save()
  },

  moveFlickUp(flick, ev) {
    const i = this.flicks.indexOf(flick)

    if (i>0) {
      const listItem = ev.target.closest('.flick')
      this.list.insertBefore(listItem, listItem.previousElementSibling)

      this.flicks[i] = [this.flicks[i-1], this.flicks[i-1] = this.flicks[i]][0]
      
      this.save()
    }

    this.fadeButtons()

    
  },

  moveFlickDown(flick, ev) {
    const i = this.flicks.indexOf(flick)

    if (i<this.flicks.length-1) {
      const listItem = ev.target.closest('.flick')
      this.list.insertBefore(listItem.nextElementSibling, listItem)

      this.flicks[i] = [this.flicks[i+1], this.flicks[i+1] = this.flicks[i]][0]
    
      this.save()
    }

    this.fadeButtons()

    this.save()
  },

  fadeButtons() {
    upButtonList = document.querySelectorAll('.up')
    upButtonList.forEach(
      function(currentValue) {
        currentValue.classList.remove('disabled')
        }
    )
    upButtonList[0].classList.add('disabled')

    downButtonList = document.querySelectorAll('.down')
    downButtonList.forEach(
      function(currentValue, currentIndex) {
        currentValue.classList.remove('disabled')
      }
    )
    downButtonList[downButtonList.length-2].classList.add('disabled')
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    if(flick.fav) {
      item.classList.add('fav')
    }

    item
      .querySelector('.flick-name')
      .textContent = flick.name
    
    item
      .querySelector('.flick-name')
      .addEventListener(
        'dblclick',
        this.editFlick.bind(this,flick,item)
      )

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

    this.addFlick(flick)

    f.reset()
  },
}

app.init({
  formSelector: 'form#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template'
})