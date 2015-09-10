'use strict'


function capitalize(str) {
  return str.replace(/^([a-z])/, function(m, chr) {
    return chr.toUpperCase()
  })
}

module.exports = capitalize
