'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  CT_API_URL: '"https://api.cuza.fun/codecat"',
  CT_WEB_URL: '"http://localhost:8081"',
  CT_RESOURCE_URL: '"http://localhost:8080"'
})
