import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
  @Output() itemCreated = new EventEmitter<any>(); // EventEmitter for item creation
  @Input() itemToEdit: any; // Item to edit
  addItemForm: FormGroup;

  constructor() {
    this.addItemForm = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const newItem = this.addItemForm.value;
      this.itemCreated.emit(newItem);
      this.addItemForm.reset();
    }
  }

}
