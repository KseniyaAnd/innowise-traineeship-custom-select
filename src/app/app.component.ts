import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MultiSelectComponent} from "./components/multi-select/multi-select.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SelectItem} from "./interfaces/select-item";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiSelectComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'innowise-traineeship-custom-select';

  items: Array<SelectItem> = [
    { id: 0, name: 'Derin Chi', selected: false },
    { id: 1, name: 'Adeola Mikes', selected: false },
    { id: 2, name: 'Homelander', selected: false },
    { id: 3, name: 'Chris', selected: false },
    { id: 4, name: 'Derek', selected: false },
    { id: 5, name: 'Nancy', selected: false },
  ];

  formControl = new FormControl<SelectItem>({disabled: false, id: 0, name: "", selected: false, value: undefined});

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(selected => {
      console.log('Selected items:', selected);
    });
  }

}
