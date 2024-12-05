import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import {CreateItemComponent} from '../create-item/create-item.component';
import { Item } from './item';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CreateItemComponent, CommonModule, 
    MatGridListModule, MatTableModule, MatPaginatorModule,
     MatSortModule, MatFormFieldModule, MatInputModule, 
     MatButtonModule,
     MatDialogActions,
     MatDialogClose,
     MatDialogContent,
     MatDialogTitle,
    ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent implements OnInit {
  title = 'mangodb-angualr';
  items: Item[] = [];
  newItem = { name: '', description: '' };
  isLoading : boolean = false;
  showCreateForm: boolean = false; // Toggle for the create form
  itemToEdit: any = {
    _id: null,
    name: '',
    description: ''
  }; // Item to edit
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['_id', 'name', 'description', 'action'];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe((data: Item[]) => {
      console.log(data);
      this.items = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
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

  ngAfterViewInit() {
    console.log(this.paginator);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateItemDialog(itemId: string | null): void {
    if (itemId != null) {
      this.itemService.getItem(itemId).subscribe((item) => {
        this.itemToEdit = item;
        this.showCreateForm = true;
        const dialogRef = this.dialog.open(CreateItemComponent, {
          width: '400px',
          data: this.itemToEdit,
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(result);
          if (result) {
            this.addOrUpdateItem(result);
          }
        });
      });
    } else {
      const dialogRef = this.dialog.open(CreateItemComponent, {
        width: '400px',
        data: {
          _id: null,
          name: '',
          description: '',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          this.addOrUpdateItem(result);
        }
      });
    }
  }
}

