import { isBefore, parseISO } from 'date-fns'

export const expiredDateVerification = (expirationDate: string): boolean =>
  isBefore(parseISO(expirationDate), new Date())
