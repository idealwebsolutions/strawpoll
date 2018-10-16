const { merge } = require('../../../../lib/util')

module.exports = class {
  async onCreate (input, out) {
    this.state = {
      results: input.choices.map(
        (choice) => ({ name: choice, votes: 0 })
      )
    }
    this.queue = []
    this.chart = null
  }

  async onMount () {
    this.on('ready', this._onReady)

    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(this._onLoad.bind(this))
  }
  
  async onDestroy () {
    this.removeListener('initial')
    this.removeListener('vote')
    this.removeListener('draw')
  }

  async _onReady () {
    this.on('vote', this._onVote)
    this.on('initial', this._onInitialResults)
    this.on('draw', this._onDraw)
  }

  async _onLoad () {
    this.chart = new google.visualization.PieChart(this.getEl('chart-container'))
    // Iterate queue and push events
    while(this.queue.length > 0) {
      const item = this.queue.shift()
      this.emit(item.action, item.data)
    }
  }

  async _onVote (vote) {
    console.log('updating')

    if (!this.chart) {
      this.queue.push({
        action: 'vote',
        data: vote
      })
      console.log('pushed vote event to queue')
      return
    }

    Object.assign(this.state, {
      results: this.state.results.map(
        (result) => {
          if (result.name === vote.name) {
            return merge(result, {
              name: vote.name,
              votes: ++result.votes
            }) 
          }
          
          return result
        }
      )
    })

    this.emit('draw')
  }

  async _onInitialResults (results) {
    console.log('initial')

    if (!this.chart) {
      this.queue.push({ 
        action: 'initial',
        data: results
      })
      console.log('pushed initial event to queue')
      return
    }

    Object.assign(this.state, {
      results: this.state.results.map((result) => {
        const target = results.find((r) => r.name === result.name)
        return target && (result.votes !== target.votes) ? merge(result, target) : result
      })
    })

    this.emit('draw')
  }

  async _onDraw () {
    if (!this.chart) {
      return
    }

    const tableData = [['Choice', 'Votes']]
    this.state.results.forEach((result) => tableData.push([result.name, result.votes]))
    this.chart.draw(new google.visualization.arrayToDataTable(tableData), {
      legend: 'none',
      backgroundColor: 'transparent'
    })
  }
}
