export const sendOk = (res, options, statusCode) =>
  res.status(!Number.isNaN(+statusCode) ? +statusCode : 200).json({
    error: false,
    status: 'OK',
    ...options,
  });
