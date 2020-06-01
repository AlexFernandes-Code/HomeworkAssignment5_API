import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  constructor(public service: GlobalService, private toastr : ToastrService){}

  ngOnInit() :void  {
  }

  resetForm(form? : NgForm){
    if (form != null)
    form.resetForm();
    this.service.formDataSupplier = {
      SupplierID : null,
      SupplierName : null,
      ContactPersonName : null,
      ContactPersonSurname : null,
      ContactPersonEmail : null,
      ContactPersonCell : null
    }
  }

  onSubmit(form : NgForm){
     this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
     this.service.UpdateSupplier(form.value, this.service.User?.GUID).subscribe(res => {
      this.toastr.success('Update succesfull', "Notification")
      this.resetForm(form);
      this.service.GetSuppliers(this.service.User?.GUID); }
    );
  }
}
