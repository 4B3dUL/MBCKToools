import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit {

    @Input('appTooltip') config: { 
        text: string; 
        position: 'top' | 'bottom' | 'left' | 'right'; 
        options?: any;
    } | undefined;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        const { text = '', position = 'top' } = this.config || {};
        new Tooltip(this.el.nativeElement,  {
            title: text,
            placement: position,
            trigger: 'hover',
            ...this.config?.options
        });
    }
}
