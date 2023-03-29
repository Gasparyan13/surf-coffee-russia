import { yup } from '../../../../../../app/core'
import { Nullable } from '../../../../../../common/types/Nullable'
import { DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS } from '../../../../../../common/uiKit/wrappers/FileUploaderWrapper/constants/defaultOptions'
import { ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD } from '../../../../constants/messages/error'

export const createSchema = (
  name: string,
  errorMessage = ERROR_MESSAGE_EMPTY_DOCUMENT_FIELD,
  fileFormats = DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS.accept,
) => ({
  [name]: yup
    .mixed()
    .test(
      'type',
      errorMessage,
      (value: Nullable<File>) =>
        !!value &&
        Object.keys(fileFormats).some((formats) =>
          fileFormats[formats as keyof typeof fileFormats].some((format) =>
            value.type.includes(format.replace('.', '')),
          ),
        ),
    ),
})
