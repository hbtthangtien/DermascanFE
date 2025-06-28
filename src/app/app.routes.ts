import { Routes } from '@angular/router';
import { HomeComponent } from './user-layout/home/home.component';
import { LoginComponent } from './user-layout/login/login.component';
import { RegisterComponent } from './user-layout/register/register.component';
import { ScanAIComponent } from './user-layout/scan-ai/scan-ai.component';
import { SupportComponent } from './user-layout/support/support.component';
import { FeedbackComponent } from './user-layout/feedback/feedback.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { AdminOrdersComponent } from './Admin/admin-orders/admin-orders.component';
import { AppComponent } from './app.component';
import { AppointmenComponent } from './user-layout/appointmen/appointmen.component';
import { ProfileComponent } from './user-layout/profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { roleGuard } from './role.guard';
import { SkinHistoryComponent } from './user-layout/skin-history/skin-history.component';

export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [roleGuard],
        data: { role: 'ADMIN' },
        children: [
            { path: '', redirectTo: 'orders', pathMatch: 'full' },
            { path: 'orders', component: AdminOrdersComponent }
        ]
    },
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'scan', component: ScanAIComponent },
            { path: 'support', component: SupportComponent },
            { path: 'feedback', component: FeedbackComponent },
            { path: 'appointment', component: AppointmenComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'history', component: SkinHistoryComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },

];
