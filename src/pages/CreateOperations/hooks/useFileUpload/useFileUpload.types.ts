import { Nullable } from '@common/types/Nullable'

import { DocumentViewDto } from '@rtkApi/modules/__generated__/financial'

export type OperationDocumentData = {
  file: File
  info: DocumentViewDto
}

export type UseFileUploadParams = {
  currentFile: Nullable<File>
}
