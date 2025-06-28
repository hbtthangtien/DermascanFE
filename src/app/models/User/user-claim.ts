export interface UserClaim {
    PlanId: number;
    UserId: number;
    role: string;
    Fullname: string;
    emailAddress: string;
    nameidentifier: number;
    Image: string;
    Phone: string;
    [key: string]: any;
}
