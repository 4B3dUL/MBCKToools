import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dni-tools' },
    { path: 'dni-tools', loadChildren: () => import('./modules/dni-tools/dni-tools.module').then(m => m.DniToolsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
