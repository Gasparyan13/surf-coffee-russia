import { yup } from '@app/core'

export const defaultValues = {
  allDayStart: '07:00',
  allDayEnd: '22:00',
  weekEndStart: '09:00',
  weekEndEnd: '22:30',
  workDayStart: '07:00',
  workDayEnd: '22:30',
  projectName: '',
}
export const schema = yup.object().shape({
  allDayStart: yup.string().required(' '),
  allDayEnd: yup.string().required(''),
  projectName: yup.string().required('Нет названия спота'),
})
