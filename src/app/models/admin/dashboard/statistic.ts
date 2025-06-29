import { MonthlyStats } from "./monthly-stats";
import { PiePlan } from "./pie-plan";
import { PlanRevenue } from "./plan-revenue";

export interface Statistic {
    totalUsers: number;
    totalUsersRegisteredPlan: number;
    activeUsers: number;
    totalRevenue: number;
    piePlan: PiePlan[];
    monthlyStats: MonthlyStats[];
    planRevenues: PlanRevenue[];
}
