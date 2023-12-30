import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
    selector: 'app-dni-creator',
    templateUrl: './dni-creator.component.html',
    styleUrls: ['./dni-creator.component.css']
})
export class DniCreatorComponent {

    public rutForm: FormGroup;

    public selectedValue: number = 5;
    public selectedFormatOptions: '1' | '2' | '3' = '1';


    constructor(
        private _fb: FormBuilder,
        private _utils: UtilitiesService
    ) {
        
        this.rutForm = this._fb.group({
            selectedValue: [this.selectedValue, Validators.required],
            formatOptions: [this.selectedFormatOptions, Validators.required]
        });

        this._utils.setFormGroup(this.rutForm);
    }

    generateValidRut(): void {
        this._utils.setFormGroup(this.rutForm);
    }
}
