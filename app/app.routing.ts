import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { DemoComponent }  from './Component/demo/demo/demo';
import { DemoComponent0 }  from './Component/demo/demo0/demo0';
import { DemoComponent }  from './Component/demo/demo/demo';

const appRoutes: Routes = [
    {
        path: 'demo',
        component: DemoComponent
    },
    {
        path: 'demo0',
        component: DemoComponent0
    },
    {
        path: '',
        redirectTo: '/demo',
        pathMatch: 'full'
    },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
