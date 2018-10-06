const debounce = require('debounce');

module.exports = class {
  async onCreate (input, out) {
    this.state = {
      loading: false
    };
  }
};
