import { useState } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { DocumentViewer } from "@components/DocumentViewer";
import {
  getCategoryExpenses,
  type ExpenseCategory,
} from "@content/expenses/data";
import {
  computeLedger,
  formatCOPExact,
  formatTransactionDate,
  getCurrentBalance,
} from "@content/bank/transactions";
import type { Locale } from "@i18n/store";
import { LocaleProvider } from "@i18n/LocaleProvider";
import { ORGANIZATION } from "@content/organization";

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

export function TransparencyPage({ locale }: { locale: Locale }) {
  const { t } = useTranslation("transparency", locale);
  const [viewDoc, setViewDoc] = useState<{
    url: string;
    fileName: string;
  } | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  const localeMap: Record<string, string> = {
    "es-419": "es-CO",
    "en-US": "en-US",
    "pt-BR": "pt-BR",
  };
  const dateLocale = localeMap[locale] || "es-CO";

  // Ledger newest-first for display; balance is computed chronologically.
  const ledger = [...computeLedger()].reverse();
  const currentBalance = getCurrentBalance();

  // Operational expenses are derived from the ledger outflows (single source of truth).
  const categoryExpenses = getCategoryExpenses();


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

  return (
    <LocaleProvider locale={locale}>
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
          <p className="mt-4 text-sm text-white/60">
            {ORGANIZATION.legalName} · NIT: {ORGANIZATION.nit}
          </p>
        </div>
      </section>

      {/* Bank Ledger Section */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">
                00
              </span>
              <div>
                <h2 className="font-heading text-xl text-[var(--color-text)]">
                  {t("section_bank")}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-[30ch]">
                  {t("section_bank_intro")}
                </p>
                <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                    {t("current_balance")}
                  </p>
                  <p className="mt-1 font-mono text-lg text-[var(--color-text)]">
                    {formatCOPExact(currentBalance)}
                  </p>
                </div>
              </div>
            </div>
            <div>
              {/* Column headers */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-6 px-4 pb-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                <span>{t("col_description")}</span>
                <span className="text-right w-36 whitespace-nowrap">{t("col_in")}</span>
                <span className="text-right w-36 whitespace-nowrap">{t("col_out")}</span>
                <span className="text-right w-44 whitespace-nowrap">{t("col_balance")}</span>
              </div>
              <ul className="divide-y divide-[var(--color-border)]">
                {ledger.map(({ transaction, inflow, outflow, balanceAfter }) => {
                  const hasFees =
                    !!transaction.fees && transaction.fees.length > 0;
                  const isExpanded = expandedTx === transaction.id;

                  return (
                    <li key={transaction.id}>
                      <button
                        type="button"
                        onClick={() =>
                          hasFees &&
                          setExpandedTx(isExpanded ? null : transaction.id)
                        }
                        className={`w-full px-4 py-3 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-6 gap-y-1 items-center text-left ${
                          hasFees
                            ? "hover:bg-[var(--color-bg-subtle)] transition-colors cursor-pointer"
                            : "cursor-default"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--color-text)] truncate">
                              {t(transaction.descriptionKey)}
                            </span>
                            {hasFees && (
                              <svg
                                className={`w-4 h-4 shrink-0 text-[var(--color-text-muted)] transition-transform ${
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
                            )}
                          </div>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {formatTransactionDate(transaction.date, dateLocale)}
                          </span>
                        </div>
                        {/* Mobile: signed amount */}
                        <span
                          className={`sm:hidden text-sm font-mono text-right whitespace-nowrap ${
                            inflow > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-[var(--color-text)]"
                          }`}
                        >
                          {inflow > 0
                            ? `+${formatCOPExact(inflow)}`
                            : `−${formatCOPExact(outflow)}`}
                        </span>
                        {/* Desktop: in / out / balance columns */}
                        <span className="hidden sm:block text-sm font-mono text-right w-36 whitespace-nowrap text-green-600 dark:text-green-400">
                          {inflow > 0 ? `+${formatCOPExact(inflow)}` : ""}
                        </span>
                        <span className="hidden sm:block text-sm font-mono text-right w-36 whitespace-nowrap text-[var(--color-text)]">
                          {outflow > 0 ? `−${formatCOPExact(outflow)}` : ""}
                        </span>
                        <span className="hidden sm:block text-sm font-mono text-right w-44 whitespace-nowrap text-[var(--color-text-muted)]">
                          {formatCOPExact(balanceAfter)}
                        </span>
                      </button>

                      {hasFees && isExpanded && (
                        <div className="px-4 pb-3 sm:pl-4">
                          <ul className="ml-1 space-y-1 border-l border-[var(--color-border)] pl-4">
                            <li className="flex items-center gap-3 text-xs">
                              <span className="text-[var(--color-text-muted)]">
                                {t(`${transaction.descriptionKey}_base`)}
                              </span>
                              <span className="ml-auto font-mono text-[var(--color-text-muted)]/90">
                                −{formatCOPExact(Math.abs(transaction.amount))}
                              </span>
                            </li>
                            {transaction.fees!.map((fee) => (
                              <li
                                key={fee.nameKey}
                                className="flex items-center gap-3 text-xs"
                              >
                                <span className="text-[var(--color-text-muted)]">
                                  {t(fee.nameKey)}
                                </span>
                                <span className="ml-auto font-mono text-[var(--color-text-muted)]/90">
                                  −{formatCOPExact(fee.amount)}
                                </span>
                              </li>
                            ))}
                            <li className="flex items-center gap-3 text-xs pt-1 border-t border-[var(--color-border)]">
                              <span className="text-[var(--color-text-muted)] font-medium">
                                {t("col_out")}
                              </span>
                              <span className="ml-auto font-mono text-[var(--color-text)]">
                                −{formatCOPExact(outflow)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Expenses Section */}
      <section className="py-section px-6 lg:px-12 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">
                01
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
              {categoryExpenses.map(({ category, total, items }) => {
                const isExpanded = expandedCategory === category.id;
                const hasItems = items.length > 0;

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
                      {hasItems && (
                        <span className="text-sm font-mono text-[var(--color-text-muted)] whitespace-nowrap">
                          {t("total")}: {formatCOPExact(total)}
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

                    {/* Contributing line items (derived from the ledger) */}
                    {isExpanded && (
                      <div className="border-t border-[var(--color-border)] px-6 py-4">
                        {!hasItems ? (
                          <p className="text-[var(--color-text-muted)] italic text-sm">
                            {t("no_entries")}
                          </p>
                        ) : (
                          <div className="space-y-3">
                            <ul className="space-y-2">
                              {items.map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-center gap-4 py-2 border-b border-[var(--color-border)] last:border-b-0"
                                >
                                  <div className="min-w-0">
                                    <span className="block text-sm text-[var(--color-text)]">
                                      {t(item.labelKey)}
                                    </span>
                                    <span className="block text-xs text-[var(--color-text-muted)]">
                                      {formatTransactionDate(
                                        item.date,
                                        dateLocale,
                                      )}
                                    </span>
                                  </div>
                                  <span className="ml-auto text-sm font-mono text-[var(--color-text-muted)] whitespace-nowrap">
                                    {formatCOPExact(item.amount)}
                                  </span>
                                  {item.receiptUrl && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setViewDoc({
                                          url: item.receiptUrl!,
                                          fileName: `${item.transactionId}.pdf`,
                                        });
                                      }}
                                      className="text-xs font-medium text-[var(--color-text)] hover:opacity-70 transition-opacity whitespace-nowrap"
                                    >
                                      {t("view_receipt")} →
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-[var(--color-text-muted)]/80">
                              {t("expenses_ledger_note")}
                            </p>
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
    </LocaleProvider>
  );
}
