import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/shared/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-AddProduct',
  templateUrl: './AddProduct.component.html',
  styleUrls: ['./AddProduct.component.sass']
})

export class AddProductComponent implements OnInit {

  constructor( public  service : GlobalService,  private toastr : ToastrService) { }


  ngOnInit()  {
    this.service.GetSuppliers(this.service.User.GUID);
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
    form.resetForm();
    this.service.formDataProduct = {
      ProductID : null,
      ProductName : '',
      Price : null,
      Quantity : null,
      Image : null,
      SupplierID : null
    }
  }

  onSubmit(form : NgForm){
    this.insertRecord(form);
  }

  insertRecord( form : NgForm){
    this.service.PostNewProduct(form.value, this.service.User?.GUID).subscribe(res =>  {
      this.toastr.success('Update succesfull', "Notification")
      this.resetForm(form);
    })
  }
}
