import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dataset de TinyWiki | Proveedores, datos, pipeline y descargas",
  description:
    "Explorá el dataset de proveedores de TinyWiki para Argentina: campos, proceso de actualización, pipeline de limpieza, descargas y conexión con las herramientas de análisis.",
  alternates: {
    canonical: "/dataset",
  },
  openGraph: {
    title: "Dataset de TinyWiki",
    description:
      "Conocé los datos que utiliza TinyWiki: proveedores, campos, proceso de limpieza, descargas y herramientas de análisis.",
    url: "/dataset",
    type: "website",
  },
};

type DatasetField = {
  name: string;
  description: string;
};

type DownloadItem = {
  label: string;
  href: string;
  description: string;
};

type RelatedLink = {
  label: string;
  href: string;
  description: string;
};

const datasetFields: DatasetField[] = [
  {
    name: "provider_id",
    description:
      "Identificador único asignado a cada proveedor para facilitar la trazabilidad y la detección de duplicados.",
  },
  {
    name: "provider_name",
    description:
      "Nombre comercial o nombre del proveedor registrado en el dataset.",
  },
  {
    name: "category",
    description:
      "Categoría principal del proveedor, como energía solar, vivienda u otros servicios relacionados con la sustentabilidad.",
  },
  {
    name: "subcategory",
    description:
      "Clasificación más específica del servicio ofrecido dentro de cada categoría.",
  },
  {
    name: "province",
    description:
      "Provincia donde opera el proveedor, normalizada para mantener consistencia en el dataset.",
  },
  {
    name: "city",
    description:
      "Ciudad donde opera el proveedor, normalizada para facilitar búsquedas y filtros.",
  },
  {
    name: "website",
    description:
      "Sitio web o referencia online utilizada para identificar o verificar al proveedor.",
  },
  {
    name: "price_level",
    description:
      "Indicador simple del nivel de precios utilizado como referencia comparativa entre proveedores.",
  },
  {
    name: "last_verified",
    description:
      "Fecha de la última verificación o revisión manual realizada sobre el registro del proveedor.",
  },
];

const downloadItems: DownloadItem[] = [
  {
    label: "Descargar dataset original (providers.csv)",
    href: "/dataset/download/providers.csv",
    description:
      "Dataset de trabajo original antes de la estandarización y eliminación de duplicados.",
  },
  {
    label: "Descargar dataset limpio (providers_clean.csv)",
    href: "/dataset/download/providers_clean.csv",
    description:
      "Archivo normalizado generado por el pipeline de limpieza.",
  },
];

const relatedLinks: RelatedLink[] = [
  {
    label: "Explorar tabla de proveedores",
    href: "/providers",
    description:
      "Consultá los proveedores en una vista tabular para facilitar la búsqueda y comparación.",
  },
  {
    label: "Abrir mapa de proveedores",
    href: "/providers-map",
    description:
      "Explorá la distribución de proveedores mediante el mapa interactivo.",
  },
  {
    label: "Visitar sección de datos",
    href: "/data",
    description:
      "Conocé la capa de datos y análisis que forma parte del proyecto.",
  },
];

