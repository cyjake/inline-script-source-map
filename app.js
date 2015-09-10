'use strict'

var koa = require('koa')
var oceanify = require('oceanify')
var serve = require('koa-static')

var PORT = 4000


var app = koa()

app.use(oceanify())
app.use(serve('public'))
app.use(serve('views'))
app.use(serve('.'))


if (!module.parent) {
  app.listen(PORT, function() {
    console.log('Server started at %s', PORT)
  })
}

