import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
  @Output() itemCreated = new EventEmitter<any>(); // EventEmitter for item creation
  addItemForm: FormGroup;

  constructor() {
    this.addItemForm = new FormGroup({
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
