import { CheckCircleIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import { config } from '../config';
import { Layout } from './__Layout';
import { useCourses } from '../hooks';

const { paths, textsDefault: texts } = config;

const includedFeatures = [
  'Lorem ipsum dolor',
  'Itaque amet indis',
  'Blanditiis repellendus etur ',
  'Quidem assumenda',
];

export const Pricing = () => {
  const { data, isError, isLoading } = useCourses();

  return (
    <Layout title={texts.title} subtitle={texts.subtitle}>
      <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
        <div className="flex-1 bg-white px-6 py-8 lg:p-12">
          <h3 className="min-h-[36px] text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {data && data.length > 0 && data[0].name}
            {(isLoading || isError) && <>Carregando...</>}
          </h3>
          <p className="mt-6 text-base text-gray-500">
            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
            amet indis perferendis blanditiis repellendus etur quidem assumenda.
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
          <div className="mt-4 flex h-12 min-h-[48px] items-center justify-center text-5xl font-extrabold text-gray-900">
            <span>
              {data && data.length > 0 && data[0].price / 100}
              {(isLoading || isError) && <>...</>}
            </span>
            <span className="ml-3 text-xl font-medium text-gray-500">BRL</span>
          </div>
          <p className="mt-4 text-sm">
            <a href="#" className="font-medium text-gray-500 underline">
              Condições de Financiamento
            </a>
          </p>
          <div className="mt-6">
            <Link
              to={paths.step1}
              state={{ course: data && data.length > 0 ? data[0] : null }}
              className={`btn btn-block${
                isLoading || isError ? ' btn-disabled loading' : ''
              }`}
            >
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
};
