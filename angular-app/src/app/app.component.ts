import { RouterEvent, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemService } from './services/item.service';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from './create-item/create-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mangodb-angualr';
  items: any[] = [];
  newItem = { name: '', description: '' };
  isLoading : boolean = false;
  showCreateForm: boolean = false; // Toggle for the create form

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
  }

  openCreateItemDialog(): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      width: '400px', // Set the desired width of the dialog
      data: {}, // Pass any necessary data to the dialog (optional)
    });

    dialogRef.afterClosed().subscribe((result) => {
      //redirecting to the items page
      this.router.navigate(['/items']);
    });
  }
}
