export interface PurchaseOrderView {
    id: number | string;           // from IdRequest
    planName: string;
    planDescription: string;
    status: string;
    fullName: string;
    code: string;
}
export enum UserPlanStatus {
  Active = 0,
  Pending = 1,
  Expired = 2,
  Canceled = 3,
  Trial = 4,
  Failed = 5
}