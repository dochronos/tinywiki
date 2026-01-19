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
    title: "¿Tenés un consumo regular de agua caliente durante el día?",
    detail: "Los termotanques solares rinden mejor con uso distribuido.",
  },
  {
    id: "q2",
    title: "¿Contás con espacio para el tanque y los colectores?",
    detail: "Techo o estructura con acceso para instalación y mantenimiento.",
  },
  {
    id: "q3",
    title: "¿Tu vivienda recibe sol directo la mayor parte del día?",
    detail: "Sombras reducen significativamente el rendimiento térmico.",
  },
  {
    id: "q4",
    title: "¿Buscás reducir el consumo eléctrico o de gas a mediano plazo?",
    detail: "El retorno es mayor cuanto más reemplazás energía convencional.",
  },
  {
    id: "q5",
    title: "¿Tenés una instalación de agua en buen estado?",
    detail: "Presión adecuada y cañerías compatibles evitan problemas.",
  },
];

function scoreToStatus(score: number) {
  if (score >= 4) return { label: "Alta preparación", tone: "good" as const };
  if (score >= 2) return { label: "Preparación media", tone: "mid" as const };
  return { label: "Baja preparación", tone: "low" as const };
}

export default function ThermalReadinessChecklist() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const status = useMemo(() => scoreToStatus(score), [score]);

  function setAnswer(id: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setSubmitted(false);
  }

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

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length === 0}
        >
          Ver resultado
        </button>

        {submitted ? (
          <div className="rounded-2xl border p-4 bg-neutral-50">
            <div className="text-sm font-medium">Resultado: {status.label}</div>
            <div className="mt-2 text-sm text-neutral-700">
              {status.tone === "good" ? (
                <>Tenés buenas condiciones para avanzar. Próximo paso: definir capacidad y tipo de termotanque.</>
              ) : status.tone === "mid" ? (
                <>Podrías avanzar, pero conviene revisar espacio, sol y hábitos de consumo antes.</>
              ) : (
                <>No es el mejor momento. Mejorá primero condiciones de sol, instalación y uso.</>
              )}
            </div>
            <div className="mt-2 text-xs text-neutral-600">
              Nota: esta checklist es orientativa y no reemplaza una evaluación técnica.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
