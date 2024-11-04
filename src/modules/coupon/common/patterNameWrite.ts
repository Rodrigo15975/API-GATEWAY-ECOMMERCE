const enum PATTERNAME {
  COUPON_CREATE = 'coupon.create',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameWrite: MessagePattern = {
  COUPON_CREATE: PATTERNAME.COUPON_CREATE,
}

export const { COUPON_CREATE } = patternNameWrite
