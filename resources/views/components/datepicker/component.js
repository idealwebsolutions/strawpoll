const flatpickr = require('flatpickr')
const spacetime = require('spacetime')
const timezones = require('timezones.json')

module.exports = class {
  async onCreate (input, out) {
    const date = spacetime.now()
    // Attempt to get locale
    const locale = spacetime(date, date.tz)
    
    this.state = {
      date: locale.epoch,
      timezone: ''
    }
    this.timezones = timezones
    this.fp = null
  }

  async _createFlatpickr (el) {
    if (!el) {
      throw new Error('flatpickr was not mounted')
    }

    this.fp = flatpickr(el, {
      enableTime: true,
      altInput: true,
      time_24hr: true,
      minuteIncrement: 1,
      wrap: true,
      defaultDate: flatpickr.parseDate(this.state.date, 'Y-m-d h:i K'),
      onChange: (selectedDates, dateStr) => {
        this.state.date = dateStr
        this.emit('dateSelected', spacetime(this.state.date).epoch)
      }
    })
    
    this.fp.set('minDate', flatpickr.parseDate(this.state.date, 'Y-m-d h:i K')) 
    this.fp.set('maxDate', flatpickr.parseDate(spacetime(this.state.date).add(1, 'month').epoch, 'Y-m-d h:i K'))
  }

  async onMount () {
    const fpe = this.getEl('flatpickr')
    
    if (fpe) {
      this._createFlatpickr(fpe)
    }
    
    console.log('mount from datepicker')
  }

  async onUpdate () {
    const fpe = this.getEl('flatpickr')
    
    if (this.fp && fpe) {
      this.fp.redraw()
    }

    console.log('update from datepicker')
  }

  async onDestroy () {
    if (this.fp) {
      this.fp.destroy()
    }

    console.log('destroy from datepicker')
  }

  async _onSelectTimezone () {
  }
}
