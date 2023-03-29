export type Props = React.PropsWithChildren & {
  title: string
  open: boolean
  onClose: () => void
  onAdd: () => void
  disabled?: boolean
  isEdit?: boolean
}
