import { Nullable } from '../../../../../types/Nullable'

export const getFileName = (file: Nullable<File>) => file?.name || ''
