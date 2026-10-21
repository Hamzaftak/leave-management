export type LeaveStatus = "En attente" | "Approuvée" | "Refusée";

export type LeaveRequest = {
  id: string;
  type: string;
  dates: string;
  days: number;
  status: LeaveStatus;
  reason?: string;
};
