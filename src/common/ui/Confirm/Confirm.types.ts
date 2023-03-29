export type Props = React.PropsWithChildren & {
  text: string
  onSuccess?: () => void
  onCancel?: () => void
}
