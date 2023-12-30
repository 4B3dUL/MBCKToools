import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import { RutType } from '../types/dni-type';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    public copiedRut: string = '';

    public behaviorFormGroup: BehaviorSubject<FormGroup | null> = new BehaviorSubject<FormGroup | null>(null);

    constructor() { }

    setFormGroup(formGroup: FormGroup) {
        // console.log('formGroup', formGroup);

        this.behaviorFormGroup.next(formGroup);
    }

    getFormGroup() {
        // console.log('getFormGroup');
        return this.behaviorFormGroup.asObservable();
    }

    calcularDigitoVerificador(rut: number): string {

        let suma = 0;
        let multiplicador = 2;
        const rutStr = rut.toString().split('').reverse().join('');

        for (let char of rutStr) {
            suma += Number(char) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const mod = suma % 11;
        if (mod === 1) {
            return 'k';
        } else if (mod === 0) {
            return '0';
        } else {
            return (11 - mod).toString();
        }
    }

    exportToCsv(data: string[]) {
        const csvData = data.join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'ruts.csv');
    }

    exportToTxt(data: string[]) {
        let txtData = data.join('\n');
        var blob = new Blob([txtData], { type: 'text/plain' });
        saveAs(blob, 'ruts.txt');
    }

    exportToJSON(data: string[]): void {
        const blob = new Blob([JSON.stringify(data)], { type: 'text/json;charset=utf-8' });
        saveAs(blob, 'ruts.json');
    }

    copyToClipboard(rut: string) {
        navigator.clipboard.writeText(rut).then(() => {
            this.copiedRut = rut;
        });
    }

    generateValidRut(amount: number, selectedFormatOptions: string, rutType: RutType): string[] {
        const ruts: string[] = [];


        if (rutType === 'juridico') {
            // Aquí va el código que se ejecutará si rut.rutType es igual a 'jurídico'
            for (let i = 0; i < amount; i++) {
                const min = 50000000;
                const max = 99999999;
                const factor = max - min + 1;
                const random = Math.floor(Math.random() * factor) + min;
                const dv = this.calcularDigitoVerificador(random);

                ruts.push(this.formatRutOptios(random, dv, selectedFormatOptions));
            }

        } else if (rutType === 'natural') {
            // Aquí va el código que se ejecutará si rut.rutType es igual a 'natural'
            for (let i = 0; i < amount; i++) {
                const min = 4000000;
                const max = 23000000;
                const factor = max - min + 1;
                const random = Math.floor(Math.random() * factor) + min;
                const dv = this.calcularDigitoVerificador(random);

                ruts.push(this.formatRutOptios(random, dv, selectedFormatOptions));
            }
        }

        return ruts;
    }

    private formatRutOptios(random: number, dv: string, selectedFormatOptions: string): string {
        let rut: string;

        switch (selectedFormatOptions) {
            case '1': //Solo guión (xxxxxxxx-x)
                rut = `${random}-${dv}`;
                break;
            case '2': //Punto y guión (xx.xxx.xxx-x)
                rut = `${random}${dv}`.replace(/(\d{1,2})(\d{3})(\d{3})(\w)/, "$1.$2.$3-$4");
                break;
            case '3': //Sin puntos ni guión (xxxxxxxxx)
                rut = `${random}-${dv}`.replace('-', '');
                break;
            default:
                rut = `${random}-${dv}`;
                break;
        }

        return rut;
    }

    public formatRut(value: string): string {
        const rut = value.replace(/\./g, '').replace('-', '');
        return rut.replace(/(\d{1,2})(\d{3})(\d{3})(\w)/, "$1.$2.$3-$4");
    }
}
