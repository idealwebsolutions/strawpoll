const { parseJSON } = require('../../../../../../lib/util')

module.exports = class {
  async onCreate (input, out) {
    this.hash = input.poll.hash
    this.eventSource = null
  }
  
  async onMount () {
    this.on('reroute', this._onMessageReroute)

    this.eventSource = new EventSource(`/live/${this.hash}`) 
    this.eventSource.addEventListener('open', () => this.getComponent('results').emit('ready'))
    this.eventSource.addEventListener('error', (err) => console.error(err))
    this.eventSource.addEventListener('pollresults', (results) => this.emit('reroute', 'results', 'initial', results))
    this.eventSource.addEventListener('uservote', (vote) => this.emit('reroute', 'results', 'vote', vote))
  }

  async onDestroy () {
    this.removeListener('reroute')
    this.eventSource.close()
    this.eventSource = null
  }

  async _onMessageReroute (child, event, message) {
    let parsed

    try {
      parsed = await parseJSON(message.data)
    } catch (err) {
      return console.error(err)
    }
    
    this.getComponent(child).emit(event, parsed)
  }
}
