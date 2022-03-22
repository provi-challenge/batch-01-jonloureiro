export const sendError = (res, options, statusCode) =>
  res.status(!Number.isNaN(+statusCode) ? +statusCode : 500).json({
    error: true,
    status: 'Internal Error',
    ...options,
  });
