import Router from 'express-promise-router';
import { Courses } from './Courses.js';

const router = Router();

const sendOk = (res, options) =>
  res.json({
    error: false,
    status: 'OK',
    ...options,
  });

const sendData = (res, data) => sendOk(res, { data });

export const setupRoutes = app => {
  app.use(router);
  router.get('/', async (req, res) => {
    return res.json({ error: false, status: 'OK' });
  });
  router.get('/courses', async (req, res) => {
    return sendData(res, await Courses.get());
  });
  router.get('/courses/:id', async (req, res) => {
    const { params } = req;
    return sendData(res, await Courses.get(params.id));
  });
};
