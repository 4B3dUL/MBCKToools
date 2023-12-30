import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastComponent } from 'src/app/shared/bootstrap/components/toast/toast.component';
import { UtilitiesService } from '../../services/utilities.service';
import { RutType } from '../../types/dni-type';

@Component({
    selector: 'app-dni-table',
    templateUrl: './dni-table.component.html',
    styleUrls: ['./dni-table.component.css']
})
export class DniTableComponent implements OnDestroy, OnInit {

    public ruts: string[] = [];
    public selectedRut: string = '';
    private _destroy$ = new Subject<void>();

    @ViewChild(ToastComponent) toastComponent: ToastComponent | undefined;
    @Input() rutType: RutType = 'natural';


    constructor(
        public utils: UtilitiesService
    ) {}

    ngOnInit(): void {
        console.log('ngAfterViewInit');
        
        this.generateRuts();
    }
    
    private generateRuts() {
        this.utils.getFormGroup()
            .pipe(takeUntil(this._destroy$))
            .subscribe(formGroup => {
                if (!formGroup) {
                    throw new Error('Form group not set');
                }

                console.log('cacaa');
                

                const amount = formGroup.get('selectedValue')?.value;
                const selectedFormatOptions = formGroup.get('formatOptions')?.value;

                this.ruts = this.utils.generateValidRut(amount, selectedFormatOptions, this.rutType);
            });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }


    copyRutToClipboard(rut: string) {
        this.utils.copyToClipboard(rut);
        this.selectedRut = rut;
        this.toastComponent!.showToast();
    }

}
