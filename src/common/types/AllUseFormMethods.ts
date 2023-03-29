import { FieldValues, UseFormReturn } from 'react-hook-form'

export type AllUseFormMethods<Form extends FieldValues> = UseFormReturn<
  Form,
  object
>
