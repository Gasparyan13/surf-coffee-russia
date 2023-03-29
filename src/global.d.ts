import { StringSchema as StringSchemaBase } from 'yup'

declare module '*.json' {
  const value: unknown
  export default value
}

declare module 'yup' {
  interface StringSchema {
    sameLanguageFirstLastName(message?: string): StringSchemaBase
  }
}

export {}
