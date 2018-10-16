module.exports = class {
  async onCreate (input, out) {
    this.state = {
      voted: false,
      editing: false
    }
  }
}
