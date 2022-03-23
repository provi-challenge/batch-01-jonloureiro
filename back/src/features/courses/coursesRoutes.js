import Router from 'express-promise-router';

import { sendData } from '../../utils/sendData.js';
import { sendError } from '../../utils/sendError.js';
import { Courses } from './Courses.js';

export const coursesRoutes = (() => {
  const router = Router();

  router.get('/', async (req, res) => sendData(res, await Courses.get()));

  router.get('/:id', async (req, res) => {
    const { params } = req;

    if (Number.isNaN(+params.id)) {
      return sendError(res, { status: 'Bad Request' }, 400);
    }

    return sendData(res, await Courses.get(params.id));
  });

  return router;
})();
