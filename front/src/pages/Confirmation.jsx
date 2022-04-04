import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { formatMoney, formatPaymentMethod } from '../utils';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths, textsDefault, apiURI } = config;

export function Confirmation() {
  const [componentIsReady, setComponentIsReady] = useState(false);
  const [texts, setTexts] = useState(textsDefault);
  const [loan, setLoan] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { course, payment, selectedLoanNumber, signature, customer } =
    location.state ?? {};

  useEffect(() => {
    if (!payment || !signature || !course || !selectedLoanNumber || !customer) {
      navigate(paths.home);
      return;
    }

    setTexts((state) => ({
      ...state,
      subtitle: 'Revise os dados e confirme o pagamento.',
    }));

    setComponentIsReady(true);
    getDataFromSignedString(signature);
  }, []); // eslint-disable-line

  function getDataFromSignedString(signature) {
    const data = signature.split('.');
    if (data.length !== 2) {
      navigate(paths.home);
      return;
    }
    const dataDecoded = atob(data[0]);
    const loans = JSON.parse(dataDecoded);

    const selectedLoan = loans.find(
      (loan) => loan.number === selectedLoanNumber
    );
    setLoan(selectedLoan);
  }

  async function handleClick() {
    setDisableButton(true);
    const responsePostLoans = await fetch(`${apiURI}/loans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customer.id,
        course_id: course.id,
        payment: {
          card_holder_name: payment.cardHolderName,
          card_number: payment.cardNumber,
          card_cvv: payment.cvv,
          card_expiration_date: payment.expirationDate,
          payment_method_id: payment.methodId,
        },
        loan_number: selectedLoanNumber,
        signature,
      }),
    });

    if (!responsePostLoans.ok) {
      setDisableButton(false);
      return navigate(paths.error, {
        state: {
          title: 'Erro ao realizar pagamento',
          subtitle: 'Por favor, tente novamente mais tarde.',
        },
      });
    }

    const { data } = await responsePostLoans.json();

    return navigate(paths.success, {
      state: {
        course: data.course,
        customer: data.customer,
        loan: data.loan,
      },
    });
  }

  if (!componentIsReady) return <Layout />;

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="link -mt-4 mb-6 flex justify-center font-medium sm:-mt-7">
        <Link className="clickable" to={paths.home}>
          Voltar para página do curso
        </Link>
      </div>
      <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
        <div className="grow space-y-4 bg-white py-8 px-6 lg:flex lg:flex-shrink-0 lg:justify-around lg:space-y-0 lg:space-x-6 lg:p-12">
          <div className="">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Dados pessoais
            </h2>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Nome:
              <br />
              <span className="text-lg font-bold text-gray-500">
                {customer.name}
              </span>
            </p>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Email:
              <br />
              <span className="text-lg font-bold text-gray-500">
                {customer.email}
              </span>
            </p>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              CPF:
              <br />
              <span className="text-lg font-bold text-gray-500">
                {customer.cpf}
              </span>
            </p>
          </div>
          <div className="border-b-2 border-gray-200 lg:border-b-0 lg:border-l-2"></div>
          <div className="">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Pagamento da entrada
            </h2>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Método de pagamento:
              <br />
              <span className="text-lg font-bold text-gray-500">
                {formatPaymentMethod(payment.method).toUpperCase()}
              </span>
            </p>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Número do cartão:
              <br />
              <span className="text-lg font-bold text-gray-500">
                <span className="mr-1.5 tracking-wide">
                  &bull;&bull;&bull;&bull;
                </span>
                <span className="mr-1.5 tracking-wide">
                  &bull;&bull;&bull;&bull;
                </span>
                <span className="mr-1.5 tracking-wide">
                  &bull;&bull;&bull;&bull;
                </span>
                {payment.cardNumber.slice(-4)}
              </span>
            </p>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Nome no Cartão:
              <br />
              <span className="text-lg font-bold text-gray-500">
                {payment.cardHolderName}
              </span>
            </p>
            <p className="my-4 font-medium text-gray-600 last:mb-0">
              Valor da entrada: R${' '}
              <span className="text-lg font-bold text-gray-500">
                {formatMoney((+loan.coursePrice / 100) * loan.entry)}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-8 text-center lg:w-96 lg:p-12">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            {course.name}
          </h2>
          <p className="mt-3 font-medium text-gray-600">
            {loan.installment}x de R${' '}
            <span className="text-lg font-bold text-gray-500 line-through">
              {formatMoney(+loan.installmentValue / 100)}
            </span>
            ;
          </p>
          <div className="mt-2 flex flex-col text-xl tracking-wider">
            Por apenas:
            <br />
            <span className="flex justify-center">
              <div className="text-primary relative text-4xl font-bold tracking-normal">
                <span className="absolute top-1 -left-6 text-sm text-gray-500">
                  R${' '}
                </span>
                {formatMoney(
                  (+loan.installmentValue - loan.installmentDiscount) / 100
                )}
                <span className="absolute bottom-0.5 -right-14 text-sm text-gray-500">
                  em {loan.installment}x
                </span>
              </div>
            </span>
          </div>
          <button
            className="btn btn-block mt-3"
            onClick={handleClick}
            disabled={disableButton}
          >
            Confirmar
          </button>
          <p className="mt-3 px-6 text-xs tracking-tight">
            Ao confirmar você concorda com os termos de uso. O pagamento da
            entrada será efetuado. E o financiamento será processado em até 72h.
          </p>
        </div>
      </div>
    </Layout>
  );
}
