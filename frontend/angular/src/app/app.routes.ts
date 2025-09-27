import { Routes } from '@angular/router';
import { Customer } from './components/customer/customer';
import { Login } from './components/login/login';
import { AccessGuard } from './services/guard/access-guard';
import { Register } from './components/register/register';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'customers',
        component: Customer,
        canActivate: [AccessGuard]
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'register',
        component: Register,
    },
    // { 
    //     path: '', 
    //     redirectTo: 'customers', 
    //     pathMatch: 'full' 
    // },
];
