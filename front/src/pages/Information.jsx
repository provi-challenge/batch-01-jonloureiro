import { Layout } from './__Layout';

const title = 'Compre o seu curso profissionalizante';
const subtitle =
  'Se você não ficar feliz, devolvemos sua entrada em até 7 dias.';

export function Information() {
  return (
    <Layout title={title} subtitle={subtitle}>
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <h1>Informações básicas</h1>

        <label>
          <span>Nome completo</span>
          <input className="input" type="text" name="name" />
        </label>

        <label>
          <span>Email</span>
          <input className="input" type="email" name="email" />
        </label>

        <label>
          <span>CPF</span>
          <input className="input" type="cpf" name="cpf" />
        </label>

        <label>
          <span>Valor de entrada</span>
          <input className="input" type="number" name="entry" />
        </label>
      </div>
    </Layout>
  );
}
