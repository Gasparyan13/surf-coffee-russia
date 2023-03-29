/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `./env/.local.env` })

const express = require('express')
const axios = require('axios')
const { exec } = require('child_process')

const app = express()

const makeCamelCase = (string) =>
  string
    .split('/')
    .map((el) => el.split('_'))
    .flat()
    .map((el) => el.split('-'))
    .flat()
    .reduce(
      (acc, el, i) =>
        `${acc}${i === 0 ? el : el.charAt(0).toUpperCase() + el.slice(1)}`,
      '',
    )

app.get('/', async function (_, res) {
  const { data: json } = await axios.get(
    `${process.env.BACK_DOMAIN}/v3/api-docs`,
  )

  const paths = Object.entries(json.paths).reduce((acc, [path, obj]) => {
    const newObj = Object.entries(obj).reduce((reqAcc, [reqType, reqObj]) => {
      const newReqObj = {
        ...reqObj,
        operationId: `${reqType || 'get'}${makeCamelCase(path)}`,
      }
      return { ...reqAcc, [reqType]: newReqObj }
    }, {})

    return { ...acc, [path]: newObj }
  }, {})

  const newJson = { ...json, paths }

  res.json(newJson)
})

app.listen(3010)

const proc = exec(
  'npx @rtk-query/codegen-openapi ./src/services/rtkApi/core/openApiConfig.ts',
  (error, stdout) => {
    console.log(stdout)
    if (error !== null) {
      console.log(`exec error: ${error}`)
    }
    proc.kill()
    process.exit(0)
  },
)
