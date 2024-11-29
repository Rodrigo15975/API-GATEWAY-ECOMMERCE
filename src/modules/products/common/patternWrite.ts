const enum PATTERNAME {
  PRODUCTS_CREATE = 'products.create',
  PRODUCTS_REMOVE = 'products.remove',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameWrite: MessagePattern = {
  PRODUCTS_CREATE: PATTERNAME.PRODUCTS_CREATE,
  PRODUCTS_REMOVE: PATTERNAME.PRODUCTS_REMOVE,
}

export const { PRODUCTS_CREATE, PRODUCTS_REMOVE } = patterNameWrite
