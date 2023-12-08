export enum ErrorCodes {

  NO_ERROR=1000,
  GENERAL_ERROR=2000,
  BAD_REQUEST=1006,

  USER_ACCOUNT_NOT_FOUND=3011,
  DATABASE_ERROR=3012,
  NO_TRANSACTIONS_FOUND=3013,

  USER_NOT_FOUND=4001,
  USER_NOT_CONFIRMED=4002,
  USER_DISABLED=4003,
  USER_EXISTS=4004,
  INVALID_PASSWORD_FORMAT=4005,
  CODE_DELIVERY_FAILED=4006,
  INVALID_PARAMETER_ERROR=4007,
  TOO_MANY_REQUEST=4008,
  COGNITO_INTERNAL_ERROR=4010,
  PASSWORD_RESET_REQUIRED=4011,
  COGNITO_INVALID_CONFIGURATION=4012,
  MFA_NOT_FOUND=4013,
  ALIAS_EXISTS_ERROR=4014,
  CODE_NOT_FOUND=4015,
  CODE_EXPIRED_ERROR=4016,
  FORBIDEN_EXCEPTION=4017,
  LIMIT_EXCEDED_ERROR=4018,
  EXPIRED_TOKEN=4019,
  JWT_ERROR=4020,
  NOT_BEFORE_ERROR_TOKEN=4021,
  NON_ACTIVE_USER=4022,
  TOKEN_NOT_FOUND=4023,
  INVALID_LOGIN_DATA=4024,
  INVALID_API_KEY=4025,
  RESOURCE_NOT_FOUND=40126,
}

export const HttpErrorMessage = {
  200:"Request Success",
  201:"Created resource",
  202:"Request Accepted",
  204:"Request with not content",
  301:"Resource moved permanently",
  302:"Resource Found",
  304:"Request with not modifications",
  400:"Consultation error, please verify the information sended",
  401:"He has no authorization to use this resource, please contact the administrator",
  403:"He has no authorization to use this resource, please contact the administrator",
  404:"The requested resource is not found, please verify the info sent",
  405:"The request of the request is not accepted, please verify",
  408:"Sorry!, we cannot process your request at this time, please try again later",
  409:"There are conflicts with the requested resource, please verify",
  410:"The requested URL does not exist, please verify",
  422:"The application cannot be processed, please verify or contact the administrator",
  500:"Sorry!, we cannot process your request at this time, please try again later",
  502:"Sorry!, we cannot process your request at this time, please try again later",
  503:"Sorry!, we cannot process your request at this time, please try again later",
  504:"Sorry!, we cannot process your request at this time, please try again later",
};

export enum HttpErrorCode {
  OK=200,
  CREATED=201,
  ACCEPTED=202,
  NO_CONTENT=204,
  MOVED_PERMANENTLY=301,
  FOUND=302,
  NOT_MODIFIED=304,
  BAD_REQUEST=400,
  UNAUTHORIZED=401,
  FORBIDDEN=403,
  NOT_FOUND=404,
  METHOD_NOT_ALLOWED=405,
  CONFLICT=409,
  UNPROCESSABLE_ENTITY=422,
  INTERNAL_SERVER_ERROR=500,
  BAD_GATEWAY=502,
  SERVICE_UNAVAILABLE=503,

  ECONNABORTED=504,
  // ECONNREFUSED=503,
  // ECONNRESET=502,
  ENOTFOUND=410,
  // ETIMEDOUT=504
}

export enum FlowsEnum {
  HELLO='hello',
  ACCOUNT='account',
  AUTHENTICATION='authentication',
  PATIENT='patient',
  ONBOARDING='register',
  TRANSACTION='transaction',
  OPERATIONS='operation'
}

export enum SystemError {
  AUTHENTICATIONERROR='AutenticationError',
  DATABASEERROR='DatabaseError',
  GENERALERROR='GeneralError',
  VALIDATIONERROR='ValidationError',
  NOTFOUNDERROR='NotFoundError',
  HTTPERROR='HttpError',
}

const ErrorMessages={

  1000: 'no errors',
  1006: 'bad request',
  2000: 'general error',

  3011: 'user account not found',
  3012: 'database error',

  4001: 'user not found',
  4002: 'user not confirmed',
  4003: 'user is disabled or no active',
  4004: 'user exists',
  4005: 'invalid password format',
  4006: 'code delivery error',
  4007: 'invalid parameter error',
  4008: 'too many requests',
  4009: 'cognito internal error',
  4010: 'internal error',
  4011: 'password reset required',
  4012: 'cognito invalid configuration',
  4013: 'mfa not found',
  4014: 'alias exists',
  4015: 'otp code not found',
  4016: 'otp code expired',
  4017: 'not authorized',
  4018: 'limit exceded',
  4019: 'expired token',
  4020: 'error general con token',
  4021: 'jwt not active',
  4022: 'non active user or already activate',
  4023: 'token not found',
  4024: 'Invalid login data, please verify your credentials and try again',
  4025: 'Invalid API key, please verify',
  4026: 'resource not found',
}

export default ErrorMessages