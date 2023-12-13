import { Component, OnInit } from '@angular/core';
import { userModel } from '../user.model';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{
  user:userModel={}

  constructor(private api:UserApiService, private router:Router,private toaster:ToasterService){}
  addUser(){
    console.log(this.user);
    this.api.addUserAPI(this.user).subscribe({
      next:(res:userModel)=>{
        console.log(res);
       this.toaster.showSuccess('New User Added Succesfully!!!');
        this.router.navigateByUrl('/users')
      },
      error:(err:any)=>{
        this.toaster.showError(err.message)
      }
    })
  }
  cancel(){
    this.user={}
  }
}