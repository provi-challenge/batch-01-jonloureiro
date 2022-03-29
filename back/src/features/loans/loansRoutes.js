import Router from 'express-promise-router';

import { sendError } from '../../utils/sendError.js';
import { sendData } from '../../utils/sendData.js';
import { Courses } from '../courses/Courses.js';
import { Customers } from '../customers/Customers.js';
import { generateOffers } from './helpers/generateOffer.js';
import { toSign } from '../../utils/signAndVerify.js';

const CUSTOMER_ID = 'customerId';
const COURSES_ID = 'coursesId';
const POSSIBLE_ENTRY_VALUES = [0.1, 0.2, 0.3];

export const loansRoutes = (() => {
  const router = Router();

  router.get(
    `/customers/:${CUSTOMER_ID}/courses/:${COURSES_ID}/loans`,
    async (req, res) => {
      const customerId = req.params[CUSTOMER_ID];
      const coursesId = req.params[COURSES_ID];
      const { entry } = req.query;

      if (
        !customerId ||
        !Number.isInteger(+customerId) ||
        !coursesId ||
        !Number.isInteger(+coursesId) ||
        !entry ||
        !POSSIBLE_ENTRY_VALUES.includes(+entry)
      ) {
        sendError(res, { status: 'Bad Request' }, 400);
        return;
      }

      const [customer, course] = await Promise.all([
        Customers.get(customerId),
        Courses.get(coursesId),
      ]);

      if (!customer || !course) {
        const field = !customer ? CUSTOMER_ID : COURSES_ID;
        sendError(res, { status: 'Not Found', field, type: 'notFound' }, 404);
        return;
      }

      const { cpf: customerCpf } = customer;
      const { price: coursePrice } = course;

      const offers = generateOffers(customerCpf, coursePrice, +entry);
      const offersBuffer = Buffer.from(JSON.stringify(offers)).toString(
        'base64'
      );
      const signature = toSign(offersBuffer);

      sendData(res, offers, { signature: `${offersBuffer}.${signature}` });
    }
  );

  return router;
})();
