import { Nullable } from '@common/types/Nullable'

export type Props = React.PropsWithChildren & {
  onClose: React.MouseEventHandler<HTMLDivElement>
  open: boolean
  title: string
  anchorEl?: Nullable<Element>
}
