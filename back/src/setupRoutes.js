import Router from 'express-promise-router';

import { coursesRoutes } from './features/courses/coursesRoutes.js';
import { customersRoutes } from './features/customers/customersRoutes.js';
import { sendOk } from './utils/sendOk.js';

const router = Router();

export const setupRoutes = app => {
  router.get('/', async (req, res) => sendOk(res));
  app.use(router);
  app.use('/courses', coursesRoutes);
  app.use('/customers', customersRoutes);
};
