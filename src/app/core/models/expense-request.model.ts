export interface ExpenseRequest {
  id: string;
  category: string;
  description: string;
  value: number;
  expenseDate: string;
  requestedBy: string;
  status: number;
  createdAtUtc: string;
  decisionAtUtc?: string | null;
  decisionBy?: string | null;
  rejectionReason?: string | null;
}

export interface ExpenseRequestCreate {
  category: string;
  description: string;
  value: number;
  expenseDate: string;
  requestedBy: string;
}

export interface ExpenseRequestUpdate {
  category: string;
  description: string;
  value: number;
  expenseDate: string;
}

export interface DecisionDto {
  decisionBy: string;
}

export interface RejectDto {
  decisionBy: string;
  reason: string;
}