export default function DatasetPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-8 lg:px-10">
      {/* HERO */}
      <section className="max-w-4xl">
        <span className="inline-flex rounded-full border border-border-soft bg-surface-soft px-3 py-1 text-sm font-medium text-text-secondary">
          Dataset de TinyWiki
        </span>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Datos transparentes para proveedores, herramientas y análisis
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
          En esta página podés conocer el dataset que alimenta la sección de
          proveedores de TinyWiki. Encontrá información sobre sus campos,
          proceso de actualización, limpieza, descargas y conexión con el
          resto del proyecto.
        </p>
      </section>

      {/* RESUMEN DEL DATASET */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-text-secondary">Alcance principal</p>

          <p className="mt-2 font-semibold">
            Proveedores de sustentabilidad en Argentina
          </p>
        </Card>

        <Card>
          <p className="text-sm text-text-secondary">Usos principales</p>

          <p className="mt-2 font-semibold">
            Descubrimiento, comparación y análisis
          </p>
        </Card>

        <Card>
          <p className="text-sm text-text-secondary">Resultado del pipeline</p>

          <p className="mt-2 font-semibold">
            CSV limpio para producto y BI
          </p>
        </Card>
      </section>

      {/* DESCRIPCIÓN + CONEXIONES */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <h2 className="text-2xl font-semibold">
            Descripción del dataset
          </h2>

          <p className="mt-4 leading-7 text-text-secondary">
            El dataset de proveedores de TinyWiki es una colección curada de
            proveedores relacionados con sustentabilidad, energía solar,
            vivienda y soluciones prácticas para una vida más eficiente y
            off-grid. Se utiliza en distintas partes del proyecto: búsqueda
            de proveedores, exploración mediante mapas, limpieza de datos y
            generación de reportes de Business Intelligence.
          </p>

          <p className="mt-4 leading-7 text-text-secondary">
            Desde una perspectiva de portfolio, este dataset demuestra
            organización de datos, control de calidad, pensamiento orientado
            a producto y la capacidad de conectar contenido, interfaces y
            análisis dentro de un mismo proyecto.
          </p>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">
            Conexiones del proyecto
          </h2>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-border-soft p-4">
              <p className="font-medium">
                Repositorio de código
              </p>

              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Código fuente público, historial de versiones y evolución del
                proyecto organizada por sprints.
              </p>
            </div>

            <Link
              href="/providers"
              className="block rounded-2xl border border-border-soft p-4 transition hover:bg-surface-soft"
            >
              <p className="font-medium">
                Página de proveedores
              </p>

              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Vista principal en formato de tabla utilizando el dataset de
                proveedores.
              </p>
            </Link>

            <Link
              href="/providers-map"
              className="block rounded-2xl border border-border-soft p-4 transition hover:bg-surface-soft"
            >
              <p className="font-medium">
                Mapa de proveedores
              </p>

              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Exploración geográfica mediante un mapa interactivo.
              </p>
            </Link>

            <Link
              href="/data"
              className="block rounded-2xl border border-border-soft p-4 transition hover:bg-surface-soft"
            >
              <p className="font-medium">
                Sección de datos
              </p>

              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Capa general de datos y contexto analítico del proyecto.
              </p>
            </Link>
          </div>
        </Card>
      </section>

      {/* DEFINICIÓN DE CAMPOS */}
      <section className="mt-8">
        <Card>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold">
              Definición de campos
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              Estos son los campos principales documentados actualmente en el
              dataset. Definir claramente cada campo facilita la
              mantenibilidad, reutilización y confiabilidad de los datos.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Campo
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Definición
                  </th>
                </tr>
              </thead>

              <tbody>
                {datasetFields.map((field) => (
                  <tr
                    key={field.name}
                    className="border-b border-border-soft align-top"
                  >
                    <td className="px-4 py-4 text-sm font-medium">
                      <code className="rounded-lg bg-surface-soft px-2 py-1">
                        {field.name}
                      </code>
                    </td>

                    <td className="px-4 py-4 text-sm leading-7 text-text-secondary">
                      {field.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* PROCESO DE ACTUALIZACIÓN + PIPELINE */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold">
            Proceso de actualización
          </h2>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-surface-soft p-4">
              <p className="font-medium">
                1. Recolección de datos
              </p>

              <p className="mt-2 leading-7 text-text-secondary">
                Los registros de proveedores son recopilados, revisados y
                agregados al dataset de trabajo a medida que se identifican
                nuevas fuentes.
              </p>
            </div>

            <div className="rounded-2xl bg-surface-soft p-4">
              <p className="font-medium">
                2. Limpieza
              </p>

              <p className="mt-2 leading-7 text-text-secondary">
                El pipeline desarrollado en Python normaliza campos de texto,
                elimina duplicados y genera un archivo limpio para su uso en
                el producto y en los análisis.
              </p>
            </div>

            <div className="rounded-2xl bg-surface-soft p-4">
              <p className="font-medium">
                3. Reutilización
              </p>

              <p className="mt-2 leading-7 text-text-secondary">
                El dataset resultante alimenta la interfaz de proveedores, el
                mapa interactivo y las vistas utilizadas para Business
                Intelligence.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">
            Pipeline de limpieza
          </h2>

          <p className="mt-4 leading-7 text-text-secondary">
            TinyWiki utiliza un script liviano desarrollado en Python,
            <code className="mx-1 rounded-lg bg-surface-soft px-2 py-1 text-sm">
              clean_providers.py
            </code>
            , para hacer que los datos sean más consistentes y confiables.
          </p>

          <ul className="mt-6 space-y-3">
            <li className="rounded-2xl bg-surface-soft p-4">
              Normaliza los registros de proveedores
            </li>

            <li className="rounded-2xl bg-surface-soft p-4">
              Elimina registros duplicados
            </li>

            <li className="rounded-2xl bg-surface-soft p-4">
              Estandariza provincia y ciudad
            </li>

            <li className="rounded-2xl bg-surface-soft p-4">
              Genera un CSV limpio para su utilización posterior
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-dashed border-border-soft p-4">
            <p className="text-sm leading-7 text-text-secondary">
              Archivo del pipeline:
              <code className="ml-2 rounded-lg bg-surface-soft px-2 py-1">
                data-pipeline/clean_providers.py
              </code>
            </p>
          </div>
        </Card>
      </section>

      {/* DESCARGAS + PÁGINAS RELACIONADAS */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold">
            Descargas
          </h2>

          <div className="mt-6 space-y-3">
            {downloadItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-2xl border border-border-soft p-5 transition hover:bg-surface-soft"
              >
                <p className="font-medium">
                  {item.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">
            Páginas relacionadas
          </h2>

          <div className="mt-6 space-y-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block rounded-2xl border border-border-soft p-5 transition hover:bg-surface-soft"
              >
                <p className="font-medium">
                  {link.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* VISTA PREVIA DE ANÁLISIS */}
      <section className="mt-8">
        <Card className="overflow-hidden p-0">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold">
              Vista previa de análisis
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
              Esta captura conecta el dataset con la capa de Business
              Intelligence del proyecto. Permite mostrar que TinyWiki no es
              solamente contenido e interfaz, sino también datos estructurados
              y herramientas de análisis.
            </p>
          </div>

          <div className="overflow-hidden border-t border-border-soft bg-surface-soft">
            <img
              src="/images/tinywiki-providers-dashboard.png"
              alt="Vista previa del dashboard de Power BI de TinyWiki con análisis del dataset de proveedores."
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="px-6 py-5 md:px-8">
            <p className="text-sm leading-7 text-text-secondary">
              Captura sugerida: dashboard de Power BI o mapa de proveedores,
              guardado en
              <code className="mx-1 rounded-lg bg-surface-soft px-2 py-1">
                apps/web/public/images/tinywiki-providers-dashboard.png
              </code>
              .
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}