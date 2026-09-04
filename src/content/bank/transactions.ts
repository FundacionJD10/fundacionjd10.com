/**
 * Bank account transaction ledger for the Fundación JD10.
 * Every movement of the foundation's bank account is recorded here in
 * chronological order. Charges that are part of executing a single operation
 * (e.g. the fees and taxes incurred to pay a salary) are grouped as `fees`
 * under the transaction they belong to.
 */

import type { ExpenseCategoryId } from "@content/expenses/data";

/** A fee or tax incurred as part of executing a parent transaction (always an outflow). */
export interface BankTransactionFee {
  /** Translation key for the fee label */
  nameKey: string;
  /** Amount in COP (Colombian Pesos), positive value */
  amount: number;
}

export interface BankTransaction {
  /** Unique identifier */
  id: string;
  /** Transaction date in YYYY-MM-DD format */
  date: string;
  /** Translation key for the transaction description */
  descriptionKey: string;
  /**
   * Main signed amount in COP: positive = money entering the account,
   * negative = money leaving the account. Grouped `fees` are subtracted on top.
   */
  amount: number;
  /** Expense category for outflows; omitted for inflows (capital, donations). */
  category?: ExpenseCategoryId;
  /** Optional fees/taxes incurred to execute this transaction (each an outflow) */
  fees?: BankTransactionFee[];
  /** Optional receipt/evidence document URL */
  receiptUrl?: string;
}

/**
 * Transactions in chronological order (oldest first). Same-day ordering follows
 * array order.
 */
export const BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: "2026-08-14-initial-capital",
    date: "2026-08-14",
    descriptionKey: "bank_tx_initial_capital",
    amount: 100000,
  },
  {
    id: "2026-08-14-bank-insurance",
    date: "2026-08-14",
    descriptionKey: "bank_tx_bank_insurance",
    amount: -45990,
    category: "bank-account",
  },
  {
    id: "2026-08-31-savings-interest",
    date: "2026-08-31",
    descriptionKey: "bank_tx_savings_interest",
    amount: 1.26,
  },
  {
    id: "2026-09-01-savings-interest",
    date: "2026-09-01",
    descriptionKey: "bank_tx_savings_interest",
    amount: 0.07,
  },
  {
    id: "2026-09-02-donation-founder",
    date: "2026-09-02",
    descriptionKey: "bank_tx_donation_founder",
    amount: 3500000,
  },
  {
    id: "2026-09-02-payroll",
    date: "2026-09-02",
    descriptionKey: "bank_tx_payroll",
    amount: -2000000,
    category: "employee-assistant",
    fees: [
      { nameKey: "bank_fee_nequi_service", amount: 3990 },
      { nameKey: "bank_fee_automatic_payment_vat", amount: 758.1 },
      { nameKey: "bank_fee_email_notification", amount: 280 },
      { nameKey: "bank_fee_email_notification_vat", amount: 53.2 },
      { nameKey: "bank_fee_gmf_4x1000", amount: 8391.6 },
    ],
  },
  {
    id: "2026-09-02-bank-commission",
    date: "2026-09-02",
    descriptionKey: "bank_tx_bank_commission",
    amount: -78000,
    category: "bank-account",
    fees: [{ nameKey: "bank_fee_vat", amount: 14820 }],
  },
  {
    id: "2026-09-03-social-security",
    date: "2026-09-03",
    descriptionKey: "bank_tx_social_security",
    amount: -429600,
    category: "employee-assistant",
  },
];

/** Round to 2 decimal places to avoid floating point drift when summing centavos. */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Total of a transaction's grouped fees (0 when there are none). */
export function getFeesTotal(transaction: BankTransaction): number {
  return round2(
    transaction.fees?.reduce((sum, fee) => sum + fee.amount, 0) ?? 0,
  );
}

/**
 * Net signed impact of a transaction on the balance, including grouped fees.
 * Positive = net inflow, negative = net outflow.
 */
export function getTransactionNet(transaction: BankTransaction): number {
  return round2(transaction.amount - getFeesTotal(transaction));
}

export interface LedgerRow {
  transaction: BankTransaction;
  /** Money entering the account for this row (0 for outflows) */
  inflow: number;
  /** Money leaving the account for this row, fees included (0 for inflows) */
  outflow: number;
  /** Account balance after applying this transaction */
  balanceAfter: number;
}

/**
 * Compute the running balance for every transaction, in chronological order.
 */
export function computeLedger(
  transactions: BankTransaction[] = BANK_TRANSACTIONS,
): LedgerRow[] {
  let balance = 0;
  return transactions.map((transaction) => {
    const net = getTransactionNet(transaction);
    balance = round2(balance + net);
    return {
      transaction,
      inflow: net > 0 ? net : 0,
      outflow: net < 0 ? -net : 0,
      balanceAfter: balance,
    };
  });
}

/** Current account balance (after the most recent transaction). */
export function getCurrentBalance(
  transactions: BankTransaction[] = BANK_TRANSACTIONS,
): number {
  const ledger = computeLedger(transactions);
  return ledger.length > 0 ? ledger[ledger.length - 1].balanceAfter : 0;
}

/**
 * Format an amount in Colombian Pesos, showing centavos only when present.
 */
export function formatCOPExact(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a transaction date (e.g. "2026-09-02") for display.
 */
export function formatTransactionDate(date: string, locale: string): string {
  const [year, month, day] = date.split("-").map((part) => parseInt(part, 10));
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
