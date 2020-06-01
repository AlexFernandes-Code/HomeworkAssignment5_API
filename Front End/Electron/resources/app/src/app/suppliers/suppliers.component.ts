import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from '../shared/supplier.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit {

  constructor(public service: GlobalService, private toastr : ToastrService){}

  ngOnInit() {
    this.service.GetSuppliers(this.service.User.GUID)
  }

  populateForm(obj: Supplier) {
    this.service.formDataSupplier = Object.assign({}, obj);
  }


  onDelete(id: number) {

    this.service.DeleteSupplier(id, this.service.User?.GUID).then(res => {
      if (this.service.Dependence == true){
        this.toastr.success('Item removed.', "Notification")
        this.service.GetSuppliers(this.service.User.GUID);
      }
      if (this.service.Dependence == false){
        this.toastr.toastrConfig.positionClass = 'toast-top-center';
        this.toastr.toastrConfig.timeOut = 3000;
        this.toastr.error('Cannot delete Supplier. Supplier is a dependent to a product. Please remove the product first.', "Notification")
      }
     });

}


}
