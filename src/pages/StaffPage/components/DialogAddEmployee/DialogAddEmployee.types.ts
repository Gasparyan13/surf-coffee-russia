export type Props = {
  isOpenCreateEmployee: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  onRefetch: (arg: { enterpriseId?: number }) => void
}

export type AddEmployeeForm = {
  firstAndLastName: string
  email: string
  payRate: string
  jobTitle: string
  spot: string
}
