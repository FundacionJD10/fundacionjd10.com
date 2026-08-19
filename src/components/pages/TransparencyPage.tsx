import { useState } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { DocumentViewer } from "@components/DocumentViewer";
import {
  EXPENSE_CATEGORIES,
  formatCOP,
  formatMonth,
  getCategoryTotal,
  getEntryTotal,
  type ExpenseCategory,
} from "@content/expenses/data";
import { useStore } from "@nanostores/react";
import { localeStore } from "@i18n/store";

function ExpenseIcon({ type }: { type: ExpenseCategory["icon"] }) {
  const iconClass = "w-5 h-5 text-[var(--color-text-muted)]";

  switch (type) {
    case "employee":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case "internet":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
      );
    case "bank":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
          />
        </svg>
      );
    case "utilities":
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      );
  }
}

export function TransparencyPage() {
  const { t } = useTranslation("transparency");
  const locale = useStore(localeStore);
  const [viewDoc, setViewDoc] = useState<{
    url: string;
    fileName: string;
  } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const DOCUMENTS = [
    {
      sectionKey: "section_constitution",
      fileName: "Acta de Constitución",
      url: "https://archivos.fundacionjd10.com/legal/ActaDeConstitucion.pdf",
    },
    {
      sectionKey: "section_statutes",
      fileName: "Estatutos",
      url: "https://archivos.fundacionjd10.com/legal/Estatutos.pdf",
    },
  ];

  const sections = [
    "section_reports",
    "section_donations",
    "section_annual",
    "section_constitution",
    "section_statutes",
  ] as const;

  const localeMap: Record<string, string> = {
    "es-419": "es-CO",
    "en-US": "en-US",
    "pt-BR": "pt-BR",
  };

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

      {/* Operational Expenses Section */}
      <section className="py-section px-6 lg:px-12 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">
                00
              </span>
              <div>
                <h2 className="font-heading text-xl text-[var(--color-text)]">
                  {t("section_expenses")}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-[30ch]">
                  {t("section_expenses_intro")}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {EXPENSE_CATEGORIES.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const total = getCategoryTotal(category);
                const hasEntries = category.entries.length > 0;

                return (
                  <div
                    key={category.id}
                    className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg)]"
                  >
                    {/* Category Header */}
                    <button
                      onClick={() =>
                        setExpandedCategory(isExpanded ? null : category.id)
                      }
                      className="w-full px-6 py-4 flex items-center gap-4 hover:bg-[var(--color-bg-subtle)] transition-colors"
                    >
                      <ExpenseIcon type={category.icon} />
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-[var(--color-text)]">
                          {t(category.nameKey)}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {t(category.descriptionKey)}
                        </p>
                      </div>
                      {hasEntries && (
                        <span className="text-sm font-mono text-[var(--color-text-muted)]">
                          {t("total")}: {formatCOP(total)}
                        </span>
                      )}
                      <svg
                        className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Monthly Breakdown */}
                    {isExpanded && (
                      <div className="border-t border-[var(--color-border)] px-6 py-4">
                        {!hasEntries ? (
                          <p className="text-[var(--color-text-muted)] italic text-sm">
                            {t("no_entries")}
                          </p>
                        ) : (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
                              {t("monthly_breakdown")}
                            </h4>
                            <ul className="space-y-2">
                              {category.entries.map((entry, entryIndex) => (
                                <li
                                  key={`${entry.month}-${entryIndex}`}
                                  className="py-2 border-b border-[var(--color-border)] last:border-b-0"
                                >
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm text-[var(--color-text)] capitalize">
                                      {formatMonth(
                                        entry.month,
                                        localeMap[locale] || "es-CO",
                                      )}
                                    </span>
                                    <span className="text-sm font-mono text-[var(--color-text-muted)] ml-auto">
                                      {formatCOP(getEntryTotal(entry))}
                                    </span>
                                    {entry.receiptUrl && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setViewDoc({
                                            url: entry.receiptUrl!,
                                            fileName: `${category.id}-${entry.month}.pdf`,
                                          });
                                        }}
                                        className="text-xs font-medium text-[var(--color-text)] hover:opacity-70 transition-opacity"
                                      >
                                        {t("view_receipt")} →
                                      </button>
                                    )}
                                  </div>
                                  {entry.detailItems && entry.detailItems.length > 0 && (
                                    <ul className="mt-2 ml-5 space-y-1">
                                      {entry.detailItems.map((item, itemIndex) => (
                                        <li
                                          key={`${entry.month}-${item.nameKey}-${itemIndex}`}
                                          className="flex items-center gap-3 text-xs"
                                        >
                                          <span className="text-[var(--color-text-muted)]">
                                            {t(item.nameKey)}
                                          </span>
                                          <span className="ml-auto font-mono text-[var(--color-text-muted)]/90">
                                            {formatCOP(item.amount)}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Document Sections */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          {sections.map((key, i) => {
            const docs = DOCUMENTS.filter((doc) => doc.sectionKey === key);
            return (
              <div
                key={key}
                className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16 py-12 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-[var(--color-text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-xl text-[var(--color-text)]">
                    {t(key)}
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
                        <li key={doc.url} className="flex items-center gap-3">
                          <span className="text-[var(--color-text)]">
                            {doc.fileName}
                          </span>
                          <button
                            onClick={() => setViewDoc(doc)}
                            className="ml-auto text-sm font-medium text-[var(--color-text)] hover:opacity-70 transition-opacity"
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
