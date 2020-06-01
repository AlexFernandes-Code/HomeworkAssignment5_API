import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { Order } from '../shared/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})


export class OrderComponent implements OnInit {


  constructor(public service: GlobalService , private toastr : ToastrService){}
  ngOnInit() {
    this.service.GetOrders(this.service.User?.GUID);
  }

    populateForm(obj: Order) {
      this.service.formDataOrder = Object.assign( obj);
    }
  
    onDelete(id: number) {
          this.service.DeleteOrder(id,this.service.User?.GUID).then(res => {
            if (this.service.Dependence == true){
              this.toastr.success('Order removed.', "Notification") 
              this.service.GetOrders(this.service.User.GUID);
            }
            if (this.service.Dependence == false){
              this.toastr.toastrConfig.positionClass = 'toast-top-center';
              this.toastr.toastrConfig.timeOut = 3000;
            this.toastr.error('Cannot delete order. Order is a dependent on Order detail. Please first removed this orders details.', "Notification") 
            }
           }); 



    }
  }