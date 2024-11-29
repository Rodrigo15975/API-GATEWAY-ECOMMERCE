const enum PATTERNAME {
  PRODUCTS_GET_ALL_READ = 'products.get.all.read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameRead: MessagePattern = {
  PRODUCTS_GET_ALL_READ: PATTERNAME.PRODUCTS_GET_ALL_READ,
}

export const { PRODUCTS_GET_ALL_READ } = patterNameRead
