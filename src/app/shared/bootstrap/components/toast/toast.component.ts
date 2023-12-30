import { Component, Input } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
    @Input() message: string = '';

    showToast() {
        const element = document.getElementById('liveToast');
        if (element) {
            const toast = new Toast(element);
            toast.show();
        } else {
            console.error('No se pudo encontrar el elemento con id "liveToast"');
        }
    }
}
