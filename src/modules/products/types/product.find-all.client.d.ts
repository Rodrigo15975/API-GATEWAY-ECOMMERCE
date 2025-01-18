interface ProductFindAllClient {
  id: number
  brand: string
  category: {
    id: number
    category: string
  }
  createdAt: string
  description: string
  discount: number
  gender: string
  is_new: true
  price: number
  product: string
  productVariant: [
    {
      id: number
      color: string
      url: string
      key_url: string
    },
  ]
  quantity: number
  size: string[]
}
