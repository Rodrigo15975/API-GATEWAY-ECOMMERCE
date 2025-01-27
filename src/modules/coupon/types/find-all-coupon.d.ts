interface FindAllCoupon {
  id: number
  code: string
  createdAt: string
  discount: number
  espiryDate: string
  isGlobal: boolean
  isNew: boolean
  products: {
    id: number
    product: string
  } | null
  updatedAt: string
  isExpiredDate?: boolean
}
