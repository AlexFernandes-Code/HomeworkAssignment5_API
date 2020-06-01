import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/global.service';
import { NgForm,  FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-EditOrder',
  templateUrl: './EditOrder.component.html',
  styleUrls: ['./EditOrder.component.sass']
})
export class EditOrderComponent implements OnInit {
  form: NgForm;


  constructor( public  service : GlobalService,  private toastr : ToastrService) { }

  ngOnInit() :void  {
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
     this.updateRecord(form)
  }




  updateRecord(form: NgForm) {
    this.service.UpdateOrder(form.value,this.service.User?.GUID).subscribe(res => {
      this.toastr.success('Update succesfull', "Notification")
      this.resetForm(form);
      this.service.GetOrders(this.service.User?.GUID);
    });
  }

}
