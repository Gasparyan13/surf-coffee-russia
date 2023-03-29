import { AvatarProps } from '@mui/material/Avatar'

import { AddCSSprop } from '../../../types/Generics'

export type Props = AddCSSprop<AvatarProps> & {
  color?: 'primary' | 'error'
}
