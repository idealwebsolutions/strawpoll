module.exports = class {
  async onMount () {
    window.onCaptchaResponse = this.onResponse.bind(this)
  }

  async onResponse (response) {
    this.emit('captcharesponse', response)
  }
}
