type ProductVariantDtoRead = {
  color: string
  url: string

  key_url?: string
}

type ProductInventoryDtoRead = {
  minStock: number
  stock: boolean
}

interface ProductFindAll {
  id: number

  product: string

  productVariant: ProductVariantDtoRead[]

  price: number

  size: string[]

  gender: string

  brand: string

  description: string

  quantity: number

  total_sold: number

  is_new: boolean

  categoryId: number

  category: {
    id: number
    category: string
  }

  discount: number

  productInventory: ProductInventoryDtoRead
}
