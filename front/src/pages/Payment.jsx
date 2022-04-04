import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  formatPaymentMethod,
  isValidCardExpirationDate,
  isValidCardNumber,
  isValidCvv,
  isValidId,
  isValidName,
} from '../utils';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths, textsDefault } = config;

export const Payment = () => {
  const [componentIsReady, setComponentIsReady] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [texts, setTexts] = useState(textsDefault);

  const location = useLocation();
  const navigate = useNavigate();

  const { signature, paymentMethods, selectedLoanNumber, course, customer } =
    location.state ?? {};

  const initialErrorsState = Object.freeze({
    cardNumber: false,
    cardHolderName: false,
    expirationDate: false,
    cvv: false,
  });

  const [errors, setErros] = useState(initialErrorsState);

  useEffect(() => {
    if (
      !paymentMethods ||
      !paymentMethods.length ||
      !signature ||
      !course ||
      !selectedLoanNumber ||
      !customer
    ) {
      navigate(paths.home);
      return;
    }

    setTexts((state) => ({
      ...state,
      title: `${course.name}`,
      subtitle: 'Escolha o método de pagamento para o valor de entrada.',
    }));
    setComponentIsReady(true);
    setFetching(false);
  }, []); // eslint-disable-line

  function handleFormValidation(e) {
    if (!e.currentTarget) {
      console.error('Erro no formulário');
      console.error(e);
      return false;
    }

    const {
      elements: {
        methodId: { value: methodId },
        cardNumber: { value: cardNumber },
        cardHolderName: { value: cardHolderName },
        expirationDate: { value: expirationDate },
        cvv: { value: cvv },
      },
    } = e.currentTarget;

    const currentErrors = {};

    if (!isValidId(methodId)) currentErrors.methodId = true;
    if (!isValidCardNumber(cardNumber)) currentErrors.cardNumber = true;
    if (!isValidName(cardHolderName)) currentErrors.cardHolderName = true;
    if (!isValidCardExpirationDate(expirationDate))
      currentErrors.expirationDate = true;
    if (!isValidCvv(cvv)) currentErrors.cvv = true;

    if (Object.keys(currentErrors).length) {
      setErros((state) => ({ ...state, ...currentErrors }));
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    setFetching(true);
    e.preventDefault();
    setErros(initialErrorsState);
    if (handleFormValidation(e)) {
      const {
        elements: {
          methodId: { value: methodIdString },
          cardNumber: { value: cardNumber },
          cardHolderName: { value: cardHolderName },
          expirationDate: { value: expirationDate },
          cvv: { value: cvv },
        },
      } = e.currentTarget;

      const methodId = +methodIdString;
      const { method } = paymentMethods[methodId - 1];

      return navigate(paths.step4, {
        state: {
          signature,
          selectedLoanNumber,
          course,
          payment: {
            method,
            methodId,
            cardNumber,
            cardHolderName,
            expirationDate,
            cvv,
          },
          customer,
        },
      });
    }
    setFetching(false);
  }

  if (!componentIsReady) return <Layout />;

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mx-auto -mt-4 mb-4 flex h-7 items-stretch overflow-hidden rounded-full bg-gray-50 text-gray-500 shadow lg:-mt-6 lg:mb-6">
          {paymentMethods.map(({ method, id }, i) => (
            <div key={id} className="flex">
              <input
                id={id}
                type="radio"
                name="methodId"
                value={id}
                className="peer hidden"
                defaultChecked={i === 0}
              />
              <label
                className="flex select-none items-center px-4 text-xs font-bold transition-colors duration-300 peer-checked:bg-gray-800 peer-checked:text-gray-200"
                htmlFor={id}
              >
                {formatPaymentMethod(method).toUpperCase()}
              </label>
            </div>
          ))}
        </div>

        <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
          <div className="space-y-4 bg-white px-6 py-8 lg:space-y-6 lg:p-12">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Dados do cartão
            </h2>

            <label className="flex flex-col">
              <span className="mb-1 text-gray-500">
                Número do cartão
                {errors.cardNumber && (
                  <em className="text-error ml-1 text-xs font-bold not-italic">
                    (inválido)
                  </em>
                )}
              </span>
              <IMaskInput
                mask={'0000 0000 0000 0000'}
                required
                className="input input-primary"
                name="cardNumber"
                placeholder="Digite o número do cartão"
                disabled={fetching}
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1 text-gray-500">
                Nome escrito no cartão
                {errors.cardHolderName && (
                  <em className="text-error ml-1 text-xs font-bold not-italic">
                    (inválido)
                  </em>
                )}
              </span>
              <input
                required
                className="input input-primary"
                type="text"
                name="cardHolderName"
                placeholder="Qual o nome escrito no cartão?"
                disabled={fetching}
                maxLength={30}
              />
            </label>

            <div className="flex space-x-4">
              <label className="flex grow flex-col">
                <span className="mb-1 text-gray-500">
                  Validade
                  {errors.expirationDate && (
                    <em className="text-error ml-1 text-xs font-bold not-italic">
                      (inválido)
                    </em>
                  )}
                </span>
                <IMaskInput
                  mask={'00/00'}
                  required
                  className="input input-primary w-[4.5rem]"
                  name="expirationDate"
                  placeholder="00/00"
                  disabled={fetching}
                />
              </label>
              <label className="flex grow flex-col">
                <span className="mb-1 text-gray-500">
                  CVV
                  {errors.cvv && (
                    <em className="text-error ml-1 text-xs font-bold not-italic">
                      (inválido)
                    </em>
                  )}
                </span>
                <IMaskInput
                  mask={'000'}
                  required
                  className="input input-primary w-[4.5rem]"
                  name="cvv"
                  placeholder="CVV"
                  disabled={fetching}
                />
              </label>
            </div>

            <div className="flex justify-between space-x-4 sm:w-80 sm:space-x-0">
              <Link to={paths.home} className="btn btn-ghost">
                Cancelar
              </Link>
              <button className="btn" type="submit">
                Próximo passo
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};
