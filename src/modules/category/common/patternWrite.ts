const enum PATTERNAME {
  CATEGORY_CREATE = 'category.create',
  CATEGORY_CREATE_MANY = 'category.create.many',
  CATEGORY_CREATE_DISCOUNT = 'category.create.discount',

  CATEGORY_UPDATE = 'category.update',
  CATEGORY_UPDATE_DISCOUNT = 'category.update.discount',

  CATEGORY_DELETE = 'category.delete',
  CATEGORY_DELETE_DISCOUNT = 'category.delete.discount',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameWrite: MessagePattern = {
  CATEGORY_CREATE: PATTERNAME.CATEGORY_CREATE,
  CATEGORY_UPDATE_DISCOUNT: PATTERNAME.CATEGORY_UPDATE_DISCOUNT,
  CATEGORY_CREATE_MANY: PATTERNAME.CATEGORY_CREATE_MANY,
  CATEGORY_UPDATE: PATTERNAME.CATEGORY_UPDATE,
  CATEGORY_DELETE: PATTERNAME.CATEGORY_DELETE,
  CATEGORY_DELETE_DISCOUNT: PATTERNAME.CATEGORY_DELETE_DISCOUNT,
  CATEGORY_CREATE_DISCOUNT: PATTERNAME.CATEGORY_CREATE_DISCOUNT,
}

export const {
  CATEGORY_DELETE_DISCOUNT,
  CATEGORY_CREATE_DISCOUNT,
  CATEGORY_UPDATE_DISCOUNT,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_CREATE_MANY,
} = patterNameWrite
