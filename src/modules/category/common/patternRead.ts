const enum PATTERNAME {
  CATEGORY_FIND_ALL_READ = 'category.find.all.read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patterNameWrite: MessagePattern = {
  CATEGORY_FIND_ALL_READ: PATTERNAME.CATEGORY_FIND_ALL_READ,
}

export const { CATEGORY_FIND_ALL_READ } = patterNameWrite
