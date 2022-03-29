import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths, textsDefault } = config;

export function Confirmation() {
  const [componentIsReady, setComponentIsReady] = useState(false);
  const [texts, setTexts] = useState(textsDefault);

  const location = useLocation();
  const navigate = useNavigate();

  const { course, payment, selectedLoanNumber, signature, customer } =
    location.state ?? {};

  useEffect(() => {
    if (!payment || !signature || !course || !selectedLoanNumber || !customer) {
      navigate(paths.home);
      return;
    }
    console.log(location.state);

    setTexts((state) => ({
      ...state,
      title: `${course.name}`,
      subtitle: 'Revise os dados e confirme o pagamento.',
    }));

    setComponentIsReady(true);
  }, []); // eslint-disable-line

  if (!componentIsReady) return <h1>Aguarde</h1>;

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
        <div className=" space-y-4 bg-white py-8 px-6 lg:flex lg:flex-shrink-0 lg:space-y-0 lg:space-x-6 lg:p-12">
          <div className="w-[18.75rem]">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Dados pessoais
            </h2>
          </div>
          <div className="border-l-2 border-gray-200"></div>
          <div className="w-[18.75rem]">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Pagamento da entrada
            </h2>
            <p className="my-4 text-gray-600">
              Método de pagamento:{' '}
              <span className="text-sm font-bold">
                {payment.method.split('_')[0].toUpperCase()}
              </span>
            </p>
            <p className="my-4 text-gray-600">
              Número do cartão:{' '}
              <span className="text-sm font-bold">{payment.cardNumber}</span>
            </p>
          </div>
          <div className="border-l-2 border-gray-200"></div>
          <div className="w-[18.75rem]">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Financiamento
            </h2>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 px-6 py-8 lg:p-12"></div>
      </div>
    </Layout>
  );
}
