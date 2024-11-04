const enum PATTERNAME {
  PRODUCTS_CREATE = 'products.create',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameWrite: MessagePattern = {
  PRODUCTS_CREATE: PATTERNAME.PRODUCTS_CREATE,
}

export const { PRODUCTS_CREATE } = patterNameWrite
