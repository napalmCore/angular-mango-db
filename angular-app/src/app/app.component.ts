import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemService } from './services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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
