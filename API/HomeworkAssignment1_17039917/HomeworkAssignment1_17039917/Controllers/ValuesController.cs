 using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Data.Entity;
using System.Web.Http;
using HomeworkAssignment1_17039917.Models;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using System.Globalization;

namespace HomeworkAssignment1_17039917.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods: "*")]
    public class APIController : ApiController
    {

        public HomeworkAssignment3_17039917Entities2 db = new HomeworkAssignment3_17039917Entities2();
        Authentication Auth = new Authentication();


    

        [System.Web.Http.Route("api/getCustomers")]
        [HttpGet]
        public object getCustomers(string guid)
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
                catch(Exception e)
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = (e.Message);
                    return obj;
                }

            }
            else
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Invalid Token. Please Re-Login.");
                return obj;
            }          

        } 

        [System.Web.Http.Route("api/getSuppliers")]
        [HttpGet]
        public object getSuppliers(string guid)
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
                catch(Exception e)
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = (e.Message);
                    return obj;
                }

            }
            else
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Invalid Token. Please Re-Login.");
                return obj;
            }  
         
        }

        [System.Web.Http.Route("api/getProducts")]
        [HttpGet]
        public object getProducts(string guid)
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
                        listProducts.Add(obj);
                    }
                    return listProducts;
                }
                catch (Exception e)
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = (e.Message);
                    return obj;
                }

            }
            else
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Invalid Token. Please Re-Login.");
                return obj;
            }

        }

        [System.Web.Http.Route("api/getOrders")]
        [HttpGet]
        public object getOrders(string guid)
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
                catch (Exception e)
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = (e.Message);
                    return obj;
                }
            }
            else
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Invalid Token. Please Re-Login.");
                return obj;
            }

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

        [System.Web.Http.Route("api/Register")]
        [HttpPost]
        public object Register([FromBody] User objUser)
        {
            try
            {
                var user = db.Users.Where(x => x.UserEmail == objUser.UserEmail).FirstOrDefault();
                if (user == null)
                {                    
                    var hashedPasswword = Auth.ComputeSha256Hash(objUser.UserPassword);
                    User newuser = new User();
                    newuser.UserEmail = objUser.UserEmail;
                    newuser.UserPassword = hashedPasswword;            
                    newuser.Name = objUser.Name;
                    newuser.Surname = objUser.Surname;
                    newuser.DOB = objUser.DOB;
                    newuser.TitleID = objUser.TitleID;
                    newuser.GenderID = objUser.GenderID;    
                    newuser.TypeID = objUser.TypeID;
                    db.Users.Add(newuser);
                    db.SaveChanges();
                    dynamic obj = new ExpandoObject();
                    obj.Message = ("Registration successful. Welcome " + newuser.Name + " " + newuser.Surname + ".");
                    return obj;
                }
                else
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = ("Username has already been used. Please use a unique username.");
                    return obj;
                }
            }
            catch(Exception e)
            {
                dynamic obj = new ExpandoObject();
                obj.Error = (e.Message);
                return obj;
            }       
        }


        [System.Web.Http.Route("api/Login")]
        [HttpPost]
        public object Login([FromBody] User objUser)
        {
            try
            {      
                if (objUser != null)
                {
                    dynamic obj = new ExpandoObject();
                    obj = Auth.Login(objUser);
                    return obj;
                }
                else
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = ("Please try again.");
                    return obj;
                }
            }
            catch (Exception e)
            {
                dynamic obj = new ExpandoObject();
                obj.Error = (e.Message);
                return obj;
            }         
        }


        [System.Web.Http.Route("api/Logout")]
        [HttpGet]
        public object Logout(string guid)
        {
            try
            {
                if (Auth.Logout(guid))
                {
                    dynamic obj = new ExpandoObject();
                    obj.Message = ("You have been logged out.");
                    return obj;
                }
                else
                {
                    dynamic obj = new ExpandoObject();
                    obj.Error = ("Please try again.");
                    return obj;
                }
            }
            catch (Exception e)
            {
                dynamic obj = new ExpandoObject();
                obj.Error = (e.Message);
                return obj;
            }
        }


        [System.Web.Http.Route("api/isLoggedIn")]
        [HttpGet]
        public IHttpActionResult isLoggedIn(string guid)
        {
            if (guid != null)
            {        
                if (Auth.isLoggedIn(guid))
                {
                    return Ok(true);
                }
                else
                {
                    return BadRequest();
                }

            }
            return BadRequest(); 
        }

        [System.Web.Http.Route("api/getReportData")]
        [HttpGet]
        public object getReportData(string guid)
        {

            if (Auth.isLoggedIn(guid))
            {
                SqlConnection myConnection = new SqlConnection("Data Source=.;Initial Catalog=HomeworkAssignment3_17039917;Integrated Security=True");
                List<JObject> listReportData = new List<JObject>();
                myConnection.Open();
                SqlCommand myReadCommand = new SqlCommand("SELECT CONVERT(DATE, OrderDate, 101) AS OrderDate , COUNT([Order].OrderID) AS Orders FROM [Order] GROUP BY OrderDate", myConnection);
                SqlDataReader myReader = myReadCommand.ExecuteReader();
                listReportData.Clear();
                while (myReader.Read())
                {
                    dynamic obj = new JObject();
                    obj.ReportLabels = myReader["OrderDate"].ToString() ;        
                    obj.ReportData = (myReader["Orders"]).ToString();
                listReportData.Add(obj);
                }
                myConnection.Close();
                return listReportData;
            }
            else
            {
                dynamic obj = new ExpandoObject();
                obj.Error = ("Invalid Token. Please Re-Login.");
                return obj;
            }
        }

    }

}








