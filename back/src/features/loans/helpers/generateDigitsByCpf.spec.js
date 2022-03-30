import test from 'ava'; // eslint-disable-line import/no-unresolved

import { generateDigitsByCpf } from './generateDigitsByCpf.js';
import { generateRandomCpfEntries } from './testUtils.js';

function validSut(t, sut, numberOffers = 3) {
  let actual;

  actual = Array.isArray(sut);
  t.is(actual, true, 'O retorno tem que ser um array');

  actual = sut.length;
  t.is(actual, numberOffers, `O tamanho tem que ser ${numberOffers}`);

  actual = sut.every(digit => typeof digit === 'number');
  t.is(actual, true, 'Todos os elementos do array devem ser números');

  actual = sut.every(digit => digit >= 0 && digit <= 9);
  t.is(actual, true, 'Todos os elementos do array devem estar entre 0 e 9');
}

test('Chamando sem parâmetro', t => {
  validSut(t, generateDigitsByCpf());
});

test('Chamando com parâmetros corretos', t => {
  let cpf;
  let numberOffers;

  for (let i = 0; i < 100; i++) {
    cpf = generateRandomCpfEntries();
    validSut(t, generateDigitsByCpf(cpf));
    cpf = generateRandomCpfEntries();
    numberOffers = Math.floor(Math.random() * 10) + 1;
    validSut(t, generateDigitsByCpf(cpf, numberOffers), numberOffers);
  }
});

test('Chamando com parâmetro errados', t => {
  const message = 'O cpf deve ser uma string de números';
  const inputs = [
    () => generateDigitsByCpf(null),
    () => generateDigitsByCpf(83200195088),
    () => generateDigitsByCpf('meu cpf'),
  ];

  inputs.forEach(input => {
    t.throws(input, { message }, input.toString());
  });

  t.throws(() => generateDigitsByCpf('', null), {
    message: 'O número de ofertas deve ser um número',
  });

  t.notThrows(() => generateDigitsByCpf('', '3'));
  t.notThrows(() => generateDigitsByCpf('123456789123456789'));
});

test('A função deve ser determinística', t => {
  for (let i = 0; i < 100; i++) {
    const cpf = generateRandomCpfEntries();
    const numberOffers = Math.floor(Math.random() * 10) + 1;

    const sut1 = generateDigitsByCpf(cpf, numberOffers);
    const sut2 = generateDigitsByCpf(cpf, numberOffers);

    t.deepEqual(sut1, sut2);
  }
});
