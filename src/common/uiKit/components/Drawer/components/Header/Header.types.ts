export type HeaderButtonProps = {
  onClick?: () => void
}

export type Props = {
  title: string
  date?: string
  closeButtonProps?: HeaderButtonProps
  backButtonProps?: HeaderButtonProps
}
