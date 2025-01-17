const enum PATTERNAME {
  PRODUCTS_GET_ALL_READ = 'products.get.all.read',
  PRODUCTS_GET_ONE = 'products.get.one.read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameRead: MessagePattern = {
  PRODUCTS_GET_ALL_READ: PATTERNAME.PRODUCTS_GET_ALL_READ,
  PRODUCTS_GET_ONE: PATTERNAME.PRODUCTS_GET_ONE,
}

export const { PRODUCTS_GET_ALL_READ, PRODUCTS_GET_ONE } = patterNameRead
