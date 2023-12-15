import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggined(){
    return !!localStorage.getItem("admin_name")
  }
}
