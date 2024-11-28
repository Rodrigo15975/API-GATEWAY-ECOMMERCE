import { catchError, TimeoutError } from 'rxjs'
import { ErrorHandlerService } from './error-handler.service'

export const handleObservableError = (serviceName: string) => {
  return catchError((error: any) => {
    if (error instanceof TimeoutError)
      throw ErrorHandlerService.handleTimeoutError(error, serviceName)
    throw ErrorHandlerService.handleError(error, serviceName)
  })
}
