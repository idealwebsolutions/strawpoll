module.exports = class {
  async onCreate (input, out) {
    this.state = {
      page: ''
    }
  }

  async onMount () {
    this.state.page = window.location.pathname === '/' ? `${window.location.origin}/user/dashboard` : window.location.href
  }
}
