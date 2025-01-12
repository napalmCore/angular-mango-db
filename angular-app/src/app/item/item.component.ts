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
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

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
     MatCheckboxModule
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
  displayedColumns: string[] = ['select', '_id', 'name', 'description', 'action'];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  selectedRows: Set<any> = new Set();

  // Check if a row is selected
  isSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  // Toggle selection for a row
  toggleRowSelection(row: any): void {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
  }

  // Check if all rows are selected
  isAllSelected(): boolean {
    return this.selectedRows.size === this.dataSource.data.length;
  }

  isIndeterminate(): boolean {
    return this.selectedRows.size > 0 && this.selectedRows.size < this.dataSource.data.length;
  }

  // Toggle Select All checkbox
  toggleSelectAll(event: any): void {
    if (event.checked) {
      this.selectedRows = new Set(this.dataSource.data);
    } else {
      this.selectedRows.clear();
    }
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
    this.dataSource.paginator = this.paginator;
    
    this.sort.sortChange.subscribe((event) => {
      this.dataSource.sort = this.sort;
    });
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

  openConfirmDeleteItemDialog(itemId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        itemId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(itemId);
      }
    });
  }

  openConfirmDeleteItemsDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {
        itemId: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedRows.forEach((row) => {
          this.deleteItem(row._id);
        });      }
    });
  }
}

