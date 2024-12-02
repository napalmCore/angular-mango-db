import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import {CreateItemComponent} from '../create-item/create-item.component';
import { Item } from './item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CreateItemComponent, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  title = 'mangodb-angualr';
  items: Item[] = [];
  newItem = { name: '', description: '' };
  isLoading : boolean = false;
  showCreateForm: boolean = false; // Toggle for the create form
  itemToEdit: any = null; // Item to edit

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm; // Toggle the create form visibility
    this.itemToEdit = {
      _id: null,
      name: '',
      description: ''
    };
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  addOrUpdateItem(newItem: Item): void {
    console.log(newItem);
    if (newItem._id) {
      this.itemService.updateItem(newItem._id, newItem).subscribe((item) => {
        this.loadItems();
      });
    } else {
      this.itemService.addItem(newItem).subscribe((item) => {
        this.loadItems();
      });
    }
  }

  editItem(itemId: string): void {
    console.log(itemId);
    this.itemService.getItem(itemId).subscribe((item) => {
      this.itemToEdit = item;
      this.showCreateForm = true;
    });
  }

  deleteItem(itemId: string): void {
    this.itemService.deleteItem(itemId).subscribe(() => {
      this.loadItems();
    });
  }
}
