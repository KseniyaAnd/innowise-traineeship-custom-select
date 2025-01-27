import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
    @Input() searchWord: string = '';
    @Input() content: string = '';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.content) {
            return
        }

        if (this.searchWord || this.searchWord.length) {
            this.renderer.setStyle(
                this.el.nativeElement,
                'color',
                'gray'
            );
        }

        if (!this.searchWord || !this.searchWord.length) {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
            return;
        }

        this.renderer.setProperty(
            this.el.nativeElement,
            'innerHTML',
            this.getFormattedText(),
        )
    }

    getFormattedText() {
        const re = new RegExp(`(${this.searchWord})`, 'gi');
        return this.content.replace(re, '<span style="color: black; font-weight: bold">$1</span>');
    }
}
