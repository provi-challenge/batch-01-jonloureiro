import { Link } from 'react-router-dom';

import { config } from '../config';
import { Layout } from './__Layout';

const { paths } = config;

export function Error({ title, subtitle }) {
  return (
    <Layout>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <div className="space-y-4 bg-white px-6 py-8 text-center lg:space-y-6 lg:p-12">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p class="my-4 text-xl text-gray-600">{subtitle}</p>
          <div>
            <Link className="clickable link font-medium" to={paths.home}>
              Voltar para página do curso
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
