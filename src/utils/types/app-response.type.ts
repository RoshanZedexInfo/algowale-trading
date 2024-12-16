export type errorResponse = {
  status: boolean;
  statusCode: number;
  path?: string;
  isValidationError?: boolean;
  message: string;
  error?: any;
  trace?: any;
};

export type successResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: any;
};
