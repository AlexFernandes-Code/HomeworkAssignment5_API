import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-EditProduct',
  templateUrl: './EditProduct.component.html',
  styleUrls: ['./EditProduct.component.sass']
})
export class EditProductComponent implements OnInit {

  ngOnInit() :void  {
    this.service.GetSuppliers(this.service.User.GUID);

  }

  constructor( public  service : GlobalService,  private toastr : ToastrService) { }


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
     this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.service.UpdateProduct(form.value, this.service.User?.GUID).subscribe(res => {
      this.toastr.success('Update succesfull', "Notification")
      this.resetForm(form);
      this.service.GetProducts(this.service.User?.GUID);
    });

  }
  }
