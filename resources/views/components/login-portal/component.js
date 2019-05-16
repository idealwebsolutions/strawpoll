import { post } from 'axios'
// import axios from 'axios'

module.exports = class {
  async _onLogout (event) {
    const token = document.querySelector('meta[name="session"]').getAttribute('content')
    let response
    
    try {
      response = await axios.post(`${window.location.origin}/user/logout`, {
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
