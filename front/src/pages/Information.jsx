import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

import { isValidCPF } from '../utils';
import { config } from './config';
import { Layout } from './__Layout';

const { paths } = config;

const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export function Information() {
  const [errors, setErros] = useState({
    name: false,
    email: false,
    cpf: false,
    entry: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget) {
      console.error('Erro no formulário');
      console.error(e);
      return;
    }

    const {
      elements: { name, email, cpf, entry },
    } = e.currentTarget;

    const currentErrors = {};

    if (!isValidCPF(cpf)) currentErrors.cpf = true;

    if (Object.keys(currentErrors).length) {
      setErros((state) => ({ ...state, ...currentErrors }));
      return;
    }

    // TODO: fazer post
  }

  return (
    <Layout title={title} subtitle={subtitle}>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <form
          className="space-y-4 bg-white px-6 py-8 lg:space-y-6 lg:p-12"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Informações básicas
          </h3>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">
              Nome completo
              {errors.name && (
                <em className="text-error ml-1 text-xs font-bold not-italic">
                  (inválido)
                </em>
              )}
            </span>
            <input
              required
              className="input input-primary"
              type="text"
              name="name"
              placeholder="Qual o seu nome?"
              autoFocus
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">
              Email
              {errors.email && (
                <em className="text-error ml-1 text-xs font-bold not-italic">
                  (inválido)
                </em>
              )}
            </span>
            <input
              required
              className="input input-primary"
              type="email"
              name="email"
              placeholder="Digite seu email"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">
              CPF
              {errors.cpf && (
                <em className="text-error ml-1 text-xs font-bold not-italic">
                  (inválido)
                </em>
              )}
            </span>
            <IMaskInput
              mask={'000.000.000-00'}
              required
              className="input input-primary"
              type="cpf"
              name="cpf"
              placeholder="Digite seu CPF"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">
              Valor de entrada
              {errors.entry && (
                <em className="text-error ml-1 text-xs font-bold not-italic">
                  (inválido)
                </em>
              )}
            </span>
            <IMaskInput
              required
              name="entry"
              className="input input-primary"
              mask={Number}
              scale={2}
              signed={false}
              thousandsSeparator={''}
              padFractionalZeros={true}
              normalizeZeros={true}
              radix={','}
              mapToRadix={['.']}
              min={0}
              max={100000}
              placeholder="Qual o valor de entrada?"
            />
          </label>

          <div className="flex justify-between pt-1 lg:pt-2">
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
}
