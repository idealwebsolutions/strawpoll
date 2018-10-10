const md = require('markdown-it')()

module.exports = class {
  async onCreate (input, out) {
    this.content = md.render(input.content)
  }

  async doUpvote (event) {
    
  }
}
