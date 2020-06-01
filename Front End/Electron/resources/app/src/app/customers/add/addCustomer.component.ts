import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/shared/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-AddCustomer',
  templateUrl: './AddCustomer.component.html',
  styleUrls: ['./AddCustomer.component.sass']
})

export class AddCustomerComponent implements OnInit {


  constructor( public  service : GlobalService,  private toastr : ToastrService) { }

  ngOnInit()  {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
    form.resetForm();
    this.service.formDataCustomer = {
      CustomerID : null,
      Name : '',
      Surname : '',
      Company : '',
      Cell : ''
    }
  }

  onSubmit(form : NgForm){
    this.insertRecord(form);
  }

  insertRecord( form : NgForm){
    this.service.PostNewCustomer(form.value, this.service.User?.GUID).subscribe(res =>  {
      this.toastr.success('Insert succesfull', "Notification")
      this.resetForm(form);
    })

  }

}
