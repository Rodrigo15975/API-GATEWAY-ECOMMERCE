interface FindAllOnlyCouponsClients {
  id: string
  userIdGoogle: string

  coupon: {
    id: string
    startDate: string
    espiryDate: string
    code: string
  }
}
