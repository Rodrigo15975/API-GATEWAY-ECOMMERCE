interface FindAllCategory {
  id: number
  category: string
  createdAt: string
  discountRules: [
    {
      id: number
      categoryId: number
      discount: number
      start_date: string
      end_date: string
      is_active: boolean
      createdAt: string
      updatedAt: string
    },
  ]
}
