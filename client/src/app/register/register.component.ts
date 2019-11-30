import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService:ApiService,private toastr: ToastrService) { }

  ngOnInit() {

  }

  public save(name,email,password,mobile){
    let obj={
      "user_name":name,
      "email":email,
      "password":password,
      "mobile_no":mobile
    }
    this.apiService.registerUser(obj)
    .subscribe(res=>this.toastr.success(res.msg))
  }

}
