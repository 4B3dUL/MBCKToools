import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BootstrapModule } from './bootstrap/bootstrap.module';
import { ToastComponent } from './bootstrap/components/toast/toast.component';
import { TooltipDirective } from './bootstrap/directives/tooltip.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    BootstrapModule
  ], exports: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    TooltipDirective
  ]
})
export class SharedModule { }
