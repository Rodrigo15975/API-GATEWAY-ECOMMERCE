const enum PATTERNAME {
  COUPON_CREATE = 'coupon.create',
  COUPON_REMOVE = 'coupon.remove',
  COUPON_GET_ALL_READ = 'coupon.get.all.read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameWrite: MessagePattern = {
  COUPON_CREATE: PATTERNAME.COUPON_CREATE,
  COUPON_REMOVE: PATTERNAME.COUPON_REMOVE,
  COUPON_GET_ALL_READ: PATTERNAME.COUPON_GET_ALL_READ,
}

export const { COUPON_CREATE, COUPON_REMOVE, COUPON_GET_ALL_READ } =
  patternNameWrite
