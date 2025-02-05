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
        productVariant, // Este es un array
        size,
        id,
        description,
      }) => {
        const flattenedProductVariant = Array.isArray(productVariant)
          ? productVariant.flat()
          : []

        const formattedProductVariant = flattenedProductVariant.map(
          (variant) => ({
            color: variant.color,
            url: variant.url,
          }),
        )

        return {
          product,
          brand,
          quantity_buy,
          category,
          discount,
          price,
          gender,
          productVariant: formattedProductVariant, // Array de objetos con `color` y `url`
          size,
          id,
          description,
        }
      },
    )

    return dataCorrect
  }
}
