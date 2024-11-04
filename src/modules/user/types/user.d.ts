type User = {
  _id: string
  avatar: string | null

  dni: string
  lastname: string
  name: string
  password: string
  phone: string
  user_active: boolean
  roleId: number

  role: {
    id: number
    role: string
  }
  createdAt: string | Date
  updatedAt: string | Date
}
