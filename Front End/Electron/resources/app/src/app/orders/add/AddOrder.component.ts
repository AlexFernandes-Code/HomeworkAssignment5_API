import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-AddOrder',
  templateUrl: './AddOrder.component.html',
  styleUrls: ['./AddOrder.component.sass']
})



export class AddOrderComponent implements OnInit {



  constructor( public  service : GlobalService,  private toastr : ToastrService) { }

  ngOnInit()  {
    this.resetForm();
    this.service.GetCustomers(this.service.User.GUID);
    this.service.GetUsers(this.service.User.GUID);
    this.service.GetProducts(this.service.User.GUID);
  }

  resetForm(form? : NgForm){
    if (form != null)
    form.resetForm();
    this.service.formDataOrder = {
      OrderID : null,
      OrderDate :  new Date(),
      UserID : null,
      ProductID : null,
      CustomerID : null,
      Customer : null,
      User : null,
      ProductName: null,
      ProductPrice: null,
      Quantity: null
    }
  }

  onSubmit(form : NgForm){
    this.insertRecord(form);
  }

  insertRecord( form : NgForm){
    this.service.PostNewOrder(form.value,this.service.User?.GUID).subscribe(res =>  {
      this.toastr.success('Insert succesfull', "Notification")
      this.resetForm(form);
    })
  }
}
