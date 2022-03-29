import Router from 'express-promise-router';

import { sendData } from '../../utils/sendData.js';
import { sendError } from '../../utils/sendError.js';
import { PaymentMethods } from './PaymentMethods.js';

export const paymentMethodsRoutes = (() => {
  const router = Router();

  router.get('/payment-methods', async (req, res) =>
    sendData(res, await PaymentMethods.get())
  );

  router.get('/payment-methods/:id', async (req, res) => {
    const { params } = req;

    if (Number.isNaN(+params.id)) {
      return sendError(res, { status: 'Bad Request' }, 400);
    }

    return sendData(res, await PaymentMethods.get(params.id));
  });

  return router;
})();
