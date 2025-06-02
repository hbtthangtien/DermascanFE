import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScanAIComponent } from './scan-ai/scan-ai.component';
import { SupportComponent } from './support/support.component';
import { FeedbackComponent } from './feedback/feedback.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'scan', component:ScanAIComponent},
    {path:'support', component:SupportComponent},
    {path:'feedback',component:FeedbackComponent},






    {path:'', redirectTo:'home',pathMatch:'full'},
    { path: '**', redirectTo: 'home' },
    
];
