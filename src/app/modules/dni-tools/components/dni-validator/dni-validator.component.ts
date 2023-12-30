import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-dni-validator',
  templateUrl: './dni-validator.component.html',
  styleUrls: ['./dni-validator.component.css']
})
export class DniValidatorComponent implements AfterViewInit, OnDestroy{

    private _rutValueChangeSubscription$?: Subscription;
    
    public validateForm: FormGroup;
    @ViewChild('validOrInvalidRutText') rutValidationText: ElementRef | undefined;

    constructor(
        private _fb: FormBuilder, 
        private _renderer: Renderer2,
        private _utils: UtilitiesService
    ) {
        this.validateForm = this._fb.group({
            rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\.?\d{3}\.?\d{3}-?[\dkK]$/)]],
        });
    }
    ngAfterViewInit(): void {
        this.rutValidationText!.nativeElement.textContent = '';
        this._rutValueChangeSubscription$ = this.validateForm.get('rut')?.valueChanges.subscribe(() => {
            this.rutValidationText!.nativeElement.textContent = '';
        });
    }

    ngOnDestroy(): void {
        this._rutValueChangeSubscription$?.unsubscribe();
    }

    private setValidationTextAndClass(text: string, textClass: string, removeClass: string) {
        this._renderer.removeClass(this.rutValidationText?.nativeElement, removeClass);
        this._renderer.addClass(this.rutValidationText?.nativeElement, textClass);
        this.rutValidationText!.nativeElement.textContent = text;
    }

    validateRut(): boolean {
        let rutValue = this.validateForm.get('rut')?.value;

        // Elimina los puntos, guiones y convierte a mayúsculas
        rutValue = rutValue.replace(/[\.\-]/g, '').toUpperCase();

        // Divide el RUT y el dígito verificador
        const rut = rutValue.slice(0, -1);
        const dv = rutValue.slice(-1);

        // Calcula el dígito verificador
        const dvCalculado = this._utils.calcularDigitoVerificador(parseInt(rut));

        // Compara el dígito verificador calculado con el proporcionado
        console.log(dvCalculado === dv);

        if (dvCalculado === dv) {
            this.setValidationTextAndClass('Rut válido', 'text-success', 'text-danger');
            return true;
        } else {
            this.setValidationTextAndClass('Rut inválido', 'text-danger', 'text-success');
            return false;
        }
    }

}