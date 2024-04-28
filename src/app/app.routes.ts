import { Routes } from '@angular/router';

export const routes: Routes = [  
    { path: 'invoice', loadChildren: () => import('./modules/invoice/invoice.module').then(m => m.InvoiceModule),
    }
];
