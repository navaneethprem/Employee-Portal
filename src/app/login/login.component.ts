import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private api:AdminApiService,private router:Router,private toaster:ToasterService){}

  Login(){
    if(this.email || this.password){
      this.api.authenticate().subscribe({
        next:(res:any)=>{
          const {email,password} = res
          if(email===this.email && password===this.password){
            // save admin details
            localStorage.setItem("admin_name",res.name)
            localStorage.setItem("admin_pswd",res.password)
            this.toaster.showSuccess("Login Success")
            this.router.navigateByUrl('dashboard')
          }else{
            this.toaster.showWarning('Invalid Email/Password')
          }
        },
        error:(res:any)=>{
          this.toaster.showError(res.massage)
        }
      })
    }else{
      this.toaster.showWarning("Please fill the form completely")
    }
  }
  
}