const { post } = require('axios')

module.exports = class {
  async onCreate (input, out) {
    this.state = {
      active: false,
      page: ''
    }
  }

  async onMount () {
    this.state.page = window.location.pathname === '/' ? `${window.location.origin}/user/dashboard` : window.location.href
  }

  async _onToggle (event) {
    event.preventDefault()

    this.state.active = !this.state.active
  }

  async _onLogout (event) {
    const token = document.querySelector('meta[name="session"]').getAttribute('content')
    let response
    
    try {
      response = await post(`${window.location.origin}/user/logout`, {
        _csrf: token
      })
    } catch (err) {
      return console.error(err)
    }

    console.log(response.data)

    if (response.data.hasOwnProperty('redirect')) {
      window.location = response.data.redirect
    }
  }
}
