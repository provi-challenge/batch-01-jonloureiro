import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config';
import { Layout } from './__Layout';

const { paths } = config;

export function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { course, payment, selectedLoanNumber, signature } =
    location.state ?? {};

  useEffect(() => {
    if (!payment || !signature || !course || !selectedLoanNumber) {
      navigate(paths.home);
      return;
    }
    console.log(location.state);
  }, []); // eslint-disable-line

  return <Layout>CONFIRMAÇÃO</Layout>;
}
