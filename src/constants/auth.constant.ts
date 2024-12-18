export const EMAILNOTFOUND = 'Email not found';
export const INCORRECTPASSWORD = 'Incorrect password';
export const NOT_ALLOWED = 'You are not allowed to access this resource.';
export const NOT_ALLOWED_ROLE = (role: string) =>
  `${NOT_ALLOWED} Role required: ${role}`;

// Execptions
export const TOKEN_EXPIRED = {
  slug: 'TokenExpiredError',
  message: 'Token Expired',
};
export const INVALID_TOKEN = {
  slug: 'JsonWebTokenError',
  message: 'Invalid Token',
};
export const UNAUTHORIZED = {
  slug: 'Unauthorized',
  message: 'Unauthorized',
};
