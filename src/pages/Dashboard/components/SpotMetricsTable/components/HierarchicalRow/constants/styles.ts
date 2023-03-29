import { theme } from '@common/providers/ThemeProvider/theme'

export const borderColorByLevel: Record<number, string> = {
  0: theme.colors.asphaltLight,
  1: theme.colors.asphaltSuperLight,
  2: 'none',
}
