 using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Data.Entity;
using System.Web.Http;
using HomeworkAssignment1_17039917.Models;
using System.Web.Http.Cors;



namespace HomeworkAssignment1_17039917.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods: "*")]
    public class APIController : ApiController
    {

        public HomeworkAssignment3_17039917Entities2 db = new HomeworkAssignment3_17039917Entities2();
        Authentication Auth = new Authentication();    


        /*---------------------------------------------------------------------------------------------------------------------------------

                                                                    Customers

        -----------------------------------------------------------------------------------------------------------------------------------*/
                    
        [System.Web.Http.Route("api/getCustomers")]
        [HttpGet]
        public List<dynamic> getCustomers(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var customers = db.Customers.ToList();
                    List<dynamic> listCustomers = new List<dynamic>();
                    foreach (Customer cus in customers)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.CustomerID = cus.CustomerID;           
                        obj.Name = cus.Name;
                        obj.Surname = cus.Surname;
                        obj.Cell = cus.Cell;
                        obj.Company = cus.Company;
                        listCustomers.Add(obj);
                    }
                    return listCustomers;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

      

        [System.Web.Http.Route("api/PostNewCustomer")]
        [HttpPost]
        public List<dynamic> PostNewCustomer([FromBody] Customer obj, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {

                    db.Configuration.ProxyCreationEnabled = false;
                    db.Customers.Add(obj);
                    db.SaveChanges();
                    return getCustomers(guid);
                }
                catch
                {
                    return null;
                }
           
            }
            else
            {
                return null;
            }

        }

        [System.Web.Http.Route("api/UpdateCustomer/{id}")]
        [HttpPut]
        public List<dynamic> UpdateCustomer([FromBody] Customer newCustomer, int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var result = db.Customers.Where(b => b.CustomerID == id).FirstOrDefault();
                    result.Name = newCustomer.Name;
                    result.Surname = newCustomer.Surname;
                    result.Cell = newCustomer.Cell;
                    result.Company = newCustomer.Company;
                    db.SaveChanges();
                    return getCustomers(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/DeleteCustomer/{id}")]
        [HttpDelete]
        public bool DeleteCustomer(int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    Customer t = db.Customers.Find(id);
                    db.Customers.Remove(t);
                    db.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }


        /*---------------------------------------------------------------------------------------------------------------------------------

                                                                   Suppliers

       -----------------------------------------------------------------------------------------------------------------------------------*/

        [System.Web.Http.Route("api/getSuppliers")]
        [HttpGet]
        public List<dynamic> getSuppliers(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var suppliers = db.Suppliers.ToList();
                    List<dynamic> listSuppliers = new List<dynamic>();
                    foreach (Supplier sup in suppliers)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.SupplierID = sup.SupplierID;
                        obj.SupplierName = sup.SupplierName;
                        obj.ContactPersonName = sup.ContactPersonName;
                        obj.ContactPersonSurname = sup.ContactPersonSurname;
                        obj.ContactPersonEmail = sup.ContactPersonEmail;
                        obj.ContactPersonCell = sup.ContactPersonCell;
                        listSuppliers.Add(obj);
                    }
                    return listSuppliers;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/PostNewSupplier")]
        [HttpPost]
        public List<dynamic> PostNewSupplier([FromBody] Supplier obj, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {

                    db.Configuration.ProxyCreationEnabled = false;
                    db.Suppliers.Add(obj);
                    db.SaveChanges();
                    return getSuppliers(guid);
                }
                catch
                {
                    return null;
                }

            }
            else
            {
                return null;
            }

        }

        [System.Web.Http.Route("api/UpdateSupplier/{id}")]
        [HttpPut]
        public List<dynamic> UpdateSupplier([FromBody] Supplier newSupplier, int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var result = db.Suppliers.Where(b => b.SupplierID == id).FirstOrDefault();
                    result.SupplierName = newSupplier.SupplierName;
                    result.ContactPersonCell = newSupplier.ContactPersonCell;
                    result.ContactPersonEmail = newSupplier.ContactPersonEmail;
                    result.ContactPersonName = newSupplier.ContactPersonName;
                    result.ContactPersonSurname = newSupplier.ContactPersonSurname;
                    db.SaveChanges();
                    return getSuppliers(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/DeleteSupplier/{id}")]
        [HttpDelete]
        public bool DeleteSupplier(int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    Supplier t = db.Suppliers.Find(id);
                    db.Suppliers.Remove(t);
                    db.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        /*---------------------------------------------------------------------------------------------------------------------------------

                                                                 Products

        -----------------------------------------------------------------------------------------------------------------------------------*/


        [System.Web.Http.Route("api/getProducts")]
        [HttpGet]
        public List<dynamic> getProducts(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var products = db.Products.ToList();
                    List<dynamic> listProducts = new List<dynamic>();
                    foreach (Product pro in products)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.ProductID = pro.ProductID;
                        obj.ProductName = pro.ProductName;
                        obj.Image = pro.Image;
                        obj.Quantity = pro.Quantity;
                        obj.Price = pro.Price;
                        obj.SupplierID = pro.SupplierID;
                 //       obj.Supplier = pro.Supplier;
                        listProducts.Add(obj);
                    }
                    return listProducts;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/getSupplierProducts")]
        [HttpGet]
        public List<dynamic> getSupplierProducts(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var products = db.Products.ToList();
                    List<dynamic> listProducts = new List<dynamic>();
                    foreach (Product pro in products)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.ProductID = pro.ProductID;
                        obj.ProductName = pro.ProductName;
                        obj.Image = pro.Image;
                        obj.Quantity = pro.Quantity;
                        obj.Price = pro.Price;
                        obj.SupplierID = pro.SupplierID;
                        obj.SupplierName = pro.Supplier.SupplierName;
                        obj.ContactPersonCell = pro.Supplier.ContactPersonCell;
                        obj.ContactPersonEmail = pro.Supplier.ContactPersonEmail;
                        obj.ContactPersonName = pro.Supplier.ContactPersonName;
                        obj.ContactPersonSurname = pro.Supplier.ContactPersonSurname;               
                        listProducts.Add(obj);
                    }
                    return listProducts;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }


        [System.Web.Http.Route("api/PostNewProduct")]
        [HttpPost]
        public List<dynamic> PostNewProduct([FromBody] Product obj, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    db.Products.Add(obj);
                    db.SaveChanges();
                    return getProducts(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }


        [System.Web.Http.Route("api/UpdateProduct/{id}")]
        [HttpPut]
        public List<dynamic> UpdateProduct([FromBody] Product obj, int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var result = db.Products.Where(b => b.ProductID == id).FirstOrDefault();
                    result.ProductName = obj.ProductName;
                    result.Image = obj.Image;
                    result.Quantity = obj.Quantity;
                    result.Price = obj.Price;
                    result.SupplierID = obj.SupplierID;
                    db.SaveChanges();
                    return getProducts(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }


        [System.Web.Http.Route("api/DeleteProduct/{id}")]
        [HttpDelete]
        public bool DeleteProduct(int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    Product t = db.Products.Find(id);
                    db.Products.Remove(t);
                    db.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }


        /*---------------------------------------------------------------------------------------------------------------------------------

                                                                Orders

        -----------------------------------------------------------------------------------------------------------------------------------*/


        [System.Web.Http.Route("api/getOrders")]
        [HttpGet]
        public List<dynamic> getOrders(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var orders = db.Orders.ToList();
                    List<dynamic> listOrders = new List<dynamic>();
                    foreach (Order odt in orders)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.OrderID = odt.OrderID;
                        obj.ProductID = odt.ProductID;
                        obj.UserID = odt.UserID;
                        obj.CustomerID = odt.CustomerID;
                        obj.Customer = odt.Customer.Name + " " + odt.Customer.Surname + " from " + odt.Customer.Company;
                        obj.User = "(" + odt.User.UserID + ") " + odt.User.Name + " " + odt.User.Surname;
                        obj.OrderDate = odt.OrderDate.ToShortDateString();
                        obj.ProductName = odt.Product.ProductName;
                        obj.ProductPrice = odt.Product.Price;
                        obj.Quantity = odt.Product.Quantity;
                        listOrders.Add(obj);
                    }
                    return listOrders;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/getUsers")]
        [HttpGet]
        public List<dynamic> getUsers(string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var users = db.Users.ToList();
                    List<dynamic> listUser = new List<dynamic>();
                    foreach (User ord in users)
                    {
                        dynamic obj = new ExpandoObject();
                        obj.UserID = ord.UserID;
                        obj.UserEmail = ord.UserEmail;
                        obj.UserPassword = ord.UserPassword;
                        obj.GUID = ord.GUID;
                        obj.GUIDExpiry = ord.GUIDExpiry;     
                        obj.Name = ord.Name;
                        obj.Surname = ord.Surname;
                        obj.DOB = ord.DOB;
                        obj.TitleID = ord.TitleID;
                        obj.GenderID = ord.GenderID;
                        obj.TypeID = ord.TypeID;         
                        listUser.Add(obj);
                    }
                    return listUser;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

       


        [System.Web.Http.Route("api/PostNewOrder")]
        [HttpPost]
        public List<dynamic> PostNewOrder([FromBody] Order obj, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
               try
                {
                    db.Configuration.ProxyCreationEnabled = false;
                    db.Orders.Add(obj);
                    db.SaveChanges();
                    return getOrders(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }

        }

  
        [System.Web.Http.Route("api/UpdateOrder/{id}")]
        [HttpPut]
        public List<dynamic> UpdateOrder([FromBody] Order obj, int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    var result = db.Orders.Where(b => b.OrderID == id).FirstOrDefault();
                    result.OrderID = obj.OrderID;
                    result.OrderDate = obj.OrderDate;
                    result.CustomerID = obj.CustomerID;
                    result.UserID = obj.UserID;
                    result.ProductID = obj.ProductID;
                    db.SaveChanges();
                    return getOrders(guid);
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        
        [System.Web.Http.Route("api/DeleteOrder/{id}")]
        [HttpDelete]
        public bool DeleteOrder(int id, string guid)
        {
            if (Auth.isLoggedIn(guid))
            {
                try
                {
                    Order t = db.Orders.Find(id);
                    db.Orders.Remove(t);
                    db.SaveChanges();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        /*---------------------------------------------------------------------------------------------------------------------------------

                                                                  Users 

        -----------------------------------------------------------------------------------------------------------------------------------*/

        [System.Web.Http.Route("api/getStatus")]
        [HttpGet]
        public bool getStatus()
        {
            return true;
        }


        [System.Web.Http.Route("api/getUserTypes")]
        [HttpGet]
        public List<dynamic> getUserTypes()
        {
            try
            {
                var usertypes = db.UserTypes.ToList();
                List<dynamic> listUserType = new List<dynamic>();
                foreach (UserType ust in usertypes)
                {
                    dynamic obj = new ExpandoObject();
                    obj.TypeID = ust.TypeID;
                    obj.TypeDescription = ust.TypeDescription;
                    listUserType.Add(obj);
                }
                return listUserType;
            }
            catch
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/getTitle")]
        [HttpGet]
        public List<dynamic> getTitle()
        {
            try
            {
                var titles = db.Titles.ToList();
                List<dynamic> listTitle = new List<dynamic>();
                foreach (Title ttl in titles)
                {
                    dynamic obj = new ExpandoObject();
                    obj.TitleID = ttl.TitleID;
                    obj.Title1 = ttl.Title1;
                    listTitle.Add(obj);
                }
                return listTitle;
            }
            catch
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/getGender")]
        [HttpGet]
        public List<dynamic> getGender()
        {
            try
            {
                var gender = db.Genders.ToList();
                List<dynamic> listGender = new List<dynamic>();
                foreach (Gender gdr in gender)
                {
                    dynamic obj = new ExpandoObject();
                    obj.GenderID = gdr.GenderID;
                    obj.Gender1 = gdr.Gender1;
                    listGender.Add(obj);
                }
                return listGender;
            }
            catch
            {
                return null;
            }
        }

        /*---------------------------------------------------------------------------------------------------------------------------------

                                                            User Access 

        -----------------------------------------------------------------------------------------------------------------------------------*/

        [System.Web.Http.Route("api/Register")]
        [HttpPost]
        public bool Register([FromBody] User obj)
        {
            try
            {
                var user = db.Users.Where(x => x.UserEmail == obj.UserEmail).FirstOrDefault();
                if (user == null)
                {                    
                    var hashedPasswword = Auth.ComputeSha256Hash(obj.UserPassword);
                    User newuser = new User();
                    newuser.UserEmail = obj.UserEmail;
                    newuser.UserPassword = hashedPasswword;            
                    newuser.Name = obj.Name;
                    newuser.Surname = obj.Surname;
                    newuser.DOB = obj.DOB;
                    newuser.TitleID = obj.TitleID;
                    newuser.GenderID = obj.GenderID;    
                    newuser.TypeID = obj.TypeID;
                    db.Users.Add(newuser);
                    db.SaveChanges();
                    return true; 
                }
                else
                {
                    return false;
                }

            }
            catch
            {
               
            }
            return false;
        }


        [System.Web.Http.Route("api/Login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody] User obj)
        {
            try
            {      
                if (obj != null)
                {
                   User user = Auth.Login(obj);

                   return Ok(user);
                }
            }
            catch 
            {

            }
            return BadRequest("Incorrect Login details");
        }


        [System.Web.Http.Route("api/Logout")]
        [HttpGet]
        public User Logout(string guid)
        {          
            if (guid != null)
            {
                User user = Auth.Logout(guid);
                return user;
            }
            else
            {
                return null;
            }

           
        }

        [System.Web.Http.Route("api/isLoggedIn")]
        [HttpGet]
        public bool isLoggedIn(string guid)
        {
            if (guid != null)
            {        
                if (Auth.isLoggedIn(guid))
                {
                    return true;
                }
                else
                {
                    return false ;
                }

            }
            return false; 
        }






    }

}








