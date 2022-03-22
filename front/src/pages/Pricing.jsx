import { CheckCircleIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { config } from './config';
import { Layout } from './__Layout';

const { paths } = config;

const includedFeatures = [
  'Lorem ipsum dolor',
  'Itaque amet indis',
  'Blanditiis repellendus etur ',
  'Quidem assumenda',
];
const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export const Pricing = () => (
  <Layout title={title} subtitle={subtitle}>
    <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Seu Curso
        </h3>
        <p className="mt-6 text-base text-gray-500">
          Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet
          indis perferendis blanditiis repellendus etur quidem assumenda.
        </p>
        <div className="mt-8">
          <div className="flex items-center">
            <h4 className="flex-shrink-0 bg-white pr-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              O que você vai aprender?
            </h4>
            <div className="flex-1 border-t-2 border-gray-200" />
          </div>
          <ul
            role="list"
            className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
          >
            {includedFeatures.map((feature) => (
              <li key={feature} className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-3 text-sm text-gray-700">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
        <p className="text-lg font-medium leading-6 text-gray-900">
          Compre agora, pague depois
        </p>
        <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
          <span>$349</span>
          <span className="ml-3 text-xl font-medium text-gray-500">BRL</span>
        </div>
        <p className="mt-4 text-sm">
          <a href="#" className="font-medium text-gray-500 underline">
            Condições de Financiamento
          </a>
        </p>
        <div className="mt-6">
          <Link to={paths.step1} className="btn btn-block">
            Acesse Agora
          </Link>
        </div>
        <div className="mt-4 text-sm">
          <a href="#" className="font-medium text-gray-900">
            PDF com Cronograma{' '}
            <span className="font-normal text-gray-500">(download)</span>
          </a>
        </div>
      </div>
    </div>
  </Layout>
);
