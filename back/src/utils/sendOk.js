export const sendOk = (res, options) =>
  res.json({
    error: false,
    status: 'OK',
    ...options,
  });
