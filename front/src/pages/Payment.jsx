import { useEffect, useState } from 'react';
// import { IMaskInput } from 'react-imask';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { config } from '../config';
import { Layout } from './__Layout';

const { paths, textsDefault } = config;

export const Payment = () => {
  const [componentIsReady, setComponentIsReady] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [texts, setTexts] = useState(textsDefault);

  const location = useLocation();
  const navigate = useNavigate();

  const { signature, paymentMethods, selectedLoanNumber, course } =
    location.state ?? {};

  useEffect(() => {
    if (
      !paymentMethods ||
      !paymentMethods.length ||
      !signature ||
      !course ||
      !selectedLoanNumber
    ) {
      navigate(paths.home);
      return;
    }

    console.log(signature);
    console.log(paymentMethods);
    console.log(selectedLoanNumber);
    console.log(course);

    setTexts((state) => ({
      ...state,
      title: 'Método de pagamento',
    }));
    setComponentIsReady(true);
  }, []); // eslint-disable-line

  if (!componentIsReady) return <h1>Aguarde</h1>;

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <form
          className="space-y-4 bg-white px-6 py-8 lg:space-y-6 lg:p-12"
          onSubmit={async (e) => {
            setFetching(true);
            e.preventDefault();
            // setErros(initialErrorsState);
            // await handleSubmit(e);
            setFetching(false);
          }}
        >
          <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Payment
          </h3>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">
              Número do cartão
              {/* {errors.name && (
                <em className="text-error ml-1 text-xs font-bold not-italic">
                  (inválido)
                </em>
              )} */}
            </span>
            <input
              required
              className="input input-primary"
              type="text"
              name="cardNumber"
              placeholder="Digite o número do cartão"
              disabled={fetching}
            />
          </label>

          <div className="flex justify-between">
            <Link to={paths.home} className="btn btn-ghost">
              Cancelar
            </Link>
            <button className="btn" type="submit">
              Salvar e continuar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
