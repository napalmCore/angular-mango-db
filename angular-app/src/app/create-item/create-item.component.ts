import { Component, EventEmitter, inject, Input, model, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../item/item';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSlideToggleModule, FormsModule, MatDialogClose],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
  @Output() itemCreated = new EventEmitter<any>(); // EventEmitter for item creation

  addItemForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<CreateItemComponent>);
  readonly data = inject<Item>(MAT_DIALOG_DATA);
  readonly animal = model(this.data);
  pageTitle = 'Create Item';
 
  constructor() {
    if (this.data._id) {
      this.pageTitle = 'Edit Item';
    } 
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
      this.dialogRef.close(newItem);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
