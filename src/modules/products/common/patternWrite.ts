const enum PATTERNAME {
  PRODUCTS_CREATE = 'products.create',
  PRODUCTS_CREATE_SIZE = 'products.create.size',
  PRODUCTS_CREATE_ONE_VARIANT = 'products.create.one.variant',
  PRODUCTS_REMOVE = 'products.remove',
  PRODUCTS_REMOVE_SIZE = 'products.remove.size',
  PRODUCTS_REMOVE_URL = 'products.remove.url',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameWrite: MessagePattern = {
  PRODUCTS_CREATE: PATTERNAME.PRODUCTS_CREATE,
  PRODUCTS_REMOVE: PATTERNAME.PRODUCTS_REMOVE,
  PRODUCTS_REMOVE_URL: PATTERNAME.PRODUCTS_REMOVE_URL,
  PRODUCTS_CREATE_ONE_VARIANT: PATTERNAME.PRODUCTS_CREATE_ONE_VARIANT,
  PRODUCTS_REMOVE_SIZE: PATTERNAME.PRODUCTS_REMOVE_SIZE,
  PRODUCTS_CREATE_SIZE: PATTERNAME.PRODUCTS_CREATE_SIZE,
}

export const {
  PRODUCTS_CREATE,
  PRODUCTS_CREATE_SIZE,
  PRODUCTS_REMOVE_SIZE,
  PRODUCTS_REMOVE,
  PRODUCTS_REMOVE_URL,
  PRODUCTS_CREATE_ONE_VARIANT,
} = patterNameWrite
