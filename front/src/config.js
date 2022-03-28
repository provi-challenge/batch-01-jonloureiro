const paths = Object.freeze({
  home: '/',
  step1: '/step1',
  step2: '/step2',
  step3: '/step3',
  step4: '/step4',
});

const apiURI = 'http://localhost:5001';

const textsDefault = Object.freeze({
  title: 'Compre o seu curso profissionalizante',
  subtitle: 'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.',
});

export const config = Object.freeze({ paths, apiURI, textsDefault });
