import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';

import {
  isValidName,
  isValidEmail,
  isValidCPF,
  formatCPF,
  formatMoney,
} from '../utils';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths, apiURI, textsDefault: texts } = config;

export function Information() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course } = location.state ?? {};
  const initialErrorsState = Object.freeze({
    name: false,
    email: false,
    cpf: false,
    entry: false,
    api: false,
  });

  const [errors, setErros] = useState(initialErrorsState);
  const [fetching, setFetching] = useState(true);

  const inputNameRef = useRef(null);

  useEffect(() => {
    setFetching(false);
    if (inputNameRef) {
      inputNameRef.current.disabled = false;
      inputNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!course) {
      navigate(paths.home);
    }
  }, []); // eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget) {
      console.error('Erro no formulário');
      console.error(e);
      return;
    }

    const {
      elements: {
        name: { value: name },
        email: { value: email },
        cpf: { value: cpf },
        entry: { value: entry },
      },
    } = e.currentTarget;

    const currentErrors = {};

    if (!isValidName(name)) currentErrors.name = true;
    if (!isValidEmail(email)) currentErrors.email = true;
    if (!isValidCPF(cpf)) currentErrors.cpf = true;

    if (Object.keys(currentErrors).length) {
      setErros((state) => ({ ...state, ...currentErrors }));
      return;
    }

    const body = JSON.stringify({
      name,
      email,
      cpf: formatCPF(cpf),
    });

    const responsePostCustomers = await fetch(`${apiURI}/customers`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body,
    });

    if (!responsePostCustomers.ok) {
      const { field } = await responsePostCustomers.json();
      switch (field) {
        case 'name':
          currentErrors.name = true;
          break;
        case 'email':
          currentErrors.email = true;
          break;
        case 'cpf':
          currentErrors.cpf = true;
          break;
        default:
          currentErrors.api = true;
          break;
      }
      setErros((state) => ({ ...state, ...currentErrors }));
      return;
    }

    const { data } = await responsePostCustomers.json();
    const { id: customerId } = data;
    const { id: courseId } = course;

    const responseGetLoans = await fetch(
      `${apiURI}/customers/${customerId}/courses/${courseId}/loans?entry=${entry}`
    );

    if (!responseGetLoans.ok) {
      currentErrors.api = true;
      setErros((state) => ({ ...state, ...currentErrors }));
      return;
    }

    const { signature, data: loans } = await responseGetLoans.json();

    navigate(paths.step2, {
      state: {
        signature: signature,
        loans,
        course,
        customer: data,
      },
    });
  }

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <form
          className="space-y-4 bg-white px-6 py-8 lg:space-y-6 lg:p-12"
          onSubmit={async (e) => {
            setFetching(true);
            setErros(initialErrorsState);
            await handleSubmit(e);
            setFetching(false);
          }}
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
              disabled={fetching}
              ref={inputNameRef}
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
              disabled={fetching}
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
              disabled={fetching}
            />
          </label>

          <div>
            <p className="mb-1 text-gray-500">Valor de entrada</p>
            <div className="flex items-center space-x-4">
              <label
                className={
                  'clickable flex grow select-none hover:bg-gray-100 ' +
                  (!fetching ? 'cursor-pointer' : 'cursor-not-allowed')
                }
              >
                <input
                  type="radio"
                  name="entry"
                  className="peer hidden"
                  value="0.1"
                  defaultChecked
                  disabled={fetching}
                />
                <span className="peer-checked:border-neutral w-full rounded-md border-2 py-2 text-center text-base font-bold text-gray-600 peer-checked:text-gray-800">
                  <span className="mr-0.5 text-xs not-italic text-gray-500">
                    R$
                  </span>
                  {course && formatMoney((course.price / 100) * 0.1)}
                </span>
              </label>

              <label
                className={
                  'clickable flex grow select-none hover:bg-gray-100 ' +
                  (!fetching ? 'cursor-pointer' : 'cursor-not-allowed')
                }
              >
                <input
                  type="radio"
                  name="entry"
                  className="peer hidden"
                  value="0.2"
                  disabled={fetching}
                />
                <span className="peer-checked:border-neutral w-full rounded-md border-2 py-2 text-center text-base font-bold text-gray-600 peer-checked:text-gray-800">
                  <span className="mr-0.5 text-xs not-italic text-gray-500">
                    R$
                  </span>
                  {course && formatMoney((course.price / 100) * 0.2)}
                </span>
              </label>

              <label
                className={
                  'clickable flex grow select-none hover:bg-gray-100 ' +
                  (!fetching ? 'cursor-pointer' : 'cursor-not-allowed')
                }
              >
                <input
                  type="radio"
                  name="entry"
                  className="peer hidden"
                  value="0.3"
                  disabled={fetching}
                />
                <span className="peer-checked:border-neutral w-full rounded-md border-2 py-2 text-center text-base font-bold text-gray-600 peer-checked:text-gray-800">
                  <span className="mr-0.5 text-xs not-italic text-gray-500">
                    R$
                  </span>
                  {course && formatMoney((course.price / 100) * 0.3)}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-between space-x-4 sm:w-[18.75rem] sm:space-x-0">
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
