const enum PATTERNAME {
  ROLE_CREATE = 'role.create',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameWrite: MessagePattern = {
  ROLE_CREATE: PATTERNAME.ROLE_CREATE,
}

export const { ROLE_CREATE } = patternNameWrite
