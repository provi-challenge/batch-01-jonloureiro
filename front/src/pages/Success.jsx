import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { config } from '../config';
import { formatMoney } from '../utils';
import { Layout } from './__Layout';

const { paths } = config;

export function Success() {
  const [componentIsReady, setComponentIsReady] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { course, customer, loan } = location.state ?? {};

  useEffect(() => {
    if (!course || !customer) {
      if (!loan) {
        return navigate(paths.error, {
          title: 'Dados faltando',
          subtitle: `Alguns dados estão faltando, por favor, tente novamente mais tarde.`,
        });
      }
      //TODO: enviar erro para ferramenta de log com o "loan"
      return navigate(paths.error, {
        title: 'Ocorreu um erro no processo',
        subtitle: `Um relatório foi enviado com o erro.${
          !loan.id
            ? ''
            : ` O ID da tentativa é ${loan.id}. Fique a vontade para entrar com contado com o suporte.`
        }`,
      });
    }
    console.log('Success', { course, customer, loan });
    setComponentIsReady(true);
  }, []); // eslint-disable-line

  if (!componentIsReady) return <Layout />;

  return (
    <Layout>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <div className="space-y-4 bg-white px-6 py-8 text-center lg:space-y-6 lg:p-12">
          <h1 class="text-xl font-extrabold text-gray-900 lg:text-2xl">
            Parabéns {customer.name}!
          </h1>
          <p class="my-4 text-xl text-gray-600">
            Você acabou de adquirir o curso <b>{course.name}</b>.
          </p>
          <p class="my-4 text-xl text-gray-600">
            Com o valor da entrada de apenas R${' '}
            <b>
              {formatMoney(
                (+loan.course_price_on_loan_date *
                  (loan.entry_in_percentage / 100)) /
                  100
              )}
            </b>
            .
          </p>
          <p class="my-4 text-xl text-gray-600">
            E o restante em <b>{loan.installment}</b> parcelas de R$
            <b> {formatMoney(+loan.installment_value / 100)}</b>.
          </p>
          <div>
            <Link className="clickable link font-medium" to={paths.home}>
              Ir para página inicial
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
