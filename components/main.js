'use strict'

var $ = require('yen')
var capitalize = require('./lib/capitalize')


setTimeout(function() {
  var h1 = $('h1')
  h1.html(capitalize(h1.html()))
}, 2000)
