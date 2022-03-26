import test from 'ava'; // eslint-disable-line import/no-unresolved
import sinon from 'sinon';

import { generateOffers } from './generateOffer.js';
import {
  generateRandomCpfEntries,
  generateLuckyDigitsCombination,
} from './testUtils.js';

const NUMBER_OF_OFFERS = 3;
const LUCKY_DIGITS_COMBINATION = generateLuckyDigitsCombination(
  NUMBER_OF_OFFERS
);

const getLuckyDigits = () => {
  const { length } = LUCKY_DIGITS_COMBINATION;
  return LUCKY_DIGITS_COMBINATION[Math.floor(Math.random() * length)];
};

const sandbox = sinon.createSandbox();

test.before(() => {
  sandbox.stub(generateOffers, '_getLuckyDigits').callsFake(getLuckyDigits);
});

test.after.always(() => {
  sandbox.restore();
});

function validSut(t, sut, numberOffers = 3) {
  let actual;

  actual = Array.isArray(sut);
  t.is(actual, true, 'O retorno tem que ser um array');

  actual = sut.length;
  t.is(actual, numberOffers, `O tamanho tem que ser ${numberOffers}`);

  const keys = [
    'coursePrice',
    'entry',
    'installment',
    'installmentValue',
    'totalValue',
    'discount',
    'installmentDiscount',
    'totalDiscount',
    'finalValue',
  ];

  sut.forEach(offer => {
    Object.keys(offer).forEach(key => {
      actual = keys.includes(key);
      t.is(actual, true, `${key} deve estar entre ${keys.join(', ')}`);
    });
  });

  sut.forEach(offer => {
    keys.forEach(key => {
      actual = typeof offer[key];
      t.is(actual, 'number', `${key} deve ser um número`);
    });
  });
}

test('Chamando com parâmetros corretos', t => {
  let customerCpf;
  let coursePrice;

  for (let i = 0; i < 100; i++) {
    customerCpf = generateRandomCpfEntries();
    coursePrice = Math.floor(Math.random() * 10000);
    validSut(t, generateOffers(customerCpf, coursePrice), NUMBER_OF_OFFERS);
  }
});

test('Chamando com parâmetro inválidos no campo customerCpf', t => {
  const message = 'O cpf deve ser uma string de números';
  const inputs = [
    () => generateOffers(),
    () => generateOffers(undefined),
    () => generateOffers(null),
    () => generateOffers(''),
    () => generateOffers(0),
  ];
  inputs.forEach(input => {
    t.throws(
      input,
      {
        message,
      },
      input.toString()
    );
  });
});

test('Chamando com parâmetro inválidos no campo coursePrice', t => {
  const message = 'Precisa do valor do curso para gerar ofertas';
  const inputs = [
    () => generateOffers(generateRandomCpfEntries()),
    () => generateOffers(generateRandomCpfEntries(), undefined),
    () => generateOffers(generateRandomCpfEntries(), null),
    () => generateOffers(generateRandomCpfEntries(), ''),
    () => generateOffers(generateRandomCpfEntries(), '0d'),
    () => generateOffers(generateRandomCpfEntries(), 0.1),
    () => generateOffers(generateRandomCpfEntries(), '0.1'),
  ];
  inputs.forEach(input => {
    t.throws(
      input,
      {
        message,
      },
      input.toString()
    );
  });
});

test('A função deve ser determinística', t => {
  for (let i = 0; i < 100; i++) {
    sandbox.restore();
    sandbox.stub(generateOffers, '_getLuckyDigits').returns(getLuckyDigits());

    const customerCpf = generateRandomCpfEntries();
    const coursePrice = Math.floor(Math.random() * 10000);

    const sut1 = generateOffers(customerCpf, coursePrice);
    const sut2 = generateOffers(customerCpf, coursePrice);

    t.deepEqual(sut1, sut2, 'As ofertas devem ser iguais');
  }
});
