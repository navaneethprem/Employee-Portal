import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  profileImage:string = "./assets/images/edit.png"
  editAdminStatus:boolean = false
  adminDetails:any = {}
  @Output() onAdminChange = new EventEmitter()
  constructor(private api:AdminApiService,private toastr:ToasterService){}

  ngOnInit(): void {
      // get admin details
      this.api.authenticate().subscribe((res:any)=>{
        this.adminDetails = res
        if(res.picture){
          this.profileImage = res.picture
        }
      })
  }
  editAdminBtnClicked(){
    this.editAdminStatus = true
  }
  getFile(event:any){
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage
    }  
  }

  updateAdmin(){
    this.api.updateAdmin(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.toastr.showSuccess("Admin details updates Successfully")
        localStorage.setItem("admin_name",res.name)
        localStorage.setItem("admin_pswd",res.password)
        this.editAdminStatus = false
        this.onAdminChange.emit(res.name)
      },
      error:(err:any)=>{
        this.toastr.showError("Updation failed!!! Please try after some time...")
      }
    })
  }

  cancel(){
    this.editAdminStatus = false
  }
}
