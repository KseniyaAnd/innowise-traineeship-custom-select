import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MultiSelectComponent} from "./components/multi-select/multi-select.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MultiSelectComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'innowise-traineeship-custom-select';

  items: Array<any> = [
    { name: 'Derin Chi', image: '', selected: false },
    { name: 'Adeola Mikes', image: '', selected: false },
    { name: 'Homelander', image: '', selected: false },
    { name: 'Chris', image: '', selected: false },
    { name: 'Derek', image: '', selected: false },
    { name: 'Nancy', image: '', email: "nancy@example.com", role: 'developer', selected: false },

  ];

  formControl = new FormControl<string[]>([]);

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(console.log)
  }
}
