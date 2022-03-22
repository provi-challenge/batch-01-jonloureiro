export const sendError = (res, options, statusCode) =>
  res.json(
    {
      error: true,
      status: 'Internal Error',
      ...options,
    },
    !Number.isNaN(+statusCode) ? +statusCode : 500
  );
