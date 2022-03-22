import Router from 'express-promise-router';

import { sendError } from '../../utils/sendError.js';
// import { Customers } from './Customers.js';

export const customersRoutes = (() => {
  const router = Router();

  router.post('/', async (req, res) => {
    // await Customers.post()
    sendError(res, { status: 'Not Implemented' }, 501);
  });

  return router;
})();
