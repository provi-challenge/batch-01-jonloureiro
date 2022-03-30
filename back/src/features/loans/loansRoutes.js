import Router from 'express-promise-router';

import { sendError } from '../../utils/sendError.js';
import { sendData } from '../../utils/sendData.js';
import { Courses } from '../courses/Courses.js';
import { Customers } from '../customers/Customers.js';
import { generateOffers } from './helpers/generateOffer.js';
import { toSign } from '../../utils/signAndVerify.js';
import { createLoan } from './helpers/createLoan.js';
import { PaymentMethods } from '../paymentMethods/PaymentMethods.js';
import { Loans } from './Loans.js';

const CUSTOMER_ID = 'customerId';
const COURSES_ID = 'coursesId';
const POSSIBLE_ENTRY_VALUES = [0.1, 0.2, 0.3];

export const loansRoutes = (() => {
  const router = Router();

  router.post('/loans', async (req, res) => {
    const { body } = req;

    const { error, ...loan } = await createLoan(body);

    if (error) {
      const { field, type } = error;
      sendError(res, { status: 'Bad Request', field, type }, 400);
      return;
    }

    const [trustedOfferDataBase64] = loan.signature.split('.');
    const trustedOfferData = JSON.parse(
      Buffer.from(trustedOfferDataBase64, 'base64').toString()
    );
    const offer = trustedOfferData.find(
      item => item.number === loan.loan_number
    );

    if (!offer) {
      sendError(
        res,
        { status: 'Bad Request', field: 'entry', type: 'not found' },
        400
      );
      return;
    }

    const [paymentMethod, course, customer] = await Promise.all([
      PaymentMethods.get(loan.payment.payment_method_id),
      Courses.get(loan.course_id),
      Customers.get(loan.customer_id),
    ]);

    const loanData = {
      courseId: loan.course_id,
      customerId: loan.customer_id,
      entryInPercentage: parseInt(+offer.entry * 100, 10),
      coursePriceOnLoanDate: +course.price,
      installment: offer.installment,
      installmentValue: parseInt(
        offer.installmentValue - offer.installmentDiscount,
        10
      ),
    };

    /*
     *  Realizar pagamento utilizando a API de uma plataforma de pagamento
     */
    const simulateBody = {
      payment_method: paymentMethod.method,
      value: course.price * offer.entry,
      card_cvv: loan.payment.card_cvv,
      card_expiration_date: loan.payment.card_expiration_date,
      card_number: loan.payment.card_number,
      card_holder_name: loan.payment.card_holder_name,
    };
    const simulateTheTimeOfARequest = () =>
      new Promise(resolve => {
        setTimeout(() => {
          console.log(simulateBody); // eslint-disable-line no-console
          resolve({ ok: true });
        }, 1000);
      });

    const responseExternalApi = await simulateTheTimeOfARequest();

    if (!responseExternalApi.ok) {
      sendError(
        res,
        { status: 'Bad Request', field: 'payment', type: 'error' },
        400
      );
      return;
    }

    // TODO: Salver loan no banco de dados
    console.log(loanData);

    const loanSaved = await Loans.post(loanData);

    const data = {
      course,
      loan: loanSaved,
      customer,
    };
    sendData(res, data);
  });

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
