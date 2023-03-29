import { OperationDefinition } from '@rtk-query/codegen-openapi/lib/types'

export const makeOutputFiles = (names: string[]) =>
  names?.reduce(
    (acc, name) => ({
      ...acc,
      [`../modules/__generated__/${name}.ts`]: {
        filterEndpoints: (
          _: unknown,
          operationDefinition: OperationDefinition,
        ) => operationDefinition.path.startsWith(`/${name}`),
      },
    }),
    {},
  )
