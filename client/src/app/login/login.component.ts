import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit() {
  }

  public save(email,password){
    // console.log(email,password)
    this.apiService.validateLogin(email,password)
    .subscribe(data=>{
      if(data.msg='Login Success'){
        // console.log("data",data)
        localStorage.setItem('id',data.user_id)
        localStorage.setItem('name',data.user_name)
        this.router.navigateByUrl('/events')
      }
    })
  }
}
