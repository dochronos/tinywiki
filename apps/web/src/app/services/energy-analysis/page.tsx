export default function AnalisisEnergeticoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* HERO */}
      <section>
        <h1 className="text-4xl font-bold">
          Análisis energético para viviendas en Argentina
        </h1>

        <p className="mt-4 text-lg text-neutral-600">
          Descubrí cómo reducir costos energéticos y evaluar mejoras
          sustentables para tu hogar.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          ¿Qué incluye el análisis?
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">
              Consumo energético estimado
            </h3>

            <p className="mt-2 text-neutral-600">
              Evaluación del consumo anual y mensual de la vivienda.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">
              Recomendaciones de ahorro
            </h3>

            <p className="mt-2 text-neutral-600">
              Mejoras sugeridas para reducir pérdidas energéticas.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">
              Evaluación de paneles solares
            </h3>

            <p className="mt-2 text-neutral-600">
              Estimación de ahorro y retorno de inversión.
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">
              Reporte personalizado
            </h3>

            <p className="mt-2 text-neutral-600">
              Entrega de resultados resumidos en PDF.
            </p>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="mt-12 rounded-2xl border p-6">
        <h2 className="text-2xl font-semibold">
          Precio lanzamiento
        </h2>

        <p className="mt-4 text-3xl font-bold">
          Desde ARS 15.000
        </p>

        <p className="mt-3 text-neutral-600">
          Precio beta por tiempo limitado.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl bg-neutral-100 p-6">
        <h2 className="text-2xl font-semibold">
          Solicitar análisis
        </h2>

        <p className="mt-3 text-neutral-700">
          Contactame para evaluar tu vivienda y recibir un análisis
          personalizado.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="mailto:tu-email@ejemplo.com"
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            Contactar por email
          </a>

          <a
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            className="rounded-xl border px-5 py-3"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}