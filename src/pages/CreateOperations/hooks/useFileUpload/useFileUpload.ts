import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS } from '@uiKit/wrappers/FileUploaderWrapper/constants/defaultOptions'

import { LS_ACCESS_TOKEN } from '@rtkApi/core/constants'
import { DocumentViewDto } from '@rtkApi/modules/__generated__/financial'
import {
  PostFinancialDocumentsByDocumentTypeApiArg,
  usePostFinancialDocumentsByDocumentTypeMutation,
} from '@rtkApi/modules/custom/financial'

import * as T from './useFileUpload.types'

export const useFileUpload = ({ currentFile }: T.UseFileUploadParams) => {
  const [apiDocument, setApiDocument] =
    useState<T.OperationDocumentData | null>(null)

  const [apiUploadDocument] = usePostFinancialDocumentsByDocumentTypeMutation()

  const handleWatchApiDocument = useCallback(
    (data: T.OperationDocumentData) => {
      setApiDocument(data)
    },
    [],
  )

  const handleOpenFileInNewTab = useCallback(async () => {
    if (!apiDocument) return

    try {
      const {
        info: { documentType, fileName },
      } = apiDocument

      const config: AxiosRequestConfig<unknown> = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
        },
        responseType: 'blob',
      }

      const { data } = await axios.get(
        `${$BACK_DOMAIN$}/financial/documents/files/download/${documentType!}/${fileName!}`,
        config,
      )

      let openAsType = data.type

      const fileExtension = fileName?.split('.').pop()

      if (fileExtension) {
        const types = Object.keys(
          DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS.accept,
        ) as (keyof typeof DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS.accept)[]

        types.forEach((type) => {
          const extensions = DEFAULT_ACCEPT_FILE_FORMAT_OPTIONS.accept[type]

          if (extensions.includes(`.${fileExtension}`)) {
            if (type.includes('*')) {
              openAsType = `${type.split('/')[0]}/${fileExtension}`
            } else {
              openAsType = type
            }
          }
        })
      }

      const url = window.URL.createObjectURL(
        new Blob([data], { type: openAsType }),
      )
      window.open(url, '_blank', '')
      window.URL.revokeObjectURL(url)
    } catch (e) {
      toast.error('Ошибка чтения файла.')
    }
  }, [apiDocument])

  const isApiDocument = apiDocument && currentFile === apiDocument?.file

  const handleUploadDocument = useCallback(
    async (
      arg: PostFinancialDocumentsByDocumentTypeApiArg,
    ): Promise<DocumentViewDto> => {
      if (isApiDocument && apiDocument) {
        return apiDocument.info
      }

      const fileUploadData = await apiUploadDocument(arg).unwrap()

      return fileUploadData
    },
    [apiUploadDocument, apiDocument, isApiDocument],
  )

  return {
    handleWatchApiDocument,
    isApiDocument,
    handleUploadDocument,
    handleOpenFileInNewTab,
  }
}
