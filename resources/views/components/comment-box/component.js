const md = require('markdown-it')({ breaks: true })
const emoji = require('markdown-it-emoji/light')

module.exports = class {
  async onCreate (input, out) {
    this.state = {
      content: '',
      rendered: '',
      preview: false,
      submitted: false
    }

    md.use(emoji)
  }

  async _onInput (event) {
    console.log(event)
    this.state.content = event.target.value
  }

  async _onRenderPreview () {
    this.state.preview = !this.state.preview
    this.state.rendered = md.render(this.state.content)
  }
}
