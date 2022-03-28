import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatMoney } from '../utils';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths } = config;

const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export function Financing() {
  const [componentIsReady, setComponentIsReady] = useState(false);
  const [texts, setTexts] = useState({
    title,
    subtitle,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { course, loans } = location.state ?? {};

  useEffect(() => {
    if ((!loans || !!loans.length) && !course) {
      navigate(paths.home);
      return;
    }
    if (!loans) {
      navigate(paths.step1);
      return;
    }
    setTexts((state) => ({
      ...state,
      title: `${course.name}`,
      subtitle: `Entrada de R$ ${formatMoney(
        (loans[0].coursePrice * loans[0].entry) / 100
      )}`,
    }));
    setComponentIsReady(true);
    console.log(loans);
    console.log(course);
  }, []); // eslint-disable-line

  if (!componentIsReady) return <h1>Aguarde</h1>;

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="mx-auto flex max-w-xs flex-col items-center space-y-8 rounded-lg lg:max-w-3xl lg:flex-row lg:justify-between lg:space-y-0">
        {loans.map((loan, i) => (
          <div
            key={i}
            className="hover:border-primary hover:shadow-primary/10 clickable group mx-4 w-56 space-y-4 rounded-lg border-t-4 border-gray-300 bg-white px-6 py-8 text-center shadow-lg transition duration-500 lg:w-full lg:px-8 lg:pb-6 "
          >
            <div>
              <h2 className="text-dark-blue text-xl font-bold">{`Proposta ${
                i + 1
              }`}</h2>
              <h3 className="font-medium text-gray-700/70">
                {loan.installment} parcelas
              </h3>
            </div>
            <div className="text-sm text-gray-700/80">
              <b className="font-medium">
                de R${' '}
                <span className="text-lg">
                  {formatMoney(loan.installmentValue / 100)}
                </span>
                /mês
              </b>
            </div>
            <div className="text-gray-700">
              <p className="text-sm font-medium text-gray-700/70">por apenas</p>
              <b className="font-medium">
                R${' '}
                <span className="text-dark-blue text-2xl font-bold">
                  {formatMoney(
                    (loan.installmentValue - loan.installmentDiscount) / 100
                  )}
                </span>
                /mês
              </b>
            </div>

            <div>
              <button className="btn btn-36 btn-block group-hover:bg-primary transition-all">
                Escolher
              </button>
              <p className="mt-2 text-xs font-medium text-gray-400">
                Valor total R$ {formatMoney(loan.finalValue / 100)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
