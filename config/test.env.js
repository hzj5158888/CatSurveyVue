'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  CT_API_URL: '"https://4d88dcbf.r18.cpolar.top"',
  CT_WEB_URL: '"http://localhost:8081"',
  CT_RESOURCE_URL: '"http://localhost:8080"'
})
