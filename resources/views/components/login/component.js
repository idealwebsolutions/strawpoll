module.exports = class {
  async onCreate (input, out) {
    this.state = {
      active: false
    }
  }

  async _onActivate (event) {
    event.preventDefault()

    this.state.active = true
  }

  async _onClose (event) {
    event.preventDefault()

    this.state.active = false
  }
}
