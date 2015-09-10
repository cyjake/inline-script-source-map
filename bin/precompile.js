#!/usr/bin/env node --harmony

'use strict'

var co = require('co')
var path = require('path')
var fs = require('fs')
var oceanify = require('oceanify')


function readFile(fpath, encoding) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fpath, encoding, function(err, content) {
      if (err) reject(err)
      else resolve(content)
    })
  })
}

function writeFile(fpath, content) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(fpath, content, function(err) {
      if (err) reject(err)
      else resolve()
    })
  })
}


co(function* () {
  var dependenciesMap = yield oceanify.parseMap()
  var result = yield oceanify.compileComponent('main', {
    dependenciesMap: dependenciesMap
  })
  var page = yield readFile(path.join(__dirname, '../views/index.html'), 'utf-8')

  var lines = [
    result.js,
    '//# sourceURL=main.js',
    '//# sourceMappingURL=./main.js.map'
  ]

  var parts = page.split('<script src="/main.js"></script>')

  lines.unshift(parts[0] + '<script data-main="main">')
  lines.push('</script>' + parts[1])

  var dest = path.join(__dirname, '../public')

  yield [
    writeFile(path.join(dest, 'index.html'), lines.join('\n')),
    writeFile(path.join(dest, 'main.js.map'), result.map)
  ]
})
  .then(function() {
    console.log('done')
  })
  .catch(function(err) {
    console.error(err.stack)
  })
