"use client";

import { useMemo, useState } from "react";

type Question = {
  id: string;
  title: string;
  detail?: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "¿Tenés tu consumo eléctrico a mano (factura o estimación mensual)?",
    detail: "Conocer el consumo evita sobredimensionar o quedarte corto.",
  },
  {
    id: "q2",
    title: "¿Tenés espacio suficiente para paneles (techo/patio) y acceso seguro para instalar?",
    detail: "Considerá sombras, orientación y acceso para mantenimiento.",
  },
  {
    id: "q3",
    title: "¿Tu techo recibe sol directo la mayor parte del día?",
    detail: "Sombras de edificios/árboles afectan mucho el rendimiento.",
  },
  {
    id: "q4",
    title: "¿Tu objetivo es claro (ahorro a mediano plazo o resiliencia ante cortes)?",
    detail: "El diseño cambia si priorizás ahorro vs. autonomía.",
  },
  {
    id: "q5",
    title: "¿Podés empezar por cubrir cargas críticas (luces, heladera, router) si el presupuesto es limitado?",
    detail: "Arrancar por lo crítico es una estrategia realista y escalable.",
  },
];

function scoreToStatus(score: number) {
  if (score >= 4) return { label: "Alta preparación", tone: "good" as const };
  if (score >= 2) return { label: "Preparación media", tone: "mid" as const };
  return { label: "Baja preparación", tone: "low" as const };
}

export default function SolarReadinessChecklist() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const status = useMemo(() => scoreToStatus(score), [score]);

  const missingCount = useMemo(() => QUESTIONS.length - Object.keys(answers).length, [answers]);

  function setAnswer(id: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  }

  const boxClass =
    status.tone === "good"
      ? "border-neutral-200 bg-neutral-50"
      : status.tone === "mid"
        ? "border-neutral-200 bg-neutral-50"
        : "border-neutral-200 bg-neutral-50";

  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-600">Preguntas</div>
          <div className="text-xs text-neutral-500">{QUESTIONS.length} items · Sí/No</div>
        </div>
        <button
          className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          type="button"
        >
          Reiniciar
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {QUESTIONS.map((q, idx) => {
          const val = answers[q.id];
          return (
            <div key={q.id} className="rounded-2xl border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-xl">
                  <div className="text-sm font-medium">
                    {idx + 1}. {q.title}
                  </div>
                  {q.detail ? <div className="mt-1 text-xs text-neutral-600">{q.detail}</div> : null}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm ${
                      val === true ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                    }`}
                    onClick={() => setAnswer(q.id, true)}
                  >
                    Sí
                  </button>
                  <button
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm ${
                      val === false ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                    }`}
                    onClick={() => setAnswer(q.id, false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-neutral-600">
          Respuestas: <span className="font-medium">{Object.keys(answers).length}</span>/{QUESTIONS.length} · Puntaje:{" "}
          <span className="font-medium">{score}</span>
          {missingCount > 0 ? <span className="text-neutral-500"> · faltan {missingCount}</span> : null}
        </div>

        <button
          type="button"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length === 0}
          title={Object.keys(answers).length === 0 ? "Respondé al menos 1 pregunta" : "Ver resultado"}
        >
          Ver resultado
        </button>
      </div>

      {submitted ? (
        <div className={`mt-5 rounded-2xl border p-4 ${boxClass}`}>
          <div className="text-sm font-medium">Resultado: {status.label}</div>
          <div className="mt-2 text-sm text-neutral-700">
            {status.tone === "good" ? (
              <>
                Estás bien encaminado. Próximo paso: definir objetivo (ahorro vs. autonomía), confirmar sombras/espacio y
                estimar cargas críticas.
              </>
            ) : status.tone === "mid" ? (
              <>
                Tenés una base, pero conviene resolver 1–2 puntos antes de avanzar (por ejemplo, consumo mensual y
                condiciones de sol/espacio). Eso reduce errores de compra e instalación.
              </>
            ) : (
              <>
                Mejor esperar por ahora. Empezá por medir consumo, evaluar espacio/sombras y aclarar tu objetivo. Con esa
                info vas a tomar decisiones mucho más seguras.
              </>
            )}
          </div>

          <div className="mt-3 text-xs text-neutral-600">
            Nota: esta checklist es orientativa y no reemplaza una evaluación técnica en sitio.
          </div>
        </div>
      ) : null}
    </div>
  );
}
