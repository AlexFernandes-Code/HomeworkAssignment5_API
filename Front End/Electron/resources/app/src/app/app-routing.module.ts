import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from '../app/customers/add/addCustomer.component';
import { AddProductComponent } from '../app/products/add/AddProduct.component';
import { AddOrderComponent } from '../app/orders/add/AddOrder.component';
import { EditCustomerComponent } from './customers/edit/EditCustomer.component';
import { EditOrderComponent } from './orders/edit/EditOrder.component';
import { EditProductComponent } from './products/edit/EditProduct.component';
import { CustomerComponent } from '../app/customers/customer.component';
import { ProductComponent } from '../app/products/product.component';
import { OrderComponent } from '../app/orders/order.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmpGuard } from './guards/emp.guard';
import { ManagerGuard } from './guards/manager.guard';
import { AddComponent } from './suppliers/add/add.component';
import { EditComponent } from './suppliers/edit/edit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  {path:'', redirectTo:'Home', pathMatch:'full'},
  {path:'AddCustomer' , component: AddCustomerComponent, canActivate : [ManagerGuard]},
  {path:'AddProduct' , component: AddProductComponent, canActivate : [ManagerGuard]},
  {path:'AddOrder' , component: AddOrderComponent, canActivate : [EmpGuard]},
  {path:'EditCustomer' , component: EditCustomerComponent , canActivate : [ManagerGuard]},
  {path:'Customer' , component: CustomerComponent, canActivate : [ManagerGuard]},
  {path:'Home' , component: HomeComponent},
  {path:'Register' , component: RegisterComponent},
  {path:'Login' , component: LoginComponent},
  {path:'Product' , component: ProductComponent, canActivate : [ManagerGuard]},
  {path:'Order' , component: OrderComponent, canActivate : [EmpGuard]},
  {path:'EditOrder' , component: EditOrderComponent, canActivate : [EmpGuard]},
  {path:'EditProduct' , component: EditProductComponent, canActivate : [ManagerGuard]},
  {path:'Supplier' , component: SuppliersComponent, canActivate : [ManagerGuard]},
  {path:'AddSupplier' , component: AddComponent, canActivate : [ManagerGuard]},
  {path:'EditSupplier' , component: EditComponent, canActivate : [ManagerGuard]},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
