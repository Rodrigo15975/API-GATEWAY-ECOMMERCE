const enum PATTERNAME {
  ROLE_GET_ALL = 'role.find.all-read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameRead: MessagePattern = {
  ROLE_GET_ALL: PATTERNAME.ROLE_GET_ALL,
}
export const { ROLE_GET_ALL } = patternNameRead
