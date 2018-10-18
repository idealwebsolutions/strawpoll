const { post } = require('axios')

// TODO: multiple field should change to checkbox instead of radio
module.exports = class {
  async onCreate (input, out) {
    this.state = {
      error: '',
      selected: -1,
      disabled: false,
      submitted: false
    }
    
    this.hash = input.poll.hash
    this.choices = input.poll.choices
  }

  async onMount () {
    this.state.disabled = true
    
    // this.on('captcharesponse', this._onCaptcha)
  }

  async onDestroy () {
    // this.removeListener('captcharesponse')
  }
  
  async _onChange (event) {
    event.preventDefault()
    
    this.state.selected = this.choices.findIndex(
      (element) => element === event.target.value
    )
    this.state.disabled = false
  }

  async _onCaptchaResponse (response) {
    console.log(response)
    this._onFinish(response)
  }

  async _onSubmit (event) {
    event.preventDefault()
    this._onFinish()
  }

  async _onFinish (captchaResponse = null) {
    this.state.disabled = true
    
    const submission = {
      choice: this.choices[this.state.selected],
      _csrf: document.querySelector('meta[name="session"]').getAttribute('content')
    }

    if (captchaResponse) {
      Object.assign(submission, {
        'g-recaptcha-response': captchaResponse
      })
    }

    let response

    try {
      response = await post(`/${this.hash}`, submission)
    } catch (err) {
      return console.error(err)
    }

    console.log(response.data)
  }
}
