import { useState } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { DocumentViewer } from "@components/DocumentViewer";

interface Document {
  sectionKey: string;
  fileName: string;
  url: string;
}

// Documents will be added here as they become available
const DOCUMENTS: Document[] = [
  {
    sectionKey: "section_rut",
    fileName: "RUT.pdf",
    url: "https://archivos.fundacionjd10.com/legal/RUT.pdf",
  },
  {
    sectionKey: "section_chamber",
    fileName: "Camara de Comercio",
    url: "https://archivos.fundacionjd10.com/legal/CamaraDeComercio.pdf",
  },
  {
    sectionKey: "section_no_investigation",
    fileName: "Certificado No Investigación 2026",
    url: "https://archivos.fundacionjd10.com/legal/CertificadoNoInvestigacion2026.pdf",
  },
];

const SECTIONS = [
  "section_rut",
  "section_chamber",
  "section_no_investigation",
  "section_bank",
] as const;

export function TaxPage() {
  const { t } = useTranslation("tax");
  const [viewDoc, setViewDoc] = useState<{
    url: string;
    fileName: string;
  } | null>(null);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="font-heading text-display max-w-[14ch]">
            {t("page_title")}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-[50ch]">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Document sections */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          {SECTIONS.map((sectionKey, i) => {
            const docs = DOCUMENTS.filter((d) => d.sectionKey === sectionKey);
            return (
              <div
                key={sectionKey}
                className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16 py-12 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[var(--color-text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-xl text-[var(--color-text)]">
                    {t(sectionKey)}
                  </h2>
                </div>
                <div>
                  {docs.length === 0 ? (
                    <p className="text-[var(--color-text-muted)] italic">
                      — Próximamente —
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {docs.map((doc) => (
                        // Move the "View document" to a new line
                        <li
                          key={doc.url}
                          className="flex md:flex-row flex-col items-start md:items-center gap-3"
                        >
                          <span className="text-[var(--color-text)]">
                            {doc.fileName}
                          </span>
                          <button
                            onClick={() => setViewDoc(doc)}
                            className="md:ml-auto ml-0 text-sm font-medium text-[var(--color-text)] hover:opacity-70 transition-opacity"
                          >
                            {t("view")} →
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {viewDoc && (
        <DocumentViewer
          url={viewDoc.url}
          fileName={viewDoc.fileName}
          onClose={() => setViewDoc(null)}
        />
      )}
    </main>
  );
}
