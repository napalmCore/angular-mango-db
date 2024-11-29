import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import {CreateItemComponent} from '../create-item/create-item.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CreateItemComponent, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  title = 'mangodb-angualr';
  items: any[] = [];
  newItem = { name: '', description: '' };
  isLoading : boolean = false;
  showCreateForm: boolean = false; // Toggle for the create form

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm; // Toggle the create form visibility
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  addItem(newItem: any): void {
    console.log(newItem);
    this.itemService.addItem(newItem).subscribe((item) => {
      this.items.push(item);
      this.newItem = { name: '', description: '' };
    });
  }
}
