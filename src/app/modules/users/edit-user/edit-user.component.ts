import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { userModel } from '../user.model';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  user:userModel={}
  constructor(private route:ActivatedRoute,private api:UserApiService,private router:Router, private toaster:ToasterService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      // console.log(res);
      const {id}=res
      // api call to get details of id
      this.getExistingUser(id)
    })
  }

  getExistingUser(id:any){
    this.api.viewUserAPI(id).subscribe((res:any)=>{
      this.user = res
      // console.log(res);
      
    })
  }

  editUser(id:any){
    this.api.updateUserAPI(id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toaster.showSuccess('User Updated Succesfully!!!')
        this.router.navigateByUrl('/users')
      },
      error:(err)=>{
        this.toaster.showError(err.message)
      }
    })
  }

  cancel(id:any){
    this.getExistingUser(id)
  }
}