import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    Output
} from '@angular/core';
import {SelectItem} from "../../interfaces/select-item";
import {FormsModule} from "@angular/forms";
import {HighlightDirective} from "../../directives/highlight.directive";

@Component({
    selector: 'app-multi-select',
    standalone: true,
    imports: [
        FormsModule,
        HighlightDirective,
    ],
    templateUrl: './multi-select.component.html',
    styleUrl: './multi-select.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent {
    @Input() items: SelectItem[] = [];
    @Output() selectionChange = new EventEmitter<SelectItem[]>();

    // TODO не searched символы должны быть бледными

    private elementRef = inject(ElementRef);
    isDropdownVisible = false;
    filteredItems: SelectItem[] = [];
    searchText: string = "";

    ngOnInit(): void {
        this.filteredItems = this.items;
    }

    @HostListener('document: click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isDropdownVisible = false;
        }
    }

    filterItems(event: Event): void {
        const searchItem = (event.target as HTMLInputElement).value.toLocaleLowerCase();
        this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(searchItem));
    }

    toggleItem(item: SelectItem, event: MouseEvent): void {
        event.stopPropagation();
        item.selected = !item.selected;
        this.selectionChange.emit(this.items.filter(i => i.selected));
    }

    showDropdown(): void {
        this.isDropdownVisible = true;
    }
}
