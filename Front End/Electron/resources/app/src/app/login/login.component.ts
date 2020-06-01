import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder ,Validators, NgForm} from '@angular/forms';
import { GlobalService } from '../shared/global.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent
 {
  loggedin: boolean;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-09.-]+.[a-z]{2,4}$";
    hide = true;
    registered: boolean;

  constructor(public service : GlobalService,  private toastr : ToastrService) { }

  ngOnInit()
  {

    this.loggedin= false;
    this.resetForm();

  }


  onSubmit(form : NgForm){
      this.login(form)
  }



  login( form : NgForm){
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.toastr.toastrConfig.timeOut = 1000;
    this.service.Login(form.value).then(value =>
      {
      if (this.service.User != null) {
        this.service.isLoggedIn(this.service.User?.GUID)
        this.toastr.success("You are now logged in!")
       }
      else {
        this.toastr.error("Login credentials incorrect!")
      }
      });

  }

  resetForm(form? : NgForm){

    if (form != null)
    form.resetForm();
    this.service.formDataLogin = {
      UserID : null,
      UserEmail : null,
      UserPassword :null,
      TypeID :null,
      GUID : null,
      GUIDExpiry : null,
      Name : null,
      Surname : null,
      DOB : null,
      GenderID : null,
      TitleID : null
    }
  }
}
