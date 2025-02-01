import { CreatePaymentDto } from '../dto/create-payment.dto'

export const gettingDataformatRight = (data: CreatePaymentDto[]) => {
  if (data) {
    const dataCorrect = data.map(
      ({
        product,
        brand,
        quantity_buy,
        category,
        discount,
        price,
        gender,
        productVariant,
        size,
        id,
        description,
      }) => ({
        product,
        brand,
        quantity_buy,
        category,
        discount,
        price,
        gender,
        productVariant,
        size,
        id,
        description,
      }),
    )
    return dataCorrect
  }
}
