import { Link } from 'react-router-dom';
import { config } from './config';
import { Layout } from './__Layout';

const { paths } = config;

const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export function Information() {
  return (
    <Layout title={title} subtitle={subtitle}>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <div className="space-y-4 bg-white px-6 py-8 lg:space-y-6 lg:p-12">
          <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Informações básicas
          </h3>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">Nome completo</span>
            <input className="input input-primary" type="text" name="name" />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">Email</span>
            <input className="input input-primary" type="email" name="email" />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">CPF</span>
            <input className="input input-primary" type="cpf" name="cpf" />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 text-gray-500">Valor de entrada</span>
            <input className="input input-primary" type="number" name="entry" />
          </label>

          <div className="flex justify-between pt-1 lg:pt-2">
            <Link to={paths.home} className="btn btn-ghost">
              Cancelar
            </Link>
            <button className="btn" type="submit">
              Salvar e continuar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
