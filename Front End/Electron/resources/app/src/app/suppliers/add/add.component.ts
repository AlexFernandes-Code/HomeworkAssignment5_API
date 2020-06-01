import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {

  constructor( public  service : GlobalService,  private toastr : ToastrService) { }

  ngOnInit()  {
    this.resetForm();
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
    this.insertRecord(form);
  }

  insertRecord( form : NgForm){
    this.service.PostNewSupplier(form.value, this.service.User?.GUID).subscribe(res =>  {
      this.toastr.success('Insert succesfull', "Notification")
      this.resetForm(form);
    })

  }
}
