import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { config } from '../config';
import { Layout } from './__Layout';

const { paths } = config;

export function Error(props) {
  const [texts, setTexts] = useState({
    title: 'Erro',
    subtitle: 'Ocorreu um erro inesperado.',
  });

  const location = useLocation();

  const { title, subtitle } = location.state ?? {};

  useEffect(() => {
    const newTitle = props.title ?? title;
    const newSubtitle = props.subtitle ?? subtitle;

    if (newTitle) setTexts((state) => ({ ...state, title: newTitle }));
    if (newSubtitle) setTexts((state) => ({ ...state, subtitle: newSubtitle }));
  }, []); // eslint-disable-line

  return (
    <Layout>
      <div className="mx-auto overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-fit">
        <div className="space-y-4 bg-white px-6 py-8 text-center lg:space-y-6 lg:p-12">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {texts.title}
          </h1>
          <p class="my-4 text-xl text-gray-600">{texts.subtitle}</p>
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
