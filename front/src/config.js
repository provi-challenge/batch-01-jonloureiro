const paths = Object.freeze({
  home: '/',
  step1: '/basic-information',
  step2: '/choose-financing',
  step3: '/payment-method',
  step4: '/confirmation',
  error: '/error',
  success: '/success',
});

const apiURI = process.env.REACT_APP_API_URI ?? 'http://localhost:5001';

const textsDefault = Object.freeze({
  title: 'Compre o seu curso profissionalizante',
  subtitle: 'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.',
});

export const config = Object.freeze({ paths, apiURI, textsDefault });
