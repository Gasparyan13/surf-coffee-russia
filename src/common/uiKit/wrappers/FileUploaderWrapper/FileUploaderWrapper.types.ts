import { DropzoneOptions } from 'react-dropzone'

export type Props = React.PropsWithChildren & {
  useDefaultOptions?: boolean
  useDefaultFormats?: boolean
  uploadOptions?: DropzoneOptions
  testId?: string
}
