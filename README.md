# Provi - Desafio de Código JS

Você quer entrar na Provi como Dev ou Tech Lead na área de Engenharia? Então você está no lugar certo.

> Se você não quer entrar na área de Engenharia então você está no lugar errado :). Confira em [carreiras](https://provi.com.br/carreiras) outras vagas.

Leia **todo** esse documento e submita a sua solução.

Esse desafio foi pensado para que você gaste no máximo 2 horas do seu tempo porém fique a vontade para dedicar quanto tempo você quiser.

Boa sorte!

Ah, não querendo ser chato mas já sendo, siga bem atentamente os passos, caso contrário pode ser que a sua submissão não caia em nosso fluxo adequado de feedback.

## Configuração da Máquina

- [Instale o Docker](https://docs.docker.com/get-docker/)
- [Instale o Node.js](https://nodejs.org/en/download/)
    - [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) é a melhor forma de instalar Node.js

## Configuração do Desafio

### Repositório

- Use esse repositório como ponto de partida através do GitHub Classroom (mais detalhes no fim do documento).
- Quando você terminar, lembre de fazer `push` em tudo.

O projeto de back-end está na pasta `back` e o projeto de front-end na pasta `front`.

Na raiz também temos um `package.json`, ele é útil para centralizar configurações que valem para ambos os projetos então rode `npm install` na raiz também.

### Rodando o banco de dados

Utilizamos PostgreSQL como banco de dados principal, temos um arquivo já configurado utilizando Docker Compose e você pode subir esse banco de dados via Docker com o seguinte comando:

`docker-compose -f docker-compose-pg-only.yml up`

### Rodando cada projeto

Ambos os projetos são instalados e executados da mesma forma:

```bash
npm install
npm start
```

## O que você precisa entregar?

Uma mini aplicação que permite uma pessoa comprar um curso profisionalizante com uma condição de financiamento especialmente desenhada para a pessoa.

A página onde a pessoa entra (a página inicial do mini aplicativo) já é a página para comparar um curso específico.

O fluxo de compra deve seguir os seguintes passos:

1. Solicitar Dados Pessoais
   1. Nome
   2. Email
   3. CPF
   4. Valor da Entrada
2. Escolher forma de Financiamento
3. Escolher a forma de pagamento da entrada
4. Confirmar as condições e efetuar a compra

Cada passo inclui idas e vindas no servidor para obter mais detalhes, exemplos:
- O valor da entrada pode ser de 10%, 20% ou 30% do valor total do curso, o valor total do curso deve vir do servidor.
- As formas de financiamento são dinâmicas, ou seja, depende da pessoa que está pedindo, os detalhes devem vir do servidor.
- O processamento do pagamento deve ser feito no servidor.
- A finalização da compra deve ser efetuado no servidor.

Esperamos que você entregue os 4 passos acima em uma experiência para a pessoa que deseja comprar o curso.

Você vai ver no código inicial que muitas partes desse fluxo não existem ou estão incompletos. Isso não é um erro no desafio ;) A sua missão é deixar esse processo o mais completo possível.

A gente vai avaliar o que você fez baseado na vaga que você escolheu. Por exemplo, se você vai escolher uma vaga de back-end fique a vontade para focar nos detalhes do servidor porém lembre-se que o desafio é uma pessoa conseguir comprar um curso.

Seja criativo!

## Regras de Implementação

- Explique suas ideias como comentários no código; Fique a vontade para usar Português ou Inglês.
- Não troque tecnologias já utilizadas mas fique a vontade para adicionar novas;

## Importante

- Um processo automático vai checar sua solução -- por favor, siga as regras para evitar problemas na checagem automática;
- Não respondemos nenhuma pergunta sobre esse desafio. Fazemos isso para que todos tenham as mesmas condições;
- Esse mesmo desafio serve para back-end e front-end porém a avaliação vai variar de acordo com a opção escolhida por você no momento da submissão. 

## Como resolver o desafio

- Crie um novo repositório utilizando o [GitHub Classroom assignment](https://classroom.github.com/a/ZVvFGUg8).
- Quando você tiver feito push em tudo preencha esse [formulário](https://forms.gle/bttFAtWiGz4UTaCx5).
  - Antes dessa submissão nós não vamos nem olhar nada do que foi feito e muito menos rodar checagens automáticas.
- Nosso time vai avaliar sua solução e dar feedback em até 15 dias úteis.
