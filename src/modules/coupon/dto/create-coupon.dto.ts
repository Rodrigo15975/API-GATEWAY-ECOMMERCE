export class CreateCouponDto {
  product: string
  code: string
  discount: number
  espiryDate: Date
  isGlobal: boolean
  isNew: boolean
}
