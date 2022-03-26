import test from 'ava'; // eslint-disable-line import/no-unresolved
import sinon from 'sinon';

import { generateOffers } from './generateOffer.js';
import {
  generateRandomCpfEntries,
  generateLuckyDigitsCombination,
} from './testUtils.js';

/* TODO: aumentar o número de ofertas no arquivo generateOffer.js e testar com
 * número dinâmico. */
const NUMBER_OF_OFFERS = 3;
const LUCKY_DIGITS_COMBINATION = generateLuckyDigitsCombination(
  NUMBER_OF_OFFERS
);

const getLuckyDigits = () => {
  const { length } = LUCKY_DIGITS_COMBINATION;
  return LUCKY_DIGITS_COMBINATION[Math.floor(Math.random() * length)];
};

const sandbox = sinon.createSandbox();

test.beforeEach(() => {
  sandbox.restore();
  sandbox.stub(generateOffers, '_getLuckyDigits').callsFake(getLuckyDigits);
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
  let entry;

  const possibleEntries = [0.1, 0.2, 0.3, undefined];

  for (let i = 0; i < 100; i++) {
    customerCpf = generateRandomCpfEntries();
    coursePrice = Math.floor(Math.random() * 10000);
    entry = possibleEntries[Math.floor(Math.random() * possibleEntries.length)];
    validSut(
      t,
      generateOffers(customerCpf, coursePrice, entry),
      NUMBER_OF_OFFERS
    );
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

test('Chamando com parâmetro inválidos no campo entry', t => {
  const message = 'O valor de entrada deve ser 0.1, 0.2 ou 0.3';
  const coursePrice = Math.floor(Math.random() * 10000);
  const inputs = [
    () => generateOffers(generateRandomCpfEntries(), coursePrice, null),
    () => generateOffers(generateRandomCpfEntries(), coursePrice, ''),
    () => generateOffers(generateRandomCpfEntries(), coursePrice, '0.3'),
    () => generateOffers(generateRandomCpfEntries(), coursePrice, 'dd'),
    () => generateOffers(generateRandomCpfEntries(), coursePrice, 0.31),
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

test('Permitir valores 0.1, 0.2 e 0.3 para o campo entry', t => {
  const message = 'O valor de entrada deve ser 0.1, 0.2 ou 0.3';

  for (let i = 0; i < 10; i++) {
    const customerCpf = generateRandomCpfEntries();
    const coursePrice = Math.floor(Math.random() * 10000);
    const entry = i % 10;

    if (entry === 0.1 || entry === 0.2 || entry === 0.3) {
      const sut = generateOffers(customerCpf, coursePrice, entry);
      sut.forEach(offer => {
        t.is(offer.entry, entry, `entry deve ser ${entry}`);
      });
    } else {
      t.throws(
        () => generateOffers(customerCpf, coursePrice, entry),
        {
          message,
        },
        `entry deve ser ${entry} e é ${i}`
      );
    }
  }
});
