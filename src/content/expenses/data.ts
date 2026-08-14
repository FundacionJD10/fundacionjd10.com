/**
 * Operational expenses data for the Fundación JD10
 * Each expense category contains monthly entries with optional receipt evidence
 */

export interface ExpenseEntry {
  /** Month in YYYY-MM format */
  month: string;
  /** Amount in COP (Colombian Pesos) */
  amount: number;
  /** Receipt/evidence document URL (optional) */
  receiptUrl?: string;
  /** Additional notes (optional) */
  notes?: string;
}

export interface ExpenseCategory {
  /** Unique identifier for the category */
  id: string;
  /** Translation key for the category name */
  nameKey: string;
  /** Translation key for the category description */
  descriptionKey: string;
  /** Icon name (using simple identifiers) */
  icon: "employee" | "internet" | "bank" | "utilities" | "other";
  /** Monthly expense entries */
  entries: ExpenseEntry[];
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: "employee-assistant",
    nameKey: "expense_employee_assistant",
    descriptionKey: "expense_employee_assistant_desc",
    icon: "employee",
    entries: [
      // Add entries as they become available
      // Example:
      // {
      //   month: "2024-08",
      //   amount: 2500000, // Salary + social security
      //   receiptUrl: "https://archivos.fundacionjd10.com/expenses/2024-08/nomina-asistente.pdf",
      // },
    ],
  },
  {
    id: "internet",
    nameKey: "expense_internet",
    descriptionKey: "expense_internet_desc",
    icon: "internet",
    entries: [
      // Add entries as they become available
    ],
  },
  {
    id: "bank-account",
    nameKey: "expense_bank_account",
    descriptionKey: "expense_bank_account_desc",
    icon: "bank",
    entries: [
      // Add entries as they become available
    ],
  },
];

/**
 * Format amount in Colombian Pesos
 */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format month for display (e.g., "2024-08" -> "Agosto 2024")
 */
export function formatMonth(month: string, locale: string): string {
  const [year, monthNum] = month.split("-");
  const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
  return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
}

/**
 * Get total expenses for a category
 */
export function getCategoryTotal(category: ExpenseCategory): number {
  return category.entries.reduce((sum, entry) => sum + entry.amount, 0);
}

/**
 * Get total expenses for a specific month across all categories
 */
export function getMonthlyTotal(
  categories: ExpenseCategory[],
  month: string
): number {
  return categories.reduce((sum, category) => {
    const entry = category.entries.find((e) => e.month === month);
    return sum + (entry?.amount ?? 0);
  }, 0);
}

/**
 * Get all unique months from all categories, sorted descending (newest first)
 */
export function getAllMonths(categories: ExpenseCategory[]): string[] {
  const months = new Set<string>();
  categories.forEach((category) => {
    category.entries.forEach((entry) => {
      months.add(entry.month);
    });
  });
  return Array.from(months).sort().reverse();
}
