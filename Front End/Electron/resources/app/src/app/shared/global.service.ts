import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Customer } from './customer.model';
import { Product } from './product.model';
import { Order } from './order.model';
import { User } from '../shared/user.model';
import { Usertype } from '../shared/usertype.model';
import { Title } from './title.model';
import { Gender } from './gender.model';
import { Supplier } from './supplier.model';
import { SupplierProduct } from './supplier-product';



@Injectable({
  providedIn: 'root'
})
export class GlobalService
 {
    /* readonly URL = "http://192.168.1.97/HomeworkAssignment1_17039917/api"  */
    readonly URL = "http://localhost:59623/api"
    constructor(private http : HttpClient) { }



    /*---------------------------------------------------------------------------------------------------------------------------------

                                                                    Customers

    -----------------------------------------------------------------------------------------------------------------------------------*/
    formDataCustomer : Customer;
    listCustomer : Customer[];

    PostNewCustomer(formDataCustomer : Customer, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
        return this.http.post(this.URL + '/PostNewCustomer/', formDataCustomer, {params:myPar});
    }

    GetCustomers(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getCustomers', {params:myPar}).toPromise().then(res=> this.listCustomer = res as Customer[]);
    }

    UpdateCustomer(formDataCustomer : Customer, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.put(this.URL+'/UpdateCustomer/'+formDataCustomer.CustomerID,formDataCustomer,{params:myPar});
    }

    Dependence : boolean;
    DeleteCustomer(id : number, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.delete(this.URL+'/DeleteCustomer/'+id,{params:myPar}).toPromise().then(res=> this.Dependence = res as boolean);
    }



     /*---------------------------------------------------------------------------------------------------------------------------------

                                                                 Products

      -----------------------------------------------------------------------------------------------------------------------------------*/
      formDataProduct : Product;
    listProduct : Product[];

    PostNewProduct(formDataProduct : Product, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.post(this.URL + '/PostNewProduct/', formDataProduct, {params:myPar});
    }

    GetProducts(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getProducts', {params:myPar}).toPromise().then(res=> this.listProduct = res as Product[]);
    }

    UpdateProduct(formDataProduct : Product, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.put(this.URL+'/UpdateProduct/'+formDataProduct.ProductID,formDataProduct, {params:myPar});
    }

    DeleteProduct(id : number, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.delete(this.URL+'/DeleteProduct/'+id, {params:myPar}).toPromise().then(res=> this.Dependence = res as boolean);
    }



    /*---------------------------------------------------------------------------------------------------------------------------------

                                                                 Suppliers

    -----------------------------------------------------------------------------------------------------------------------------------*/
    formDataSupplier : Supplier;
    listSupplier : Supplier[];
    listSupplierProduct : SupplierProduct[];

    PostNewSupplier(formDataSupplier : Product, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.post(this.URL + '/PostNewSupplier/', formDataSupplier, {params:myPar});
    }

    GetSuppliers(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getSuppliers', {params:myPar}).toPromise().then(res=> this.listSupplier = res as Supplier[])

    }

    GetSupplierProducts(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getSupplierProducts', {params:myPar}).toPromise().then(res=> this.listSupplierProduct = res as SupplierProduct[])

    }

    UpdateSupplier(formDataSupplier : Supplier, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.put(this.URL+'/UpdateSupplier/'+formDataSupplier.SupplierID,formDataSupplier, {params:myPar});
    }

    DeleteSupplier(id : number, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.delete(this.URL+'/DeleteSupplier/'+id, {params:myPar}).toPromise().then(res=> this.Dependence = res as boolean);
    }


    /*---------------------------------------------------------------------------------------------------------------------------------

                                                                Orders

    -----------------------------------------------------------------------------------------------------------------------------------*/
    formDataOrder : Order;
    listOrder : Order[];

    PostNewOrder(formDataOrder : Order, guid : string)
    {
        let myPar = new HttpParams().set('guid',guid);
        return this.http.post(this.URL + '/PostNewOrder/', formDataOrder, {params:myPar});
    }

    GetOrders(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getOrders', {params:myPar}).toPromise().then(res=> this.listOrder = res as Order[]);
    }


    UpdateOrder(formDataOrder : Order, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.put(this.URL+'/UpdateOrder/'+formDataOrder.OrderID,formDataOrder, {params:myPar});
    }

    DeleteOrder(id : number, guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      return this.http.delete(this.URL+'/DeleteOrder/'+id, {params:myPar}).toPromise().then(res=> this.Dependence = res as boolean);
    }

    GetDate()
    {
    return (new Date()).toISOString();
    }



    /*---------------------------------------------------------------------------------------------------------------------------------

                                                                 Users

    -----------------------------------------------------------------------------------------------------------------------------------*/


    formDataUserTypes : Usertype;
    listUserTypes : Usertype[];

    GetUserTypes(){
      this.http.get(this.URL + '/getUserTypes').toPromise().then(res=> this.listUserTypes = res as Usertype[]);
    }

    listUser: User[];
    GetUsers(guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/getUsers', {params:myPar}).toPromise().then(res=> this.listUser = res as User[]);
    }





    /*---------------------------------------------------------------------------------------------------------------------------------

                                                        User Access

    -----------------------------------------------------------------------------------------------------------------------------------*/
    formDataLogin : User;
    User : User
    user : number;

    Login(formDataLogin : User)
    {

      return this.http.post<User>(this.URL + '/Login/', formDataLogin).toPromise()
      .then(res=> this.User = res as User );
    }

    formDataRegister : User;
    RegisterStatus : boolean;

    Register(formDataRegister : User)
    {
        return this.http.post(this.URL + '/Register/', formDataRegister).toPromise().then(res=> this.RegisterStatus = res as boolean);
    }

    Logout(guid)
    {
        let myPar = new HttpParams().set('guid',guid);
        return this.http.get(this.URL + '/Logout/',{params:myPar}).toPromise().then(res => this.User = res as User);
    }


    LoggedIn : boolean;

    isLoggedIn( guid : string)
    {
      let myPar = new HttpParams().set('guid',guid);
      this.http.get(this.URL + '/isLoggedIn/', {params:myPar}).toPromise().then(res=> this.LoggedIn = res as boolean);
    }


    listGender : Gender[];

    GetGender(){
      this.http.get(this.URL + '/getGender').toPromise().then(res=> this.listGender = res as Gender[]);
    }


    listTitles : Title[];

    GetTitles(){
      this.http.get(this.URL + '/getTitle').toPromise().then(res=> this.listTitles = res as Title[]);
    }





  }

