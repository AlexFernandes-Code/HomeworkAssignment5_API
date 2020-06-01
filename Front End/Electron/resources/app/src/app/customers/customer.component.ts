import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { Customer } from '../shared/customer.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {

  constructor(public service: GlobalService, private toastr : ToastrService){}
  ngOnInit() {
    this.service.GetCustomers(this.service.User?.GUID);
  }

    populateForm(obj: Customer) {
      this.service.formDataCustomer = Object.assign({}, obj);
    }
  
    onDelete(id: number) {

          this.service.DeleteCustomer(id, this.service.User?.GUID).then(res => {
            if (this.service.Dependence == true){
              this.toastr.success('Item removed.', "Notification") 
              this.service.GetCustomers(this.service.User.GUID);
            }
            if (this.service.Dependence == false){
              this.toastr.toastrConfig.positionClass = 'toast-top-center';
              this.toastr.toastrConfig.timeOut = 3000;
              this.toastr.error('Cannot delete Customer. Customer is a dependent to a order. Please remove order first.', "Notification") 
            }
           }); 

    }

    }