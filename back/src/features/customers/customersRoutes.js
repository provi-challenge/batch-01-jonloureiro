import Router from 'express-promise-router';

import { sendError } from '../../utils/sendError.js';
import { sendData } from '../../utils/sendData.js';
import { createCustomer } from './helpers/createCustomer.js';
import { Customers } from './Customers.js';

export const customersRoutes = (() => {
  const router = Router();

  router.post('/', async (req, res) => {
    const { error, ...customer } = await createCustomer(req.body);

    if (error) {
      const { field, type } = error;
      sendError(res, { status: 'Bad Request', field, type }, 400);
      return;
    }

    sendData(res, await Customers.post(customer), { status: 'Created' }, 201);
  });

  return router;
})();
