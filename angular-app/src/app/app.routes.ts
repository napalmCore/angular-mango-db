import { Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { CreateItemComponent } from './create-item/create-item.component';

export const routes: Routes = [
    {
        path: 'items', component: ItemComponent
    },{
        path: 'items/create', component: CreateItemComponent
    }
];
