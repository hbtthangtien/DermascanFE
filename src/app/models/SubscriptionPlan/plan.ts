export interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    billingCycle: number; // months
    gracePeriodDays: number;
    resultRetentionDays: number;
    freeUsageLimitPerWeek: number;
}
