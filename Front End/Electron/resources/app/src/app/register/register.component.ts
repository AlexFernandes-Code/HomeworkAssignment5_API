
import {Component, OnInit} from '@angular/core';
import {FormControl,FormGroup,FormBuilder ,Validators, NgForm} from '@angular/forms';

import { GlobalService } from '../shared/global.service';
import { ToastrService } from 'ngx-toastr';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})


export class RegisterComponent
  {
    panelOpenState = false;

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

    constructor(private toastr : ToastrService, public service: GlobalService) {}

    ngOnInit()
      {
        this.resetForm();
        this.service.GetUserTypes();
        this.service.GetGender();
        this.service.GetTitles();
        this.registered= false;
      }

      resetForm(form? : NgForm){
        if (form != null)
        form.resetForm();
        this.service.formDataRegister = {
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


      onRegister(formReg : NgForm){
        this.Register(formReg);

      }


      Register( formReg : NgForm){
        this.service.Register(formReg.value).then(value =>
          {
          if (this.service.RegisterStatus != false) {
            this.toastr.success("You are now registered!")
            this.registered= true;
            this.resetForm();
           }
          else {
            this.toastr.error("Use a unique email, please try!")
          }
          });

        }
      }

