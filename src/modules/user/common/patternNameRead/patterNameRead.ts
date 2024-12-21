const enum PATTERNAME {
  USER_FIND_ALL_READ = 'user.find.all.read',
  USER_FIND_ONE_READ = 'user.find.one.read',
  // USER_FIND_ONE_PROFILE_READ = 'user.find.one.read',
}

type MessagePattern = {
  [K in keyof typeof PATTERNAME]: (typeof PATTERNAME)[K]
}

const patternNameRead: MessagePattern = {
  USER_FIND_ALL_READ: PATTERNAME.USER_FIND_ALL_READ,
  // USER_FIND_ONE_PROFILE_READ: PATTERNAME.USER_FIND_ONE_PROFILE_READ,
  USER_FIND_ONE_READ: PATTERNAME.USER_FIND_ONE_READ,
}

export const {
  USER_FIND_ALL_READ,
  USER_FIND_ONE_READ,
  // USER_FIND_ONE_PROFILE_READ,
} = patternNameRead
