import type { ConfigFile } from '@rtk-query/codegen-openapi'

import { CONTROLLER_GROUPS } from './constants'
import { makeOutputFiles } from './makeOutputFiles'

const config: ConfigFile = {
  schemaFile: 'http://localhost:3010',
  apiFile: './emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFiles: makeOutputFiles(CONTROLLER_GROUPS),
  exportName: 'api',
  hooks: { queries: true, lazyQueries: true, mutations: true },
}

export default config
