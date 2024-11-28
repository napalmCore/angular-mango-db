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

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  addItem(): void {
    this.itemService.addItem(this.newItem).subscribe((item) => {
      this.items.push(item);
      this.newItem = { name: '', description: '' };
    });
  }

}
