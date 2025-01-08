interface FindAllOnlyCouponsClients {
  id: string
  userIdGoogle: string

  coupon: Coupon
}

type Coupon = {
  id: string
  startDate: string
  espiryDate: string
  code: string
  expired: boolean
}

interface FindOneClient {
  id: string
  userIdGoogle: string
  emailGoogle: string
  nameGoogle: string

  coupon: Coupon
}
