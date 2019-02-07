const store = require('browser-store');
const bulmaTagsInput = require('bulma-tagsinput');

const {
  MAX_CHOICES_LIMIT,
  MAX_TAGS_INPUTS,
  VALID_QUESTION_SEQUENCE,
  VALID_CHOICE_SEQUENCE
} = require('../../../../lib/constants')

const { isValidSequence } = require('../../../../lib/util')

module.exports = class {
  async onCreate (input, out) {    
    this.state = {
      error: null,
      token: '',
      question: '',
      choices: ['', '', ''],
      tags: [],
      expiry: '',
      useExpiration: false,
      multiple: false,
      private: false,
      protect: false,
      disabled: false,
      submitted: false,
    }

    if (input.field && input.error) {
      this.state.error = {
        field: input.field,
        reason: input.error.trim()
      }
    }
    
    this.tagsInstance = null
  }

  async onMount () {
    this.tagsInstance = new bulmaTagsInput('#tags', {
      duplicates: false
    })
    this.tagsInstance.element.addEventListener('change', this._onTagsInput.bind(this))

    this.on('validate-form', this._onValidate)
    this.on('save-draft', this._onSave)
    this.on('trash-draft', this._onTrash)
    
    // TODO: use await
    store.get('draft', (err, draft) => {
      if (err) {
        return console.error(err)
      }

      if (draft) {
        Object.assign(this.state, {
          question: draft.question,
          choices: draft.choices,
          multiple: draft.multiple,
          private: draft.private,
          protect: draft.protect
        })
      }

      this.emit('validate-form')
    })

    console.log('mount from create-poll component')
  }

  async onUpdate () {
    if (!this.state.disabled){
      this.emit('save-draft')
    }
     
    console.log('update from create-poll component')
  }

  async onDestroy () {
    console.log('called on destroy')
    this.reset()
    this.tagsInstance.destroy()
    
    const datepicker = this.getComponent('datepicker')
    
    this.removeListener('validate-form')
    this.removeListener('save-draft')
    this.removeListener('trash-draft')
  }

  reset (event) {
    console.log('resetting')

    if (event) {
      event.preventDefault()
      this.emit('trash-draft')
    }

    this.resetTags()
    
    Object.assign(this.state, {
      question: '',
      choices: ['', '', ''],
      tags: [],
      expiry: '',
      multiple: false,
      protect: false,
      private: false,
      error: '',
      disabled: true,
      submitted: false,
    })
  }
  
  async onDateSelected (date) {
    console.log(`date: ${date}`)
    
    Object.assign(this.state, {
      expiry: date
    })
  }

  setQuestion (event) {
    Object.assign(this.state, {
      question: event.target.value
    })

    this.emit('validate-form')
  }

  setOrAppendChoice (last, index, event) {
    if ((this.state.choices.length < MAX_CHOICES_LIMIT) 
      && last && event.target.value.length > 1) {
        this.state.choices[index] = event.target.value
        Object.assign(this.state, {
          choices: this.state.choices.concat('')
        })
        this.forceUpdate()
        return this.emit('validate-form')
    }
    
    this.state.choices[index] = event.target.value  
    this.forceUpdate()
    this.emit('validate-form')
  }

  validateQuestion () {
    return isValidSequence(VALID_QUESTION_SEQUENCE, this.state.question) && this.state.question.length >= 2
  }

  validateChoice (index) {
    if (index < 0 || index > this.state.choices.length) {
      return false
    }

    return isValidSequence(VALID_CHOICE_SEQUENCE, this.state.choices[index])
  }

  resetTags () {
    if (!this.tagsInstance) {
      throw new Error('resetTags: No instance available')
    }

    this.tagsInstance.reset()
    this.tagsInstance.container.querySelectorAll('.control')
      .forEach((el) => el.remove())
    this.tagsInstance.setInputWidth()
  }

  async _onTagsInput () {
    const tags = this.tagsInstance.getValue().split(',')

    if (tags.length > MAX_TAGS_INPUTS) {
      tags.pop()
      this.resetTags()
      this.tagsInstance.addTag(tags)
      return
    }
    
    this.state.tags = tags
  }

  async _onSave () {
    console.log('triggered save')
    
    if (!this.state.question.length) {
      return
    }

    if (this.state.submitted) {
      return
    }

    store.put('draft', {
      question: this.state.question,
      choices: this.state.choices,
      multiple: this.state.multiple,
      private: this.state.private,
      protect: this.state.protect
    }, (err) => {
      if (err) { 
        console.error(err)
      }
    })
  }

  async _onValidate () {
    Object.assign(this.state, {
      disabled: !this.validateQuestion() || !(this.state.choices.filter(
        choice => isValidSequence(VALID_CHOICE_SEQUENCE, choice)
      ).length >= 2)
    })
  }

  async _onTrash () {
    store.remove('draft')
  }

  toggleMultiple () {
    Object.assign(this.state, {
      multiple: !this.state.multiple
    })
  }

  togglePrivate () {
    Object.assign(this.state, {
      private: !this.state.private
    })
  }

  toggleProtect () {
    Object.assign(this.state, {
      protect: !this.state.protect
    })
  }

  toggleExpires () {
    Object.assign(this.state, {
      useExpiration: !this.state.useExpiration
    })
  }

  async submit (event) {
    event.preventDefault()
    
    this.state.token = document.querySelector('meta[name="session"]').getAttribute('content')
    this.emit('trash-draft')
    
    Object.assign(this.state, {
      submitted: true
    })

    this.el.submit()
  }
}
