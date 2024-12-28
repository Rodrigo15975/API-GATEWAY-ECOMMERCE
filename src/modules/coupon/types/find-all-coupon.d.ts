interface FindAllCoupon {
  id: number
  code: string
  createdAt: string
  discount: number
  espiryDate: string
  isGlobal: false
  isNew: true
  products: {
    id: number
    product: string
  } | null
  updatedAt: string
  isExpiredDate?: boolean
}
