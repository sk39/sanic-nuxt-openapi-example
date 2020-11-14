'use strict'

process.on('uncaughtException', (err) => {
  throw err
})

require('colors')
const path = require('path')
const { run } = require('runjs')
const fs = require('fs-extra')
const cwd = process.cwd()

const destDir = path.resolve(cwd, 'api/generate')
const configPath = path.resolve(cwd, 'scripts/api/swag-ts-conf.json')
const openApiPath = path.resolve(cwd, '../docs/openapi.v1.yaml')

fs.removeSync(destDir)

if (!fs.existsSync(openApiPath)) {
  console.error(`OpenAPISpec does not exist. path = ${openApiPath}`.red)
  process.exit(1)
}

run(`npx openapi-generator-cli generate -i ${openApiPath} -g typescript-fetch -o ${destDir} -c ${configPath} --skip-validate-spec`)
console.log('Generate api code succeeded.'.green)

