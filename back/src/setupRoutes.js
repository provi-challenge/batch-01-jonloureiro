import Router from 'express-promise-router';

import { coursesRoutes } from './features/courses/coursesRoutes.js';
import { customersRoutes } from './features/customers/customersRoutes.js';
import { loansRoutes } from './features/loans/loansRoutes.js';
import { paymentMethodsRoutes } from './features/paymentMethods/paymentMethodsRoutes.js';
import { sendOk } from './utils/sendOk.js';

const router = Router();

export const setupRoutes = app => {
  router.get('/', async (req, res) => sendOk(res));
  app.use(router);
  app.use(coursesRoutes);
  app.use(customersRoutes);
  app.use(loansRoutes);
  app.use(paymentMethodsRoutes);
};
