"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Card } from "@/components/ui/card";

const ECOBUILD_REQUEST_KEY = "tinywiki:ecobuild-request";

type EcoBuildRequest = {
  size: number;
  city: string;
  housingType: string;
  insulation: boolean;
  solar: boolean;
  windows: string;
  consumption: number;
  monthlyCost: number;
  score: number;
  recommendations: string[];
  generatedAt?: string;
};

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener("storage", onChange);
  };
}

function getStoredRequest(): string | null {
  try {
    return sessionStorage.getItem(ECOBUILD_REQUEST_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): null {
  return null;
}

function parseRequest(raw: string | null): EcoBuildRequest | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const value = parsed as Record<string, unknown>;

    if (
      typeof value.size !== "number" ||
      !Number.isFinite(value.size) ||
      value.size <= 0 ||
      typeof value.city !== "string" ||
      typeof value.housingType !== "string" ||
      typeof value.insulation !== "boolean" ||
      typeof value.solar !== "boolean" ||
      typeof value.windows !== "string" ||
      typeof value.consumption !== "number" ||
      !Number.isFinite(value.consumption) ||
      typeof value.monthlyCost !== "number" ||
      !Number.isFinite(value.monthlyCost) ||
      typeof value.score !== "number" ||
      !Number.isFinite(value.score) ||
      !Array.isArray(value.recommendations) ||
      !value.recommendations.every((item: unknown) => typeof item === "string")
    ) {
      return null;
    }

    return {
      size: value.size,
      city: value.city,
      housingType: value.housingType,
      insulation: value.insulation,
      solar: value.solar,
      windows: value.windows,
      consumption: value.consumption,
      monthlyCost: value.monthlyCost,
      score: value.score,
      recommendations: value.recommendations,
      generatedAt:
        typeof value.generatedAt === "string" ? value.generatedAt : undefined,
    };
  } catch {
    return null;
  }
}

const emailSubject = "Consulta sobre análisis energético";

function createEmailHref(request: EcoBuildRequest | null): string {
  const details = request
    ? `DATOS DE LA VIVIENDA
- Ciudad o localidad: ${request.city}
- Tipo de vivienda: ${request.housingType}
- Superficie aproximada: ${request.size} m²

CONFIGURACIÓN ACTUAL
- Aislamiento térmico: ${request.insulation ? "Sí" : "No"}
- Paneles solares: ${request.solar ? "Sí" : "No"}
- Ventanas: ${request.windows === "double" ? "Doble vidrio" : "Vidrio simple"}

RESULTADOS DE ECOBUILD INSIGHT
- Consumo anual estimado: ${request.consumption} kWh
- Costo mensual estimado: USD ${request.monthlyCost}
- Puntaje energético: ${request.score}/100
- Recomendaciones: ${
        request.recommendations.length > 0
          ? request.recommendations.join("; ")
          : "Sin recomendaciones pendientes"
      }

`
    : `DATOS DE LA VIVIENDA
- Ciudad o localidad:
- Tipo de vivienda:
- Superficie aproximada (m²):

`;

  const emailBody = `Hola,

Me gustaría consultar sobre el servicio de análisis energético para viviendas.

${details}OBJETIVO PRINCIPAL
- Reducir el consumo energético, evaluar paneles solares, mejorar el aislamiento u otro:

INFORMACIÓN ADICIONAL
- Contame brevemente sobre tu vivienda y qué te gustaría mejorar:

Gracias. Quedo a la espera de información sobre los próximos pasos y el alcance del análisis.

Saludos.`;

  return `mailto:ecohabitat.lab@gmail.com?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;
}

export default function AnalisisEnergeticoPage() {
  const storedData = useSyncExternalStore(
    subscribeToStorage,
    getStoredRequest,
    getServerSnapshot,
  );

  const request = parseRequest(storedData);
  const emailHref = createEmailHref(request);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* HERO */}
      <section>
        <Card className="bg-surface">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/tools" className="font-medium hover:underline">
              Herramientas
            </Link>

            <Link href="/wiki" className="font-medium hover:underline">
              Wiki
            </Link>

            <Link href="/providers" className="font-medium hover:underline">
              Proveedores
            </Link>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Análisis energético para viviendas en Argentina
          </h1>

          <p className="mt-4 text-text-secondary">
            Descubrí cómo reducir costos energéticos y evaluar mejoras
            sustentables para tu hogar.
          </p>
        </Card>
      </section>

      {/* BENEFITS */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">¿Qué incluye el análisis?</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="font-semibold">Consumo energético estimado</h3>
            <p className="mt-2 text-text-secondary">
              Evaluación del consumo anual y mensual de la vivienda.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold">Recomendaciones de ahorro</h3>
            <p className="mt-2 text-text-secondary">
              Mejoras sugeridas para reducir pérdidas energéticas.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold">Evaluación de paneles solares</h3>
            <p className="mt-2 text-text-secondary">
              Estimación de ahorro y retorno de inversión.
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold">Reporte personalizado</h3>
            <p className="mt-2 text-text-secondary">
              Entrega de resultados resumidos en PDF.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl bg-neutral-100 p-6">
        <h2 className="text-2xl font-semibold">Solicitar análisis</h2>

        <p className="mt-3 text-neutral-700">
          {request
            ? "Preparamos una consulta con los resultados de EcoBuild Insight. Podés revisarla y editarla antes de enviarla."
            : "Compartí algunos datos sobre tu vivienda y tus objetivos para que podamos evaluar tu consulta."}
        </p>

        {request && (
          <Card className="mt-4">
            <h3 className="font-semibold">Resumen de tu estimación</h3>

            <p className="mt-2 text-text-secondary">
              {request.size} m² · {request.city} · {request.housingType}
            </p>

            <p className="mt-1 text-text-secondary">
              Consumo anual: {request.consumption} kWh
            </p>

            <p className="mt-1 text-text-secondary">
              Costo mensual estimado: USD {request.monthlyCost}
            </p>
          </Card>
        )}

        <p className="mt-3 text-sm text-text-secondary">
          Los valores económicos son estimaciones orientativas basadas en
          parámetros internos de EcoBuild Insight. Están expresados en dólares
          estadounidenses (USD) y no representan cotizaciones comerciales ni
          garantizan ahorros o plazos de recuperación.
        </p>

        <a
          href={emailHref}
          className="mt-6 inline-block rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
        >
          Solicitar análisis por email
        </a>

        <p className="mt-3 text-sm text-neutral-600">
          Se abrirá tu aplicación de correo con un mensaje preparado que podés
          revisar y editar antes de enviarlo.
        </p>
      </section>
    </main>
  );
}
