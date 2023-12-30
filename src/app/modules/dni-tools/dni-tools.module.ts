import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DniToolsRoutingModule } from './dni-tools-routing.module';
import { DniToolsComponent } from './dni-tools.component';
import { DniValidatorComponent } from './components/dni-validator/dni-validator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DniCreatorComponent } from './components/dni-creator/dni-creator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DniTableComponent } from './components/dni-table/dni-table.component';


@NgModule({
    declarations: [
        DniToolsComponent,
        DniValidatorComponent,
        DniCreatorComponent,
        DniTableComponent
    ],
    imports: [
        CommonModule,
        DniToolsRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        DniToolsComponent
    ]
})
export class DniToolsModule { }
