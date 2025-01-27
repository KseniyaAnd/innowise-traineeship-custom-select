import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter, forwardRef,
    HostListener,
    inject,
    Input,
    Output
} from '@angular/core';
import {SelectItem} from "../../interfaces/select-item";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ]
})
export class MultiSelectComponent implements ControlValueAccessor {
    @Input() items: SelectItem[] = [];
    @Output() selectionChange = new EventEmitter<SelectItem[]>();

    private elementRef = inject(ElementRef);
    isDropdownVisible = false;
    filteredItems: SelectItem[] = [];
    searchText: string = "";

    private onChange: (value: string[]) => void = () => {
    };
    private onTouched: () => void = () => {
    };

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
        const selectedItems = this.items.filter(i => i.selected).map(i => i.name);
        this.onChange(selectedItems);
        this.selectionChange.emit(this.items.filter(i => i.selected));
    }

    showDropdown(): void {
        this.isDropdownVisible = true;
    }

    writeValue(value: string[] | null | undefined): void {
        if (Array.isArray(value)) {
            this.items.forEach(item => {
                item.selected = value.includes(item.name);
            });
        } else {
            this.items.forEach(item => (item.selected = false));
        }
    }


    registerOnChange(fn: (value: string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
