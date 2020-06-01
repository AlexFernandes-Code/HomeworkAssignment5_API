import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-EditCustomer',
  templateUrl: './EditCustomer.component.html',
  styleUrls: ['./EditCustomer.component.sass']
})
export class EditCustomerComponent implements OnInit {



  constructor(public service: GlobalService, private toastr : ToastrService){}

  ngOnInit() :void  {

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

     this.updateRecord(form);
  }


  updateRecord(form: NgForm) {
     this.service.UpdateCustomer(form.value, this.service.User?.GUID).subscribe(res => {
      this.toastr.success('Update succesfull', "Notification")
      this.resetForm(form);
      this.service.GetCustomers(this.service.User?.GUID); }
    );
  }

}
