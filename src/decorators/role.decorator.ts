import { SetMetadata } from '@nestjs/common'

export const ROLES = 'roles'
export const RolesDefault = (roles: Array<keyof KeyRoles>) =>
  SetMetadata(ROLES, roles)

type KeyRoles = {
  DEV: 'DEV'
  ADMIN: 'ADMIN'
  EMPLOYEE: 'EMPLOYEE'
}

const ROLESDEFAULT: KeyRoles = {
  ADMIN: 'ADMIN',
  DEV: 'DEV',
  EMPLOYEE: 'EMPLOYEE',
}

export const { ADMIN, DEV, EMPLOYEE } = ROLESDEFAULT
