import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { Product } from '../shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

   constructor(public service: GlobalService , private toastr : ToastrService){}
  ngOnInit() {
    this.service.GetSupplierProducts(this.service.User.GUID);
    this.service.GetProducts(this.service.User.GUID);
  }

    populateForm(obj: Product) {
      this.service.formDataProduct = Object.assign({}, obj);
    }

    onDelete(id: number) {
          this.service.DeleteProduct(id,this.service.User?.GUID).then(res => {
            if (this.service.Dependence == true){
              this.toastr.success('Item removed.', "Notification")
              this.service.GetSupplierProducts(this.service.User.GUID);
            }
            if (this.service.Dependence == false){
              this.toastr.toastrConfig.positionClass = 'toast-top-center';
              this.toastr.toastrConfig.timeOut = 3000;
            this.toastr.error('Cannot delete Product. Product is a dependent on a Orders detail. Please first remove Orders detail.', "Notification")
            }
           });



    }
  }
