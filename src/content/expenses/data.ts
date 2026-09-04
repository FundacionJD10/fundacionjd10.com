/**
 * Operational expenses for the Fundación JD10.
 *
 * Expenses are NOT stored here directly. The NGO bank account ledger
 * (see `@content/bank/transactions`) is the single source of truth; this module
 * only holds category metadata and derives each category's total and
 * contributing transactions from the ledger outflows. This guarantees the
 * expenses section always reconciles with the bank movements.
 */

import type { BankTransaction } from "@content/bank/transactions";
import { BANK_TRANSACTIONS } from "@content/bank/transactions";

export type ExpenseCategoryId =
  | "employee-assistant"
  | "internet"
  | "bank-account";

export interface ExpenseCategory {
  /** Unique identifier, referenced by `BankTransaction.category` */
  id: ExpenseCategoryId;
  /** Translation key for the category name */
  nameKey: string;
  /** Translation key for the category description */
  descriptionKey: string;
  /** Icon name (using simple identifiers) */
  icon: "employee" | "internet" | "bank" | "utilities" | "other";
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: "employee-assistant",
    nameKey: "expense_employee_assistant",
    descriptionKey: "expense_employee_assistant_desc",
    icon: "employee",
  },
  {
    id: "internet",
    nameKey: "expense_internet",
    descriptionKey: "expense_internet_desc",
    icon: "internet",
  },
  {
    id: "bank-account",
    nameKey: "expense_bank_account",
    descriptionKey: "expense_bank_account_desc",
    icon: "bank",
  },
];

export interface CategoryExpense {
  category: ExpenseCategory;
  /** Total outflow for this category, in COP */
  total: number;
  /** Individual line items contributing to this category, newest first */
  items: ExpenseLineItem[];
}

export interface ExpenseLineItem {
  /** Stable key */
  id: string;
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Translation key for the line label */
  labelKey: string;
  /** Positive outflow amount in COP */
  amount: number;
  /** Originating bank transaction id */
  transactionId: string;
  /** Receipt/evidence URL (optional) */
  receiptUrl?: string;
}

/**
 * Category that absorbs transaction fees and taxes. These are the foundation's
 * cost of doing business (CODB); the beneficiary of a transaction (e.g. the
 * employee) never receives this value, so fees are always attributed here
 * regardless of their parent transaction's category.
 */
const CODB_CATEGORY: ExpenseCategoryId = "bank-account";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Derive per-category expense line items from the ledger outflows. A
 * transaction's base amount is attributed to its own category; its grouped fees
 * are attributed to the CODB category. The sum of all category totals therefore
 * still equals the total money leaving the account.
 */
export function getCategoryExpenses(
  transactions: BankTransaction[] = BANK_TRANSACTIONS,
): CategoryExpense[] {
  const items: (ExpenseLineItem & { category: ExpenseCategoryId })[] = [];

  for (const transaction of transactions) {
    if (transaction.amount < 0 && transaction.category) {
      items.push({
        id: `${transaction.id}-base`,
        date: transaction.date,
        labelKey: transaction.descriptionKey,
        amount: Math.abs(transaction.amount),
        transactionId: transaction.id,
        receiptUrl: transaction.receiptUrl,
        category: transaction.category,
      });
    }
    for (const fee of transaction.fees ?? []) {
      items.push({
        id: `${transaction.id}-${fee.nameKey}`,
        date: transaction.date,
        labelKey: fee.nameKey,
        amount: fee.amount,
        transactionId: transaction.id,
        category: CODB_CATEGORY,
      });
    }
  }

  return EXPENSE_CATEGORIES.map((category) => {
    const categoryItems = items
      .filter((item) => item.category === category.id)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(({ category: _category, ...item }) => item);

    const total = round2(
      categoryItems.reduce((sum, item) => sum + item.amount, 0),
    );

    return { category, total, items: categoryItems };
  });
}

