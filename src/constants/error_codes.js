import { BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT } from 'http-status'

export const errorCodes = {
  INVALID_USER_EMAIL: {
    code: 'invalid_user_email',
    status: FORBIDDEN
  },
  UNAUTHORIZED_REQUEST: {
    code: 'unauthorized',
    status: UNAUTHORIZED
  },
  RUNTIME_ERROR: {
    code: 400,
    status: BAD_REQUEST
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    status: NOT_FOUND
  },
  RESOURCE_CONFLICT: {
    code: 409,
    status: CONFLICT
  },
  RESOURCE_FORBIDDEN: {
    code: 'access_forbidden',
    status: FORBIDDEN
  },
  INVALID_REQUEST: {
    code: 'Invalid Request',
    status: BAD_REQUEST
  }
}
