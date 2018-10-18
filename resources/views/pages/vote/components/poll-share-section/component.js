const ClipboardJS = require('clipboard/dist/clipboard.min')

module.exports = class {
  async onCreate () {
    this.state = {
      path: null
    }
    this.clipboard = null
  }

  async onMount () {
    const clipboardBtn = this.getEl('copy')
    this.state.path = window.location.href

    if (!clipboardBtn) {
      return
    }
    
    this.clipboard = new ClipboardJS(clipboardBtn)
  }

  async onDestroy () {
    if (this.clipboard) {
      this.clipboard.destroy()
    }
  }
}
