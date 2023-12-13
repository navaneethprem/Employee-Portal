import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    AddUserComponent,
    EditUserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    MatMenuModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }