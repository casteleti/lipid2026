import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="space-y-6 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-tight">Inovação em Lipídios</h1>
          <p className="mt-4 text-xl text-slate-300">
            Tecnologias avançadas para cosméticos, farmacêutica e nutracêuticos
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/aplicacoes"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
            >
              Explorar Aplicações
            </Link>
            <Link
              href="/contato"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold hover:bg-white hover:text-slate-900"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-20">
        <h2 className="text-center text-3xl font-bold">Nossas Competências</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Cosméticos</h3>
            <p className="text-gray-600">
              Soluções inovadoras para formulações cosméticas premium
            </p>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Farmacêutica</h3>
            <p className="text-gray-600">
              Tecnologias de lipossomas para entrega controlada de ativos
            </p>
          </div>

          <div className="space-y-4 rounded-lg border p-6">
            <h3 className="text-xl font-semibold">Nutracêuticos</h3>
            <p className="text-gray-600">
              Encapsulação de nutrientes para máxima biodisponibilidade
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
