const enum PATTERNAME {
  USER_CREATE = 'user.create',
  USER_UPDATE = 'user.update',
  USER_REMOVE = 'user.remove',
  USER_GET_ONE = 'user.get.one',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameWrite: MessagePattern = {
  USER_CREATE: PATTERNAME.USER_CREATE,
  USER_UPDATE: PATTERNAME.USER_UPDATE,
  USER_REMOVE: PATTERNAME.USER_REMOVE,
  USER_GET_ONE: PATTERNAME.USER_GET_ONE,
}

export const { USER_CREATE, USER_UPDATE, USER_REMOVE, USER_GET_ONE } =
  patternNameWrite
