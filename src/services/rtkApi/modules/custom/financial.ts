import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import { emptySplitApi as api } from '../../core/emptyApi'
import {
  DocumentViewDto,
  PostFinancialDocumentsFilesUploadByDocumentTypeApiArg,
} from '../__generated__/financial'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postFinancialDocumentsByDocumentType: build.mutation<
      PostFinancialDocumentsByDocumentTypeApiResponse,
      PostFinancialDocumentsByDocumentTypeApiArg
    >({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData()
        formData.append('document', _arg.document)

        const postDocResult = await fetchWithBQ({
          url: `/financial/documents/files/upload/${_arg.documentType}`,
          method: 'POST',
          body: formData,
          responseHandler: 'text',
        })

        if (postDocResult.data) {
          const data = await fetchWithBQ({
            url: '/financial/documents/',
            method: 'POST',
            body: {
              fileName: postDocResult.data,
              documentType: _arg.documentType,
            },
          })

          if (data.data) {
            return { data: data.data as DocumentViewDto }
          }
          return { error: data.error as FetchBaseQueryError }
        }

        return { error: postDocResult.error as FetchBaseQueryError }
      },
    }),
  }),
})
export { injectedRtkApi as api }
export type PostFinancialDocumentsByDocumentTypeApiResponse =
  /** status 200 Файл сохранен. */ DocumentViewDto
export type PostFinancialDocumentsByDocumentTypeApiArg = {
  /** тип документа из перечисления */
  documentType: PostFinancialDocumentsFilesUploadByDocumentTypeApiArg['documentType']
  document: File
}

export const { usePostFinancialDocumentsByDocumentTypeMutation } =
  injectedRtkApi
