import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DniToolsComponent } from './dni-tools.component';

const routes: Routes = [
    { path: '', component: DniToolsComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DniToolsRoutingModule { }
