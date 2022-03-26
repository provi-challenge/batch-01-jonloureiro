import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { config } from '../config';
import { Layout } from './__Layout';

const { paths } = config;

const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export function Financing() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, loans } = location.state ?? {};

  useEffect(() => {
    if (!loans && !course) {
      navigate(paths.home);
      return;
    }
    if (!loans) {
      navigate(paths.step1);
      return;
    }
  }, []); // eslint-disable-line

  return (
    <Layout title={title} subtitle={subtitle}>
      <h1>course</h1>
      {course && <h2>{course.name}</h2>}

      <h1>loans</h1>
      {loans && <h2>{loans.length}</h2>}
    </Layout>
  );
}
